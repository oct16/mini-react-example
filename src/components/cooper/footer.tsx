import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
export default class Footer extends MiniReact.Component {
    public state = {
        copyright: '@Copyright 2019 oct16'
    }

    public render(): VNode {
        return (
            <footer className="app-footer">
                <a href="https://github.com/oct16/">{this.state.copyright}</a>
            </footer>
        )
    }
}
