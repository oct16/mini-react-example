export default class LifeCycle {
    public componentWillMount?(): void
    public componentWillUpdate?(): void
    public componentDidMount?(): void
    public componentWillReceiveProps?(state: { [key: string]: any }): void
    public componentDidUpdate?(): void
    public componentWillUnmount?(): void
}
