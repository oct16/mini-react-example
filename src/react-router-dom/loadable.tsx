import { VNode } from '@/lib/model'
import MiniReact from '@/react'
import DynamicImport from '@/react-router-dom/dynamic-import'

export default function Loadable(props: { loader: () => Promise<any>; loading?: VNode }) {
    return <DynamicImport {...props} />
}
