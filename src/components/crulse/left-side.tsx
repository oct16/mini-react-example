import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
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
                active: false,
                icon: 'icon-dashboard'
            },
            {
                name: 'AGENT',
                active: true,
                icon: 'icon-sitemap'
            },
            {
                name: 'MY CRUISE',
                active: false,
                icon: 'icon-boat'
            },
            {
                name: 'HELP',
                active: false,
                icon: 'icon-life-bouy'
            }
        ]
    }

    public render(): VNode {
        return (
            <aside className="cruise-left">
                <ul className="nav">
                    {this.state.navList.map(navItem => (
                        <li>
                            <div className="nav-item-container" active={navItem.active}>
                                <i className={navItem.icon}></i>
                                <span className="title">{navItem.name}</span>
                            </div>
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
