const mockAgentList = [
    {
        icon: 'assets/os_icons/windows.png',
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
        icon: 'assets/os_icons/windows.png',
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
        icon: 'assets/os_icons/debin.png',
        title: 'happyhacking11.oct16.cn',
        folderName: '/var/lib/cruise-agent',
        ip: '192.168.1.204',
        status: 'building',
        tags: []
    },
    {
        icon: 'assets/os_icons/suse.png',
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
        icon: 'assets/os_icons/cent_os.png',
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
        icon: 'assets/os_icons/cent_os.png',
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
    getRandomAgentList(query?: string) {
        if (query === 'PHYSICAL') {
            return mockAgentList.slice(0, Math.floor(mockAgentList.length / 2))
        } else if (query === 'VIRTUAL') {
            return mockAgentList.slice(Math.floor(mockAgentList.length / 2), mockAgentList.length)
        }
        return mockAgentList
    },
    loadPanelState() {
        return [
            { name: 'ALL', count: mockAgentList.length },
            { name: 'PHYSICAL', count: mockAgentList.slice(0, Math.floor(mockAgentList.length / 2)).length },
            {
                name: 'VIRTUAL',
                count: mockAgentList.slice(Math.floor(mockAgentList.length / 2), mockAgentList.length).length
            }
        ]
    }
}

export default AgentService
