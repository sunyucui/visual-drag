// 公共样式
export const commonStyle = {
    rotate: 0, 
    opacity: 1,
}

export const commonAttr = {
    animations: [],
    events: {},
    groupStyle: {},
    isLock: false, 
}

// 编辑器左侧组件列表
const list = [
    {
        component: 'v-text',
        label: '文本',
        propValue: '文本',
        icon: 'wenben',
        style: {
            width: 200,
            height: 22,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
        },
    },
    {
        component: 'v-input', 
        label: '输入框', 
        propValue: '输入框',
        icon: 'wenben',
        style: {
            width: 200,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'v-button', 
        label: '按钮', 
        propValue: '按钮',
        icon: 'button',
        style: {
            width: 100,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'Picture', 
        label: 'logo', 
        icon: 'tupian',
        propValue: require('@/assets/login.png'),
        style: {
            width: 32,
            height: 32,
            borderRadius: '',
        },
    },  
]

for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    item.style = { ...commonStyle, ...item.style }
    list[i] = { ...commonAttr, ...item }
}

export default list