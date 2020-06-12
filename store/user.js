export default {
    state: {
        mine: 'shenyiling'
    },
    actions: {},
    mutations: {
        reset (state) {
            console.log('reset了')
            // 变更状态
            state.mine += '~'
        }
    },
    getters: {}
}