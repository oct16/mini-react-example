import { VNode } from '@/lib/model'
import { Route } from '@/react-router-dom/route'
import MiniReact from '@/react/index'
import Agent from './views/cooper'
import DashBoard from './views/dashboard'
import Help from './views/help'
import My from './views/my'

export default class RightSide extends MiniReact.Component {
    public render(): VNode {
        return (
            <div>
                <Route path="/mini-react/help" component={<Help />} />
                <Route path="/mini-react/my" component={<My />} />
                <Route path="/mini-react/dashboard" component={<DashBoard />} />
                <Route exact={true} path="/mini-react/" component={<Agent />} />
            </div>
        )
    }
}
