import Component from '@/react/component'

export type ElNode = Element | null
export interface VNode {
    attributes: { [key: string]: any }
    children: VNode[]
    tagName: string | Component
    key?: number
}
export interface InstanceElement extends Element {
    instance: Component | null
}
