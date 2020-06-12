<template>
	<view>
        detail page {{ name }}
        <view @click="click">点击试试</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: 'shenyiling'
			}
        },
        methods: {
            click() {
                this.name = 'wmp'
                console.log(uni.getStorageSync('name'))
                uni.setStorageSync('name', 'wmp')
            }
        }
	}
</script>

<style>
</style>
