import { VNode } from '@/lib/model'

export default function createElement(
    tag: string | Function,
    attrs: { [key: string]: any },
    ...children: VNode[]
): VNode {
    return {
        key: (attrs && attrs.key) || null,
        attrs,
        tag,
        children: flatten(children)
    }
}

/**
 * Flatten and loop through the children of a virtual node
 */
function flatten(children: VNode[]): VNode[] {
    return children.reduce((acc, c) => acc.concat(c), [] as VNode[])
}
