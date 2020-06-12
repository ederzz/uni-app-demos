import persistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import Vue from 'vue'

import user from './user'

const vuexPersistedstate = new persistedState({
    storage: {
        getItem: key => uni.getStorageSync(key),
        setItem: (key, value) => {
            console.log(key, value, '持久存储')
            uni.setStorageSync(key, value)
        },
        removeItem: key => uni.removeStorageSync(key),
    }
})

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },
    plugins: [ vuexPersistedstate ]
})