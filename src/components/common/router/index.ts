import Component from '@/react/component'

export const instances: Component[] = []

export function register(instance) {
    instances.push(instance)
}


export function updateRoutes() {
    instances.forEach(instance => instance.forceUpdate())
}

export function unRegister(instance) {
    instances.splice(instances.indexOf(instance), 1)
}

export const historyPush = (path: string) => {
    window.history.pushState({}, '', path)
}

export const historyReplace = (path: string) => {
    window.history.replaceState({}, '', path)
}

export const matchPath = (path: string, exact = false) => {
    const pathName = location.pathname

    if (!path) {
        return {
            path: null,
            url: pathName,
            isExact: true
        }
    }
    const match = new RegExp(`^${path}`).exec(pathName)

    if (!match) {
        return null
    }

    const [url] = match
    const isExact = pathName === url
    if (exact && !isExact) {
        return null
    }

    return {
        path,
        url,
        isExact
    }
}
