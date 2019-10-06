import MiniReact from '@/react/index'
import Test2 from './test2'
import Test3 from './test3'
export default class Test extends MiniReact.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0
        }
    }

    public swap() {
        this.setState({
            num: this.state.num + 1
        })
    }

    public render() {
        return (
            <div>
                <button style="margin-bottom: 10px" onClick={() => this.swap()}>
                    swap
                </button>

                {this.state.num % 2 ? (
                    <div>
                        <Test2 />
                        <Test2 />
                        <Test2 />
                    </div>
                ) : (
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div>
                                                        <Test3 />
                                                        <Test2 />
                                                        <Test3 />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
