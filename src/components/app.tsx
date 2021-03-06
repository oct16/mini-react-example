import { Loadable } from '@/react-router-dom/loadable'
import MiniReact from '@/react/index'
import ForkGithub from './common/fork-github'
import Footer from './cooper/footer'
import Header from './cooper/header'
import LeftSide from './cooper/left-side'

export default class App extends MiniReact.Component {
    constructor(props) {
        super(props)
    }

    public render() {
        return (
            <div>
                <ForkGithub />
                <div className="app">
                    <Header />
                    <div className="app-content">
                        <LeftSide />
                        {Loadable({ loader: () => import('./cooper/right-side') })}
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
