export interface VNode {
    attrs: { [key: string]: any }
    children: VNode[]
    tag: string | Function
    key?: number
}
