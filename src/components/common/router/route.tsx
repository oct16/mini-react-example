import Component from '@/react/component'
import MiniReact from '@/react/index'
import { matchPath, register, unRegister, updateRoutes } from '../router'

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
            return ''
        }

        if (component) {
            return <div className={this.props.className}>{component}</div>
        }

        return ''
    }
}
