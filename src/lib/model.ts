import Component from '@/react/component'
export interface VNode {
    attributes: { [key: string]: any }
    children: VNode[]
    tagName: string | Component
    key?: number
}
