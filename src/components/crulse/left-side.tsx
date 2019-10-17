import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
import { Link } from '../common/router/link'
export default class LeftSide extends MiniReact.Component {
    public state = {
        histories: [
            'happyhacking03/Acceptance_test',
            'happyhacking04/Acceptance_test',
            'happyhacking05/Acceptance_test',
            'happyhacking06/Acceptance_test',
            'happyhacking07/Acceptance_test',
            'happyhacking08/Acceptance_test',
            'happyhacking09/Acceptance_test',
            'happyhacking10/Acceptance_test',
            'happyhacking11/Acceptance_test',
            'happyhacking12/Acceptance_test',
            'happyhacking13/Acceptance_test',
            'happyhacking14/Acceptance_test',
            'happyhacking15/Acceptance_test',
            'happyhacking16/Acceptance_test',
            'happyhacking17/Acceptance_test'
        ],
        navList: [
            {
                name: 'DASHBOARD',
                icon: 'icon-dashboard',
                to: '/mini-react/dashboard'
            },
            {
                name: 'AGENT',
                icon: 'icon-sitemap',
                to: '/mini-react/'
            },
            {
                name: 'MY CRUISE',
                icon: 'icon-boat',
                to: '/mini-react/my'
            },
            {
                name: 'HELP',
                icon: 'icon-life-bouy',
                to: '/mini-react/help'
            }
        ]
    }

    public render(): VNode {
        return (
            <aside className="cruise-left">
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
