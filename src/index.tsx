import '@/assets/css/common/dialog.styl'
import '@/assets/css/main.styl'
import '@/assets/fonts/icofont.css'

import ReactDOM from '@/react-dom/index'
import { Loadable } from './react-router-dom/loadable'

ReactDOM.render(Loadable({ loader: () => import('./components/app') }), document.querySelector('#app'))
