import { VNode } from '@/lib/model'
import { wrapComponent } from '@/react-dom/diff'
import Component from '@/react/component'
import { matchPath, register, unRegister, updateRoutes } from './helper'

export class Route extends Component {
    constructor(props) {
        super(props)
    }
    public componentWillMount(): void {
        addEventListener('popstate', this.handlePop)
        register(this)
    }

    public componentWillUnmount(): void {
        removeEventListener('popstate', this.handlePop)
        unRegister(this)
    }

    public handlePop = () => updateRoutes()

    public render() {
        const { path, exact } = this.props
        const { component, children, ...props } = this.props
        const match = matchPath(path, exact)

        if (!match) {
            return ('' as unknown) as VNode
        }

        if (component) {
            return wrapComponent('route', component.tagName, props, component.attributes)
        }
        return ('' as unknown) as VNode
    }
}
