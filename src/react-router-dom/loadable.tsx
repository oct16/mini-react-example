import { VNode } from '@/lib/model'
import MiniReact from '@/react'
import DynamicImport from '@/react-router-dom/dynamic-import'

export default function Loadable(props: { loader: () => Promise<any>; loading?: VNode }) {
    const { loader, loading } = props
    
    return <DynamicImport loader={loader} loading={loading} />
}
