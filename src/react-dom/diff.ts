import { ElNode, VNode } from '@/lib/model'
import { setAttribute } from '@/react-dom/dom'
import Component from '@/react/component'
function diffNode(vNode: VNode, node: ElNode) {
    if (typeof vNode === 'string' || typeof vNode === 'number') {
        return diffText(vNode, node)
    } else if (typeof vNode.tagName === 'function') {
        return diffComponent(vNode, node)
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
    const nodeChildren = node ? Array.from(node.childNodes) : []
    const vNodeChildren = vNode.children
    const children: Node[] = []

    const keys = new Map()

    if (nodeChildren.length) {
        for (const child of nodeChildren) {
            let key: string | null = null
            if (child.nodeType === Node.ELEMENT_NODE) {
                key = (child as HTMLElement).getAttribute('key')
            }

            if (key) {
                // 如果有相同的key，缓存起来
                keys.set(key, child)
            } else {
                // 否则就推到数组中，表示为有差异的节点，之后需要进行比较
                children.push(child)
            }
        }
    }

    if (vNodeChildren.length) {
        for (let i = 0; i < vNodeChildren.length; i++) {
            const vChild = vNodeChildren[i]

            const key = vChild.key
            // 去找节点的缓存，如果key一致表示节点没有发生改变

            let child
            // 如果没有，则需要去和每一个node节点进行对比
            if (key) {
                const childCache = keys.get(key.toString())
                if (childCache) {
                    child = childCache
                    keys.delete(key)
                }
            } else {
                // 遍历children，和虚拟节点进行对比
                for (let j = i; j < nodeChildren.length; j++) {
                    const nc = nodeChildren[j]

                    if (nc && isSameNodeType(vChild, nc as Element)) {
                        child = nodeChildren[j]
                        break
                    }
                }
            }

            child = diffNode(vChild, child)
            const nodeChild = nodeChildren[i]
            updateDom(node, nodeChild, child)
        }
    }
}

function updateDom(node: Element, nodeChild: Node, child: Node) {
    if (child && child !== node && child !== nodeChild) {
        if (!nodeChild) {
            node.appendChild(child)
        } else if (child === nodeChild.nextSibling) {
            removeNode(nodeChild as Element)
        } else {
            node.insertBefore(child, nodeChild)
        }
    }
}

function removeNode(node: ElNode) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node)
    }
}

function diffAttributes(vNode: VNode, node: Element) {
    const oldAttrs = new Map() // 当前DOM的属性
    const attrs = vNode.attributes // 虚拟DOM的属性

    for (const attr of node.attributes) {
        oldAttrs.set(attr.name, attr.value)
    }

    if (attrs) {
        for (const [key, val] of Object.entries(attrs)) {
            const oldVal = oldAttrs.get(key)
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

    return false
    // component type
    // return node && node._component && node._component.constructor === vNode.tagName;
}
function diffComponent(vNode: VNode, node: ElNode) {
    const instance = createComponent(vNode)
    renderComponent(instance)
    return instance.node
}

function createComponent(vNode: VNode) {
    const attrs = vNode.attributes
    const props = attrs
    const componentConstructor = vNode.tagName as any
    return new componentConstructor(props)
}

export function renderComponent(instance: Component) {
    const vNode = instance.render()

    let node: ({ instance?: Component } & Element) | null = instance.node
    node = diffNode(vNode, node)
    instance.node = node
    // ;(node as ({ instance: Component } & Element)).instance = instance
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

export default function diff(vNode: VNode, node: ElNode, container?: Element) {
    const output = diffNode(vNode, node)
    if (container) {
        container.appendChild(output)
    }
    return output
}
