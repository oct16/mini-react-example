import { renderComponent } from '@/react-dom/diff'
import Component from './component'

interface StateItem {
    newState: { [key: string]: any }
    component: Component
}

class StateQueue {
    public stateQueue: StateItem[] = []
    public renderQueue: Component[] = []

    public enqueue(newState: { [key: string]: any }, component: Component) {
        if (this.stateQueue.length === 0) {
            this.defer(this.flushQueue.bind(this))
        }

        this.stateQueue.push({
            newState,
            component
        })

        if (!this.renderQueue.some(item => item === component)) {
            this.renderQueue.push(component)
        }
    }

    public flushQueue() {
        let stateItem: StateItem
        while ((stateItem = this.stateQueue.shift() as StateItem)) {
            const { newState, component } = stateItem

            if (!component.preState) {
                component.preState = { ...component.state }
            }

            if (typeof newState === 'function') {
                Object.assign(component.state, newState(component.preState, component.props))
            } else {
                Object.assign(component.state, newState)
            }

            component.preState = component.state
        }

        let cInstance: Component
        while ((cInstance = this.renderQueue.shift() as Component)) {
            renderComponent(cInstance)
        }
    }

    public async defer(fn: () => void) {
        await Promise.resolve()
        return fn()
    }
}

export default new StateQueue()
