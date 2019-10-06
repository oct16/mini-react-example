import MiniReact from '@/react/index'

export default class Test2 extends MiniReact.Component {
    public a = 0
    constructor(props) {
        super(props)
    }

    public componentWillMount() {
        console.log('Test2 componentWillMount')
    }
    public componentDidMount() {
        console.log('Test2 componentDidMount')
    }

    public componentWillUnmount() {
        console.log('Test2 componentWillUnmount')
    }
    public render() {
        return <div>Test2</div>
    }
}
