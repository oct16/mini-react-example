import { VNode } from '@/lib/model'
import MiniReact from '@/react'

export default class DynamicImport extends MiniReact.Component {
    public state = {
        component: null
    }

    public componentDidMount() {
        this.props.loader().then(component => {
            this.setState(() => ({
                component: component.default ? component.default : component
            }))
        })
    }

    public render(): VNode {
        const { component } = this.state
        const { loading } = this.props
        return component ? component : loading ? loading : '' //  default ... <Loading />
    }
}
