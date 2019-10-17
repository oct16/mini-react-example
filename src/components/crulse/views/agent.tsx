import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
import AgentService from '@/services/agent-service'
import { AddAgentDialog } from '../../dialog/add-agent'

export default class Agent extends MiniReact.Component {
    public activeTab = 'ALL'

    public state = {
        panel: {
            building: {
                name: 'Building'
            },
            idle: {
                name: 'Idle'
            },
            tabs: [] as any
        },
        agentList: [] as any,
        searchFilter: ''
    }
    public dialog: AddAgentDialog | null = new AddAgentDialog()

    public loadAgentList(name?: string): void {
        const agentList = AgentService.getRandomAgentList(name)
        this.state.agentList = agentList
        this.setState(this.state)
    }
    public loadPanelState(): void {
        const panelState = AgentService.loadPanelState()
        this.state.panel.tabs = panelState
        this.setState(this.state)
    }

    public componentDidMount() {
        this.loadAgentList()
        this.loadPanelState()
    }
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
    public stateToggle(item: any): void {
        if (item.status === 'idle') {
            item.status = 'building'
        } else {
            item.status = 'idle'
        }
        this.setState(this.state)
    }

    public searchInputHandle(event: InputEvent): void {
        const val = (event.target as HTMLInputElement).value
        this.state.searchFilter = val
        this.setState(this.state)
    }

    public tabHandle(item: { name: string }): void {
        const targetName = item.name
        this.activeTab = targetName
        this.setState(this.state)
        this.loadAgentList(this.activeTab)
    }

    public render(): VNode {
        return (
            <aside className="cruise-agent">
                <ul className="agent-info">
                    <li className="info-building panel font-bg cog">
                        <div className="name"> {this.state.panel.building.name}</div>
                        <div className="count">
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
                                {this.state.panel.tabs.map(item => {
                                    return (
                                        <td>
                                            <div className="name">{item.name}</div>
                                            <div className="count">{item.count}</div>
                                        </td>
                                    )
                                })}
                            </tr>
                        </table>
                    </li>
                </ul>
                <ul className="agent-tab">
                    <li className="tab-filter">
                        <ul>
                            {this.state.panel.tabs.map(tab => (
                                <li active={tab.name === this.activeTab} onClick={() => this.tabHandle(tab)}>
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
                            <input id="search-input" onInput={(e: InputEvent) => this.searchInputHandle(e)} />
                        </div>
                    </li>
                    <li className="tab-th">
                        <i className="icon-th-card"></i>
                        <i className="icon-th-list active"></i>
                    </li>
                </ul>
                <ul className="agent-list">
                    {this.state.agentList
                        .filter((agent: any) => agent.title.indexOf(this.state.searchFilter) !== -1)
                        .map((item: any) => (
                            <li className="agent-list-item" building={item.status === 'building'}>
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
                                            <button className="deny-button" onClick={() => this.stateToggle(item)}>
                                                <i className="icon-deny"></i>
                                                <span>Deny</span>
                                            </button>
                                        ) : (
                                            <button className="deny-button" onClick={() => this.stateToggle(item)}>
                                                <i style="margin-right: 5px" className="icon-sign-in"></i>
                                                <span>Build</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </aside>
        )
    }
}
