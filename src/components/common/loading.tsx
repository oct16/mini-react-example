import MiniReact from '@/react'

export default class Loading extends MiniReact.Component {
    public render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh'
                }}
            >
                <b>loading...</b>
            </div>
        )
    }
}
