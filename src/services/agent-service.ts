const mockAgentList = [
    {
        icon: 'assets/os_icons/windows.jpg',
        title: 'happyhacking01.oct16.cn',
        folderName: '/var/lib/cruise-agent',
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
        title: 'happyhacking08.oct16.cn',
        folderName: '/var/lib/cruise-agent',
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
        title: 'happyhacking10.oct16.cn',
        folderName: '/var/lib/cruise-agent',
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
        title: 'happyhacking11.oct16.cn',
        folderName: '/var/lib/cruise-agent',
        ip: '192.168.1.204',
        status: 'building',
        tags: []
    },
    {
        icon: 'assets/os_icons/debian.jpg',
        title: 'happyhacking.oct16.cn',
        folderName: '/var/lib/cruise-agent',
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
        title: 'happyhacking01.oct16.cn',
        folderName: '/var/lib/cruise-agent',
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
        title: 'happyhacking016.oct16.cn',
        folderName: '/var/lib/cruise-agent',
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
const AgentService = {
    pivot: () => Math.floor(mockAgentList.length / 2),
    getRandomAgentList(query?: string) {
        if (query === 'PHYSICAL') {
            return mockAgentList.slice(0, this.pivot())
        } else if (query === 'VIRTUAL') {
            return mockAgentList.slice(this.pivot())
        }
        return mockAgentList
    },
    loadPanelState() {
        return [
            { name: 'ALL', count: mockAgentList.length },
            { name: 'PHYSICAL', count: mockAgentList.slice(0, this.pivot()).length },
            {
                name: 'VIRTUAL',
                count: mockAgentList.slice(this.pivot()).length
            }
        ]
    }
}

export default AgentService
