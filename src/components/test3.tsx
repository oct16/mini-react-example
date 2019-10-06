import MiniReact from '@/react/index'

export default class Test3 extends MiniReact.Component {
    constructor(props) {
        super(props)
    }

    public componentWillUnmount() {
        console.log('Test3 componentWillUnmount')
    }

    public componentWillMount() {
        console.log('Test3 componentWillMount')
    }

    public componentDidMount() {
        console.log('Test3 componentDidMount')
    }

    public render() {
        return <div>Test3</div>
    }
}
