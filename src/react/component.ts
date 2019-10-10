import { ElNode, VNode } from '@/lib/model'
import { renderComponent } from '@/react-dom/diff'
import { replaceNode } from '@/react-dom/dom'
import LifeCycle from './life-cycle'
abstract class Component extends LifeCycle {
    public node: ElNode
    public state: { [key: string]: any }
    public props: { [key: string]: any }

    constructor(props = {}) {
        super()
        this.state = {}
        this.props = props
    }

    public abstract render(): VNode

    public setState(newState: { [key: string]: any }) {
        this.state = Object.assign(this.state, newState)

        if (this.componentWillReceiveProps) {
            this.componentWillReceiveProps(this.state)
        }

        renderComponent(this)
    }

    protected destroy(): void {
        replaceNode(this.node)
    }
}

export default Component
