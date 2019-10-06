import { ElNode, InstanceElement, VNode } from '@/lib/model'
import { setAttribute } from '@/react-dom/dom'
import Component from '@/react/component'

function diffNode(vNode: VNode, node: ElNode) {
    if (typeof vNode === 'string' || typeof vNode === 'number') {
        return diffText(vNode, node)
    } else if (typeof vNode.tagName === 'function') {
        return diffComponent(vNode, node as InstanceElement)
    }

    let output: Element
    if (!node || !isSameNodeType(vNode, node)) {
        output = createNode(vNode, node)
    } else {
        output = node as Element
    }

    if ((vNode.children && vNode.children.length) || (output.children && output.children.length)) {
        diffChildren(vNode, output)
    }

    diffAttributes(vNode, output)

    return output
}

function diffChildren(vNode: VNode, node: Element): void {
    const nodeChildren = node ? (Array.from(node.childNodes).slice() as Element[]) : []
    const vNodeChildren = vNode.children.slice()
    vNodeChildren.forEach(vChild => {
        let child: Element | null = null
        for (let j = 0; j < nodeChildren.length; j++) {
            const nc = nodeChildren[j]
            if (isSameNodeType(vChild, nc as Element)) {
                child = nodeChildren[j]
                nodeChildren.splice(j, 1)
                break
            }
        }

        const lastNode = child
        child = diffNode(vChild, child)
        updateDom(node, lastNode, child)
    })

    if (nodeChildren.length) {
        const child = findAllChild(nodeChildren)
        child.forEach(c => unmountComponent((c as InstanceElement).instance as Component))
        nodeChildren.forEach(n => {
            removeNode(n)
        })
    }
}

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
 * The operate for update document after diff was completed
 * @param {Element} node parent node
 * @param {Element} nodeChild old node
 * @param {Element} child new node
 */
function updateDom(node: Element, nodeChild: Element | null, child: Element): void {
    if (child && child !== node && child !== nodeChild) {
        if (!nodeChild) {
            node.appendChild(child)
            return
        }

        if (child === nodeChild.nextSibling) {
            removeNode(nodeChild as Element)
            return
        }

        node.insertBefore(child, nodeChild)
    }
}

export function removeNode(node: ElNode, replaceNode?: Element): void {
    if (node && node.parentNode) {
        if (replaceNode) {
            node.parentNode.replaceChild(replaceNode, node)
        } else {
            node.parentNode.removeChild(node)
        }
    }
}

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

function createNode(vNode: VNode, node: ElNode): Element {
    const output = document.createElement(vNode.tagName as string)
    if (node) {
        Array.from(node.childNodes).map(n => output.appendChild(n))
        if (node.parentNode) {
            node.parentNode.replaceChild(output, node)
        }
    }
    return output
}

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

function diffComponent(vNode: VNode, node: InstanceElement): Element {
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
            removeNode(node)
            node.instance = null
            instanceCache.node = null
        }
        // replace by new node
        const instance = createComponent(vNode)
        return renderComponent(instance)
    }
}

function createComponent(vNode: VNode) {
    const attrs = vNode.attributes
    const props = attrs
    const componentConstructor = vNode.tagName as any
    return new componentConstructor(props)
}

export function renderComponent(instance: Component): Element {
    const { componentWillUpdate, componentDidUpdate, componentDidMount, componentWillMount, render } = instance

    if (!instance.node && componentWillMount) {
        componentWillMount.call(instance)
    }
    const vNode = render.call(instance)

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

function diffText(textNode: string, node: ElNode | null): Element {
    // NodeType: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
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
        if (node && node.parentNode) {
            node.parentNode.replaceChild(output, node)
        }
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

export default function diff(vNode: VNode, node: ElNode, container?: Element): Element {
    const output = diffNode(vNode, node)
    if (container) {
        container.appendChild(output)
    }
    return output
}
