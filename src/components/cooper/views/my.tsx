import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'

export default class My extends MiniReact.Component {
    public render(): VNode {
        return <h1>My Component</h1>
    }
}
