import Counter from '@/components/count'
import Test from '@/components/test'
import ReactDOM from '@/react-dom/index'
import MiniReact from '@/react/index'
class App extends MiniReact.Component {
    public render() {
        return (
            <div>
                <Test />
                <hr />
                <Counter />
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#app'))
