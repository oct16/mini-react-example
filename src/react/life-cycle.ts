export class LifeCycle {
    public componentWillMount?(): void
    public componentWillUpdate?(): void
    public componentDidMount?(): void
    public shouldComponentUpdate?(nextProps: { [key: string]: any }, nextState: { [key: string]: any }): boolean
    public componentWillReceiveProps?(nextProps: { [key: string]: any }): void
    public componentDidUpdate?(): void
    public componentWillUnmount?(): void
}
