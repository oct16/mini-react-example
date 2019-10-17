import Component from '@/react/component'

export const instances: Component[] = []

export function register(instance): void {
    instances.push(instance)
}

export function updateRoutes(): void {
    instances.forEach(instance => instance.forceUpdate())
}

export function unRegister(instance): void {
    instances.splice(instances.indexOf(instance), 1)
}

export const historyPush = (path: string): void => {
    window.history.pushState({}, '', path)
}

export const historyReplace = (path: string): void => {
    window.history.replaceState({}, '', path)
}

function purePath(path: string): string {
    if (path.endsWith('/')) {
        return path.substr(0, path.length - 1)
    }
    return path
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

    const match = new RegExp(`^${purePath(path)}`).exec(purePath(pathName))

    if (!match) {
        return null
    }

    const [url] = match
    const isExact = purePath(pathName) === purePath(url)
    if (exact && !isExact) {
        return null
    }

    return {
        path,
        url,
        isExact
    }
}
