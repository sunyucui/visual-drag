import Vue from 'vue'

const components = [
    'VText',
    'VInput',
    'VButton',
    'Picture',
]

components.forEach(key => {
    Vue.component(key, () => import(`@/custom-component/${key}`))
})