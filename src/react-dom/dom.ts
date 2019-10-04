/**
 *
 * There are three types of methods for setting attribute
 */
export function setAttribute(node: HTMLElement, name: string, value: string) {
    // If it starts with a world "on", we consider this attribute to be a method
    if (/^on[A-Z]\w+$/.test(name)) {
        name = name.toLowerCase()
        node[name] = value || ''
        return
    }

    // If it is a style syntax
    // we can set a type string css or a object
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

    // default
    if (name !== 'key' && !value) {
        node.removeAttribute(name)
    } else {
        node.setAttribute(name, value + '' || '')
    }
    return
}
