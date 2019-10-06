import { VNode } from '@/lib/model'
import diff from '@/react-dom/diff'

export default function render(vNode: VNode, container: HTMLElement | null): Element {
    if (!container) {
        throw new Error(`Container element is required`)
    }

    if (!(container instanceof HTMLElement)) {
        throw new Error(`Type 'container' is not assignable to type 'HTMLElement'.`)
    }

    const output = diff(vNode, null, container)
    return output
}
