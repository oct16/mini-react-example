import { VNode } from '@/lib/model'
import { Loadable } from '@/react-router-dom/loadable'
import { Route } from '@/react-router-dom/route'
import MiniReact from '@/react/index'
import Loading from '../common/loading'
import DashBoard from './views/dashboard'
import Help from './views/help'
import My from './views/my'

export default class RightSide extends MiniReact.Component {
    public render(): VNode {
        return (
            <div>
                <Route
                    className="test-route-name"
                    path="/mini-react"
                    exact={true}
                    component={Loadable({
                        loader: () => import('./views/cooper'),
                        loading: <Loading />
                    })}
                />
                <div style={{ paddingLeft: '15px' }}>
                    <Route path="/mini-react/help" component={<Help />} />
                    <Route path="/mini-react/my" component={<My className="my-class" />} />
                    <Route path="/mini-react/dashboard" component={<DashBoard />} />
                </div>
            </div>
        )
    }
}
