import { VNode } from '@/lib/model'
import Component from './component'

export default function createElement(tagName: string | Component, attributes: { [key: string]: any }, ...children: any[]): VNode {
    return {
        key: (attributes && attributes.key) || null,
        attributes,
        tagName,
        children: flatten(children)
    }
}

/**
 * Flatten and loop through the children of a virtual node
 */
function flatten(children: VNode[]): VNode[] {
    return children.reduce((acc, c) => acc.concat(c), [] as VNode[])
}
