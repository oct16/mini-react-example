import Component from '@/react/component'
export interface VNode {
    attrs: { [key: string]: any }
    children: VNode[]
    tag: string | Function
    key?: number
}
