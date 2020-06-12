<template>
	<view>
		axi page {{ name }}
        <view @click="click">点击试试</view>
	</view>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'
	export default {
		data() {
			return {
				name: 'shenyiling'
			}
        },
        methods: {
            ...mapMutations([
                'reset'
            ]),
            click() {
                // this.reset()
                console.log(uni.getStorageSync('vuex'), 'mine')
                // uni.navigateTo({
                //     url: 'detail',
				// 	fail(err) {
				// 		console.log(err)
				// 	},
				// 	success() {
				// 		console.log('success')
				// 	}
                // })
            }
        },
        onLoad() {
            const res = uni.getStorageInfoSync()
            console.log(res.keys, 'storage信息')
            console.log(uni.getStorageSync('mine'))
        }
	}
</script>

<style>
</style>
