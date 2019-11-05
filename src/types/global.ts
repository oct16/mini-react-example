import Component from '@/react/component'

declare global {
    interface Element {
        instance: Component | undefined | null
    }
}
