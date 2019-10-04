import { VNode } from '@/lib/model'
import React from '@/react/index'

export default class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 1,
            items: ['a', 'b'],
            items2: []
        }
    }

    public onClick() {
        this.setState({
            num: this.state.num + 1,
            items: [Math.random() * 10, Math.random() * 10, Math.random() * 10, 'c', 'd']
        })
    }

    public render() {
        return (
            <div>
                <h1 data-test={this.state.num % 3 ? 1 : ''}>count: {this.state.num}</h1>
                <button onClick={() => this.onClick()}>add</button>
                <div>
                    {this.state.items.map((val: string, i: number) => {
                        return (
                            <div key={i}>
                                {val}-{i}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
