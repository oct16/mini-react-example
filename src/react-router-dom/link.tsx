import MiniReact from '@/react'
import { historyPush, historyReplace, matchPath, register, unRegister, updateRoutes } from './helper'

export class Link extends MiniReact.Component {
    constructor(props) {
        super(props)
        register(this)
    }

    public componentWillUnmount(): void {
        unRegister(this)
    }

    public handleClick = (event: MouseEvent): void => {
        const { to, replace } = this.props
        event.preventDefault()
        if (to === location.pathname) {
            return
        }
        replace ? historyReplace(to) : historyPush(to)
        updateRoutes()
    }

    public render() {
        const { to, children, exact = true } = this.props
        const isMatch = matchPath(to, exact)

        return (
            <a active={!!isMatch} href={to} onClick={this.handleClick} className={this.props.className}>
                {children}
            </a>
        )
    }
}
