import { ElNode, InstanceElement, VNode } from '@/lib/model'
import { replaceNode, setAttribute } from '@/react-dom/dom'
import Component from '@/react/component'

/**
 *
 * Diff self and all children
 *
 */
export function diffNode(vNode: VNode, node: ElNode) {
    if (vNode === null || vNode === undefined) {
        return null
    }
    if (typeof vNode === 'string' || typeof vNode === 'number') {
        return diffText(vNode, node)
    } else if (typeof vNode.tagName === 'function') {
        return diffComponent(vNode, node as InstanceElement)
    }

    const output = !node || !isSameNodeType(vNode, node) ? createNode(vNode, node) : (node as Element)

    if ((vNode.children && vNode.children.length) || (output.childNodes && output.childNodes.length)) {
        diffChildren(vNode, output)
    }

    diffAttributes(vNode, output)

    return output
}

/**
 *
 * Diff all child nodes by recursive
 * Update dom in the final
 *
 */
function diffChildren(vNode: VNode, node: Element): void {
    const nodeChildren = node ? (Array.from(node.childNodes).slice() as Element[]) : []
    const vNodeChildren = vNode.children.slice()
    vNodeChildren.forEach(vChild => {
        let child: Element | null = null
        for (let j = 0; j < nodeChildren.length; j++) {
            const subNode = nodeChildren[j]
            if (isSameNodeType(vChild, subNode as Element)) {
                child = nodeChildren[j]
                nodeChildren.splice(j, 1)
                break
            }
        }
        const lastNode = child
        child = diffNode(vChild, child)
        if (child) {
            updateDom(node, lastNode, child)
        }
    })

    if (nodeChildren.length) {
        const child = findAllChild(nodeChildren)
        child.forEach(c => unmountComponent((c as InstanceElement).instance as Component))
        nodeChildren.forEach(n => replaceNode(n))
    }
}

/**
 *
 * Find all child nodes by recursive
 *
 */
function findAllChild(children: Element[]): Element[] {
    let result: Element[] = []
    children.forEach(c => {
        result.push(c)
        if (c.childNodes.length) {
            result = result.concat(findAllChild(c.childNodes as any))
        }
    })
    return result
}

/**
 *
 * The func for update document after diff was completed
 *
 */
function updateDom(node: Element, oldChild: Element | null, newChild: Element): void {
    if (newChild && newChild !== node && newChild !== oldChild) {
        if (!oldChild) {
            node.appendChild(newChild)
            return
        }

        if (newChild === oldChild.nextSibling) {
            replaceNode(oldChild as Element)
            return
        }

        node.insertBefore(newChild, oldChild)
    }
}

/**
 *
 * Diff attrs value
 * update dom by new value
 *
 */
function diffAttributes(vNode: VNode, node: Element): void {
    const cachedAttrs = new Map()
    const attrs = vNode.attributes

    for (const attr of node.attributes) {
        cachedAttrs.set(attr.name, attr.value)
    }

    if (attrs) {
        for (const [key, val] of Object.entries(attrs)) {
            const oldVal = cachedAttrs.get(key)
            if (oldVal !== val) {
                setAttribute(node as HTMLElement, key, val)
            }
        }
    }
}

/**
 *
 * create a node by vNode and copy children
 *
 */
function createNode(vNode: VNode, node: ElNode): Element {
    const output = document.createElement(vNode.tagName as string)
    if (node) {
        const childNodes = Array.from(node.childNodes)
        childNodes.forEach(childNode => output.appendChild(childNode))
        replaceNode(node, output)
    }
    return output
}

/**
 *
 * Compare virtual node and real node whether the same type or not
 *
 */
function isSameNodeType(vNode: VNode, node: ElNode): boolean {
    if (!node) {
        return false
    }

    // still plain text node
    if (typeof vNode === 'string' || typeof vNode === 'number') {
        return node.nodeType === Node.TEXT_NODE
    }

    // element node type
    if (typeof vNode.tagName === 'string') {
        return node.nodeName.toLowerCase() === vNode.tagName.toLowerCase() && node.nodeType === Node.ELEMENT_NODE
    }

    // component type
    return node && (node as any).instance && (node as any).instance.constructor === vNode.tagName
}

