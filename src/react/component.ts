import { ElNode, VNode } from '@/lib/model'
import { renderComponent } from '@/react-dom/diff'
import { replaceNode } from '@/react-dom/dom'
import LifeCycle from './life-cycle'

import queue from './queue'
abstract class Component<P = {}, S = {}> extends LifeCycle {
    public node: ElNode
    public state: { [key: string]: any } = {}

    // for async queue
    public preState: { [key: string]: any } = {}
    public props: { [key: string]: any } = {}

    constructor(props?: Readonly<P>) {
        super()
        if (props) {
            this.props = Object.assign(this.props, props)
        }
    }

    public abstract render(): VNode

    public setState(newState?: Readonly<S>) {
        queue.enqueue(newState ? newState : this.state, this)
    }

    public forceUpdate(): void {
        this.node = renderComponent(this)
    }

    protected destroy(): void {
        replaceNode(this.node)
    }
}

export default Component
