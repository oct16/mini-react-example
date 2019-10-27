import logo from '@/assets/logo/logo.png'
import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
export default class Header extends MiniReact.Component {
    public render(): VNode {
        return (
            <header className="app-header">
                <img className="logo" src={logo} />
            </header>
        )
    }
}
