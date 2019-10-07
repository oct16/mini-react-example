import { VNode } from '@/lib/model'
import MiniReact from '@/react/index'
import { Dialog } from '.'

export class AddAgentDialog extends Dialog {
    public data = {
        title: 'Separate multiple name with commas',
        confirm: 'Add Resources',
        cancel: 'Cancel'
    }

    public afterRender(): void {
        const inputEl = document.querySelector('.dialog-input')
        ;(inputEl as HTMLInputElement).focus()
    }

    public submit(e: Event): void {
        e.preventDefault()
        const title = (e.target as HTMLFormElement).title as any

        if (this.onSubmit) {
            this.onSubmit({ title: (title as HTMLInputElement).value })
            this.close()
        }
    }

    public content(): VNode {
        return (
            <div>
                <div className="triangle"></div>
                <div className="triangle inner"></div>
                <div className="dialog-close">
                    <i onClick={() => this.close()} className="icon-close"></i>
                </div>

                <form onSubmit={(e: Event) => this.submit(e)}>
                    <label for="title">
                        <div className="dialog-title">{this.data.title}</div>
                    </label>
                    <input type="text" className="dialog-input" name="title" id="title" required />

                    <div className="dialog-action">
                        <button type="submit" className="dialog-confirm">
                            {this.data.confirm}
                        </button>
                        <button type="button" onClick={() => this.close()} className="dialog-cancel">
                            {this.data.cancel}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
