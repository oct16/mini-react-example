import MiniReact from '@/react/index'

export default class ForkGithub extends MiniReact.Component {
    public render() {
        return (
            <a style="position: absolute; z-index: 100; right: 0" href="https://github.com/oct16/mini-react-example">
                <img
                    width="149"
                    height="149"
                    src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
                    alt="Fork me on GitHub"
                />
            </a>
        )
    }
}
