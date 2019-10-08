import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
import { AddAgentDialog } from '../dialog/add-agent'
export default class RightSide extends MiniReact.Component {
    public state = {
        panel: {
            building: {
                name: 'Building'
            },
            idle: {
                name: 'Idle'
            },
            detail: {
                all: {
                    name: 'ALL'
                },
                physical: {
                    name: 'PHYSICAL',
                    count: 4
                },
                virtual: {
                    name: 'VIRTUAL',
                    count: 4
                }
            }
        },
        tabs: [
            {
                name: 'ALL',
                active: true
            },
            {
                name: 'Virtual',
                active: false
            },
            {
                name: 'Physical',
                active: false
            }
        ],
        agentList: [
            {
                icon: 'assets/os_icons/windows.png',
                title: 'happyhacking01.oct16.cn',
                folderName: '/var/lib/cruise-agent',
                ip: '192.168.1.125',
                status: 'idle',
                tags: [
                    {
                        title: 'Firefox'
                    },
                    {
                        title: 'Safari'
                    },
                    {
                        title: 'Ubuntu'
                    },
                    {
                        title: 'Chrome'
                    }
                ]
            },
            {
                icon: 'assets/os_icons/windows.png',
                title: 'happyhacking08.oct16.cn',
                folderName: '/var/lib/cruise-agent',
                ip: '192.168.1.182',
                status: 'building',
                tags: [
                    {
                        title: 'Firefox'
                    },
                    {
                        title: 'Safari'
                    },
                    {
                        title: 'Ubuntu'
                    },
                    {
                        title: 'Chrome'
                    }
                ]
            },
            {
                icon: 'assets/os_icons/ubuntu.png',
                title: 'happyhacking10.oct16.cn',
                folderName: '/var/lib/cruise-agent',
                ip: '192.168.1.62',
                status: 'building',
                tags: [
                    {
                        title: 'Firefox'
                    },
                    {
                        title: 'Safari'
                    }
                ]
            },
            {
                icon: 'assets/os_icons/debin.png',
                title: 'happyhacking11.oct16.cn',
                folderName: '/var/lib/cruise-agent',
                ip: '192.168.1.204',
                status: 'building',
                tags: []
            },
            {
                icon: 'assets/os_icons/suse.png',
                title: 'happyhacking.oct16.cn',
                folderName: '/var/lib/cruise-agent',
                ip: '192.168.1.132',
                status: 'idle',
                tags: [
                    {
                        title: 'Firefox'
                    },
                    {
                        title: 'Safari'
                    },
                    {
                        title: 'Ubuntu'
                    },
                    {
                        title: 'Chrome'
                    }
                ]
            },
            {
                icon: 'assets/os_icons/cent_os.png',
                title: 'happyhacking01.oct16.cn',
                folderName: '/var/lib/cruise-agent',
                ip: '192.168.1.112',
                status: 'idle',
                tags: [
                    {
                        title: 'Firefox'
                    },
                    {
                        title: 'Safari'
                    },
                    {
                        title: 'Ubuntu'
                    },
                    {
                        title: 'Chrome'
                    }
                ]
            }
        ],
        searchFilter: ''
    }
    public dialog: AddAgentDialog | null = new AddAgentDialog()

    public componentWillUnmount() {
        this.dialog = null
    }

    public addTag(event: MouseEvent, item: any): void {
        const { x, y } = event
        if (!this.dialog) {
            return
        }
        this.dialog.open({
            position: { x, y }
        }).onSubmit = form => {
            const { title } = form
            const value = title
                .split(' ')
                .filter(Boolean)
                .map((v: string) => ({ title: v }))
            item.tags.push(...value)
            item.tags = item.tags.splice(0, 6)
            this.setState(this.state)
        }
    }

    public removeTag(item: any, tag: any): void {
        const index = item.tags.findIndex(t => t === tag)
        item.tags.splice(index, 1)
        this.setState(this.state)
    }
    public toggle(item: any): void {
        if (item.status === 'idle') {
            item.status = 'building'
        } else {
            item.status = 'idle'
        }
        this.setState(this.state)
    }

