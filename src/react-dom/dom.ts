import { ElNode } from '@/lib/model'

/**
 *
 * There are three types of methods for setting attribute
 */
export function setAttribute(node: HTMLElement, name: string, value: string | boolean): void {
    // If it starts with a world "on", we consider this attribute to be a method
    if (/^on[A-Z]\w+$/.test(name)) {
        name = name.toLowerCase()
        node[name] = value || ''
        return
    }

    // If it is a style syntax
    // Set a type string css or a object
    if (name === 'style') {
        if (value) {
            if (typeof value === 'string') {
                node.style.cssText = value
            } else if (value !== null && typeof value === 'object') {
                for (const [k, v] of Object.entries(value)) {
                    node.style[k] = v
                }
            }
        }
        return
    }

    if (name === 'className') {
        node.setAttribute('class', String(value) || '')
        return
    } else if (name === 'class') {
        node.removeAttribute(name)
        return
    }

    // default
    if (name !== 'key' && !value) {
        node.removeAttribute(name)
    } else {
        if (value === true) {
            node.setAttribute(name, '')
            return
        }
        node.setAttribute(name, String(value) || '')
    }
    return
}

/**
 *
 * Remove or Replace a node
 *
 */
export function replaceNode(node: ElNode, newNode?: Element): void {
    if (node && node.parentNode) {
        if (newNode) {
            node.parentNode.replaceChild(newNode, node)
        } else {
            node.parentNode.removeChild(node)
        }
    }
}
