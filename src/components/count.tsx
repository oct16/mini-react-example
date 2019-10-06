import MiniReact from '@/react/index'
export default class Counter extends MiniReact.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            items: [this.getStr()]
        }
    }

    public getStr() {
        return Math.random()
            .toString(16)
            .substring(3, 11)
    }

    public add() {
        const newData = this.state.items.slice()
        newData.push(this.getStr())
        this.setState({ items: newData })
    }

    public pop() {
        const newData = this.state.items
        newData.pop()
        this.setState({ items: newData })
    }

    public shift() {
        const newData = this.state.items
        newData.shift()
        this.setState({ items: newData })
    }

    public plus() {
        this.setState({
            num: this.state.num + 1
        })
    }

    public render() {
        return (
            <div>
                <h3>
                    <span>{this.state.num}</span>
                </h3>
                <button onClick={() => this.plus()}>plus</button>
                <button onClick={() => this.add()}>add</button>
                <button onClick={() => this.pop()}>pop</button>
                <button onClick={() => this.shift()}>shift</button>
                <ul>
                    {this.state.items.map((item: string) => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        )
    }
}
