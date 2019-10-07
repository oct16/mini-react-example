import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
export default class Header extends MiniReact.Component {
    public render(): VNode {
        return (
            <header className="cruise-header">
                <img className="logo" src={require('@/assets/logo/logo.svg')} />
            </header>
        )
    }
}
