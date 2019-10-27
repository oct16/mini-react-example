import Loadable from '@/react-router-dom/loadable'
import MiniReact from '@/react/index'
import ForkGithub from './common/fork-github'
import Footer from './cooper/footer'
import Header from './cooper/header'
import LeftSide from './cooper/left-side'
import RightSide from './cooper/right-side'

export default class App extends MiniReact.Component {
    constructor(props) {
        super(props)
    }

    public render() {
        return (
            <div>
                <ForkGithub />
                <div className="cruise">
                    <Header />
                    <div className="cruise-content">
                        <LeftSide />
                        {Loadable({ loader: () => import('./cooper/right-side') })}
                        {/* <RightSide /> */}
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
