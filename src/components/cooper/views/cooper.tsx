import { AddItemDialog } from '@/components/dialog/add-item'
import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
import CooperService from '@/services/cooper-service'

interface CooperItem {
    icon: string
    title: string
    folderName: string
    ip: string
    status: string
    tags: Array<{
        title: string
    }>
}
export default class Cooper extends MiniReact.Component {
    public activeTab = 'ALL'

    public state = {
        panel: {
            building: {
                name: 'Building'
            },
            idle: {
                name: 'Idle'
            },
            tabs: [] as Array<{
                name: string
                count: number
            }>
        },
        cooperList: [] as CooperItem[],
        searchFilter: ''
    }
    public dialog: AddItemDialog | null = new AddItemDialog()

    public loadCooperList(name?: string): void {
        const cooperList = CooperService.getRandomCooperList(name)
        this.state.cooperList = cooperList
        this.setState()
    }
    public loadPanelState(): void {
        const panelState = CooperService.loadPanelState()
        this.state.panel.tabs = panelState
        this.setState()
    }

    public componentDidMount() {
        this.loadCooperList()
        this.loadPanelState()
    }
    public componentWillUnmount() {
        this.dialog = null
    }

    public addTag(event: MouseEvent, item: CooperItem): void {
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
            this.setState()
        }
    }

    public removeTag(
        item: CooperItem,
        tag: {
            title: string
        }
    ): void {
        const index = item.tags.findIndex(t => t === tag)
        item.tags.splice(index, 1)
        this.setState()
    }
    public stateToggle(item: CooperItem): void {
        if (item.status === 'idle') {
            item.status = 'building'
        } else {
            item.status = 'idle'
        }
        this.setState()
    }

    public searchInputHandle(event: InputEvent): void {
        const val = (event.target as HTMLInputElement).value
        this.state.searchFilter = val
        this.setState()
    }

    public tabHandle(item: { name: string }): void {
        const targetName = item.name
        this.activeTab = targetName
        this.setState()
        this.loadCooperList(this.activeTab)
    }

    public render(): VNode {
        return (
            <aside className="app-cooper">
                <ul className="cooper-info">
                    <li className="info-building panel font-bg icofont-ui-settings">
                        <div className="name"> {this.state.panel.building.name}</div>
                        <div className="count">
                            {this.state.cooperList.filter(item => item.status === 'building').length}
                        </div>
                    </li>
                    <li className="info-idle panel font-bg icofont-coffee-mug">
                        <div className="name">{this.state.panel.idle.name}</div>
                        <div className="count">
                            {this.state.cooperList.filter(item => item.status === 'idle').length}
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
                <ul className="cooper-tab">
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
                                <i className="icofont-search-1"></i>
                            </label>
                            <input id="search-input" onInput={(e: InputEvent) => this.searchInputHandle(e)} />
                        </div>
                    </li>
                    <li className="tab-th">
                        {/* <i className="icofont-ghost "></i> */}
                        <i className="icofont-navigation-menu active"></i>
                    </li>
                </ul>
                <ul className="cooper-list">
                    {this.state.cooperList
                        .filter(cooper => cooper.title.indexOf(this.state.searchFilter) !== -1)
                        .map(item => (
                            <li className="cooper-list-item" building={item.status === 'building'}>
                                <div className="logo">
                                    <img src={require('@/' + item.icon)} />
                                </div>
                                <div className="detail">
                                    <ul className="detail-header">
                                        <li>
                                            <i className="icofont-bulb-alt"></i>
                                            <span className="detail-title">{item.title}</span>
                                        </li>
                                        <li>
                                            <div
                                                className={
                                                    item.status === 'building'
                                                        ? 'cooper-status status-building'
                                                        : 'cooper-status'
                                                }
                                            >
                                                {item.status}
                                            </div>
                                        </li>
                                        <li>
                                            <i className="icofont-computer"></i>
                                            {item.ip}
                                        </li>
                                        <li>
                                            <i className="icofont-terminal"></i>
                                            {item.folderName}
                                        </li>
                                    </ul>
                                    <div className="detail-bottom">
                                        <button className="add-button" onClick={e => this.addTag(e, item)}>
                                            <i className="icofont-ui-add"></i>
                                        </button>
                                        <ul className="tags">
                                            {item.tags.map(tag => (
                                                <li>
                                                    <span>{tag.title}</span>
                                                    <i
                                                        className="icofont-close"
                                                        onClick={() => this.removeTag(item, tag)}
                                                    ></i>
                                                </li>
                                            ))}
                                        </ul>

                                        {item.status === 'building' ? (
                                            <button className="deny-button" onClick={() => this.stateToggle(item)}>
                                                <i className="icofont-not-allowed"></i>
                                                <span>Deny</span>
                                            </button>
                                        ) : (
                                            <button className="deny-button" onClick={() => this.stateToggle(item)}>
                                                <i style="margin-right: 5px" className="icofont-sign-in"></i>
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
