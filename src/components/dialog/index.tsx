import { VNode } from '@/lib/model'
import { replaceNode } from '@/react-dom/dom'
import render from '@/react-dom/render'
import MiniReact from '@/react/index'

interface Position {
    x: number
    y: number
}

const id = 0
export abstract class Dialog extends MiniReact.Component {
    public static gapX = -34
    public static gapY = 40

    public state = {
        position: { x: 0, y: 0 }
    }

    public contextNode: HTMLElement | null = null

    public abstract content(): VNode
    public abstract afterRender?(): void

    public onSubmit?(form: any): void

    public close(): void {
        if (this.contextNode) {
            replaceNode(this.contextNode)
            this.contextNode = null
        }
    }

    public open(data: { position: Position }): Dialog {
        if (this.contextNode) {
            this.close()
        }
        this.initData(data)
        this.renderContainer()
        return this
    }

    public initData(data: any) {
        this.state = data
        this.setState()
    }

    public createContainer() {
        const sel = 'dialog'
        let container: HTMLElement | null = document.querySelector(`#${sel}`)
        if (container) {
            return container
        }
        container = document.createElement('div')
        container.id = container.className = sel
        const body = document.querySelector('body') as HTMLElement
        body.appendChild(container)
        return container
    }

    public renderContainer(): void {
        const container = this.createContainer()
        const html = render(this.render(), container)
        this.contextNode = html as HTMLElement
        if (this.afterRender) {
            this.afterRender()
        }
    }

    public render(): VNode {
        return (
            <div>
                <div
                    style={{
                        top: this.state.position.y + Dialog.gapY + document.documentElement.scrollTop + 'px',
                        left: this.state.position.x + document.documentElement.scrollLeft + Dialog.gapX + 'px'
                    }}
                    className="dialog-content"
                >
                    {this.content()}
                </div>
            </div>
        )
    }
}