/**
 *
 * Diff Component type node
 *
 */
export function diffComponent(vNode: VNode, node: InstanceElement): Element | null {
    const instanceCache = node && (node as InstanceElement).instance

    // If the component constructor has not changed than is the same component
    // Reset the props and to render component
    if (instanceCache && instanceCache.constructor === (vNode.tagName as any)) {
        instanceCache.setState(vNode.attributes)
        return node as Element
    } else {
        if (instanceCache) {
            if (instanceCache.componentWillUnmount) {
                instanceCache.componentWillUnmount()
            }
            // replaceNode(node)
            node.instance = null
            instanceCache.node = null
        }
        // replace by new node
        const instance = createComponent(vNode)

        if (!instance.props) {
            instance.props = {}
        }
        instance.props.children = vNode.children
        return renderComponent(instance)
    }
}

/**
 *
 * Create a Component Type node if the tagName's type equal function
 * @param {VNode} vNode
 * @returns
 */
function createComponent(vNode: VNode) {
    const attrs = vNode.attributes
    const props = attrs
    const componentConstructor = vNode.tagName as any
    return constructComponent(componentConstructor, props)
}

function constructComponent(func: any, props: { [key: string]: any } = {}): Component {
    return new func(props)
}

/**
 *
 * Wrap the component by self name by vNode
 * e.g. vNode = 'class Footer extend Component { ... }'
 *
 */
export function wrapComponent(
    wrapTagName: string,
    tagName: string | Component<{}, {}>,
    wrapProps: { [key: string]: any } = {},
    props: { [key: string]: any } = {}
): VNode {
    return {
        tagName: wrapTagName,
        attributes: wrapProps,
        children: [
            {
                tagName,
                attributes: props,
                children: []
            }
        ]
    }
}

/**
 *
 * Get vNode tree by Component.render method
 * transform it to really node and mount instance to the node
 *
 */
export function renderComponent(instance: Component): Element {
    const { componentWillUpdate, componentDidUpdate, componentDidMount, componentWillMount, render } = instance

    if (!instance.node && componentWillMount) {
        componentWillMount.call(instance)
    }
    const vNode = render.call(instance)

    if (typeof vNode === 'function') {
        return diffNode(wrapComponent((vNode as any).name, vNode), instance.node) as Element
    }

    if (instance.node && componentWillUpdate) {
        if (componentWillUpdate) {
            componentWillUpdate.call(instance)
        }
    }

    let node: InstanceElement
    node = diffNode(vNode, instance.node) as InstanceElement

    if (instance.node) {
        if (componentDidUpdate) {
            componentDidUpdate.call(instance)
        }
    }

    if (!instance.node && componentDidMount) {
        node.instance = instance
        instance.node = node

        componentDidMount.call(instance)
    }

    node.instance = instance
    instance.node = node

    return node
}

/**
 *
 * NodeType: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
 *
 */
function diffText(textNode: string, node: ElNode | null): Element {
    let output: any
    // node is plain text
    if (node && node.nodeType === Node.TEXT_NODE) {
        // when text value is difference, replace
        if (node.textContent !== String(textNode)) {
            node.textContent = textNode
        }
        output = node
    } else {
        // hard replace node
        output = document.createTextNode(textNode)
        replaceNode(node, output)
    }
    return output
}

function unmountComponent(instance: Component): void {
    if (instance) {
        if (instance.componentWillUnmount) {
            instance.componentWillUnmount()
        }
    }
}

/**
 *
 * For bootstrap step
 *
 */
export default function diff(vNode: VNode, node: ElNode, container?: Element): Element | null {
    if (!vNode) {
        return null
    }
    const output = diffNode(vNode, node)
    if (container && output) {
        container.appendChild(output)
    }
    return output
}
