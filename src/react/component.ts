import { ElNode, VNode } from '@/lib/model'
import { removeNode, renderComponent } from '@/react-dom/diff'
abstract class Component {
    public node: ElNode
    public state: { [key: string]: any }
    public props: { [key: string]: any }

    constructor(props = {}) {
        this.state = {}
        this.props = props
    }

    public abstract render(): VNode

    public componentWillMount?(): void
    public componentWillUpdate?(): void
    public componentDidMount?(): void
    public componentWillReceiveProps?(state: { [key: string]: any }): void
    public componentDidUpdate?(): void
    public componentWillUnmount?(): void

    public setState(newState: { [key: string]: any }) {
        this.state = Object.assign(this.state, newState)

        if (this.componentWillReceiveProps) {
            this.componentWillReceiveProps(this.state)
        }

        renderComponent(this)
    }

    protected destroy(): void {
        removeNode(this.node)
    }
}

export default Component
