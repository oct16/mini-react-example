import { ElNode, VNode } from '@/lib/model'
import { renderComponent } from '@/react-dom/diff'

abstract class Component {
    public node: ElNode
    public isReactComponent: boolean
    public state: { [key: string]: any }
    public props: { [key: string]: any }

    // fix for lint and declare here
    public ElementClass: any
    public context: any
    public forceUpdate: any
    public refs: any

    constructor(props = {}) {
        this.isReactComponent = true
        this.state = {}
        this.props = props
    }

    public componentWillMount?(): void
    public componentDidMount?(): void
    public componentWillUpdate?(): void
    public componentWillReceiveProps?(): void
    public componentDidUpdate?(): void
    public componentWillUnmount?(): void

    public abstract render(): VNode

    public setState(newState: { [key: string]: any }) {
        Object.assign(this.state, newState)
        renderComponent(this)
    }
}

export default Component