    public onInput(event: InputEvent): void {
        const val = (event.target as HTMLInputElement).value
        this.state.searchFilter = val
        this.setState(this.state)
    }

    public render(): VNode {
        return (
            <aside className="cruise-agent">
                <ul className="agent-info">
                    <li className="info-building panel font-bg cog">
                        <div className="name"> {this.state.panel.building.name}</div>
                        <div className="count">
                            {' '}
                            {this.state.agentList.filter(item => item.status === 'building').length}
                        </div>
                    </li>
                    <li className="info-idle panel font-bg coffee">
                        <div className="name">{this.state.panel.idle.name}</div>
                        <div className="count">
                            {this.state.agentList.filter(item => item.status === 'idle').length}
                        </div>
                    </li>
                    <li className="info-detail">
                        <table>
                            <tr>
                                <td>
                                    <div className="name">{this.state.panel.detail.all.name}</div>
                                    <div className="count">{this.state.agentList.length}</div>
                                </td>
                                <td>
                                    <div className="name">{this.state.panel.detail.physical.name}</div>
                                    <div className="count">{this.state.panel.detail.physical.count}</div>
                                </td>
                                <td>
                                    <div className="name">{this.state.panel.detail.virtual.name}</div>
                                    <div className="count">{this.state.panel.detail.virtual.count}</div>
                                </td>
                            </tr>
                        </table>
                    </li>
                </ul>
                <ul className="agent-tab">
                    <li className="tab-filter">
                        <ul>
                            {this.state.tabs.map(tab => (
                                <li active={tab.active}>
                                    <span>{tab.name}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="tab-search">
                        <div className="input-group">
                            <label for="search-input">
                                <i className="icon-search"></i>
                            </label>
                            <input id="search-input" onInput={(e: InputEvent) => this.onInput(e)} />
                        </div>
                    </li>
                    <li className="tab-th">
                        <i className="icon-th-card"></i>
                        <i className="icon-th-list active"></i>
                    </li>
                </ul>
                <ul className="agent-list">
                    {this.state.agentList.filter(agent => agent.title.indexOf(this.state.searchFilter) !== -1).map((item: any) => (
                        <li>
                            <div className="agent-list-item" building={item.status === 'building'}>
                                <div className="logo">
                                    <img src={require('@/' + item.icon)} />
                                </div>
                                <div className="detail">
                                    <ul className="detail-header">
                                        <li>
                                            <i className="icon-desktop"></i>
                                            <span className="detail-title">{item.title}</span>
                                        </li>
                                        <li>
                                            <div
                                                className={
                                                    item.status === 'building'
                                                        ? 'agent-status status-building'
                                                        : 'agent-status'
                                                }
                                            >
                                                {item.status}
                                            </div>
                                        </li>
                                        <li>
                                            <i className="icon-info">{item.ip}</i>
                                        </li>
                                        <li>
                                            <i className="icon-folder">{item.folderName}</i>
                                        </li>
                                    </ul>
                                    <div className="detail-bottom">
                                        <button className="add-button" onClick={e => this.addTag(e, item)}>
                                            <i className="icon-plus"></i>
                                        </button>
                                        <ul className="tags">
                                            {item.tags.map(tag => (
                                                <li>
                                                    <span>{tag.title}</span>
                                                    <i
                                                        className="icon-trash"
                                                        onClick={() => this.removeTag(item, tag)}
                                                    ></i>
                                                </li>
                                            ))}
                                        </ul>

                                        {item.status === 'building' ? (
                                            <button className="deny-button" onClick={() => this.toggle(item)}>
                                                <i className="icon-deny"></i>
                                                <span>Deny</span>
                                            </button>
                                        ) : (
                                            <button className="deny-button" onClick={() => this.toggle(item)}>
                                                <i style="margin-right: 5px" className="icon-sign-in"></i>
                                                <span>Build</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </aside>
        )
    }
}
