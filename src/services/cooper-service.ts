const mockCooperList = [
    {
        icon: 'assets/os_icons/windows.jpg',
        title: 'mini-cooper-01.oct16.cn',
        folderName: '/var/lib/app-cooper',
        ip: '192.168.1.125',
        status: 'idle',
        tags: [
            {
                title: 'Firefox'
            },
            {
                title: 'Safari'
            },
            {
                title: 'Ubuntu'
            },
            {
                title: 'Chrome'
            }
        ]
    },
    {
        icon: 'assets/os_icons/windows.jpg',
        title: 'mini-cooper-08.oct16.cn',
        folderName: '/var/lib/app-cooper',
        ip: '192.168.1.182',
        status: 'building',
        tags: [
            {
                title: 'Firefox'
            },
            {
                title: 'Safari'
            },
            {
                title: 'Ubuntu'
            },
            {
                title: 'Chrome'
            }
        ]
    },
    {
        icon: 'assets/os_icons/ubuntu.png',
        title: 'mini-cooper-10.oct16.cn',
        folderName: '/var/lib/app-cooper',
        ip: '192.168.1.62',
        status: 'building',
        tags: [
            {
                title: 'Firefox'
            },
            {
                title: 'Safari'
            }
        ]
    },
    {
        icon: 'assets/os_icons/debian.jpg',
        title: 'mini-cooper-11.oct16.cn',
        folderName: '/var/lib/app-cooper',
        ip: '192.168.1.204',
        status: 'building',
        tags: []
    },
    {
        icon: 'assets/os_icons/debian.jpg',
        title: 'mini-cooper-65.oct16.cn',
        folderName: '/var/lib/app-cooper',
        ip: '192.168.1.132',
        status: 'idle',
        tags: [
            {
                title: 'Firefox'
            },
            {
                title: 'Safari'
            },
            {
                title: 'Ubuntu'
            },
            {
                title: 'Chrome'
            }
        ]
    },
    {
        icon: 'assets/os_icons/centos.jpg',
        title: 'mini-cooper-01.oct16.cn',
        folderName: '/var/lib/app-cooper',
        ip: '192.168.1.112',
        status: 'idle',
        tags: [
            {
                title: 'Firefox'
            },
            {
                title: 'Safari'
            },
            {
                title: 'Ubuntu'
            },
            {
                title: 'Chrome'
            }
        ]
    },
    {
        icon: 'assets/os_icons/centos.jpg',
        title: 'mini-cooper-016.oct16.cn',
        folderName: '/var/lib/app-cooper',
        ip: '192.168.1.142',
        status: 'idle',
        tags: [
            {
                title: 'Firefox'
            },

            {
                title: 'Ubuntu'
            },
            {
                title: 'Chrome'
            }
        ]
    }
]
const CooperService = {
    pivot: () => Math.floor(mockCooperList.length / 2),
    getRandomCooperList(query?: string) {
        if (query === 'PHYSICAL') {
            return mockCooperList.slice(0, this.pivot())
        } else if (query === 'VIRTUAL') {
            return mockCooperList.slice(this.pivot())
        }
        return mockCooperList
    },
    loadPanelState() {
        return [
            { name: 'ALL', count: mockCooperList.length },
            { name: 'PHYSICAL', count: mockCooperList.slice(0, this.pivot()).length },
            {
                name: 'VIRTUAL',
                count: mockCooperList.slice(this.pivot()).length
            }
        ]
    }
}

export default CooperService
