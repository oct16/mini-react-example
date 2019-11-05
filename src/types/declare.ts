declare module '*.style' {
    const content: string
    export default content
}
declare module '*.png' {
    const content: string
    export default content
}
declare namespace JSX {
    interface ElementAttributesProperty {
        // specify the property name to use
        props: any
    }

    // interface IntrinsicElements {

    // }
}
