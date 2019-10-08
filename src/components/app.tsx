import MiniReact from '@/react/index'
import Footer from './crulse/footer'
import Header from './crulse/header'
import LeftSide from './crulse/left-side'
import RightSide from './crulse/right-side'

export default class App extends MiniReact.Component {
    constructor(props) {
        super(props)
    }

    public render() {
        return (
            <div className="cruise">
                <Header />
                <div className="cruise-content">
                    <LeftSide />
                    <RightSide />
                </div>
                <Footer />
            </div>
        )
    }
}