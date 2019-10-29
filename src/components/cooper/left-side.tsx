import { VNode } from '@/lib/model'
import { Link } from '@/react-router-dom/link'
import MiniReact from '@/react/index'
export default class LeftSide extends MiniReact.Component {
    public state = {
        // @ts-ignore
        histories: Array.apply(null, { length: 20 }).map(
            () =>
                `mini-cooper-${Math.random()
                    .toString(16)
                    .substr(3, 11)}-test-logger`
        ),
        navList: [
            {
                name: 'DASHBOARD',
                icon: 'icofont-dashboard',
                to: '/mini-react/dashboard/'
            },
            {
                name: 'COOPER',
                icon: 'icofont-ship',
                to: '/mini-react'
            },
            {
                name: 'MY TEST',
                icon: 'icofont-magento',
                to: '/mini-react/my/'
            },
            {
                name: 'HELP',
                icon: 'icofont-files-stack',
                to: '/mini-react/help/'
            }
        ]
    }

    public render(): VNode {
        return (
            <aside className="app-left">
                <ul className="nav">
                    {this.state.navList.map(navItem => (
                        <li>
                            <Link to={navItem.to}>
                                <div className="nav-item-container" active>
                                    <i className={navItem.icon}></i>
                                    <span className="title">{navItem.name}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="history">
                    <div className="title">History</div>
                    <ul>
                        {this.state.histories.map(h => (
                            <li>{h}</li>
                        ))}
                    </ul>
                </div>
            </aside>
        )
    }
}
