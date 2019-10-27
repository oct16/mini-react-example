import { VNode } from '@/lib/model'
import { wrapComponent } from '@/react-dom/diff'
import Component from '@/react/component'
import { matchPath, register, unRegister, updateRoutes } from './helper'

export class Route extends Component {
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
        const { path, exact, component } = this.props
        const match = matchPath(path, exact)

        if (!match) {
            return ('' as unknown) as VNode
        }

        if (component) {
            return wrapComponent(component.tagName, this.props)
        }
        return ('' as unknown) as VNode
    }
}
