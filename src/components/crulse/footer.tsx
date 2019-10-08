import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
export default class Footer extends MiniReact.Component {
    public state = {
        copyright: '@Copyright 2019 oct16'
    }
    public render(): VNode {
        return <footer className="cruise-footer">{this.state.copyright}</footer>
    }
}
