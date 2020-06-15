<template>
	<view class="signature-board-demo">
        <view class="signature-board-wrapper">
            <signature-board 
                ref="signature"
            />
        </view>
        <image 
            style="width: 200px; height: 200px; background-color: #eeeeee;" 
            :src="img"
        ></image>
        <view class="actions">
            <view @click="clear">清空</view>
            <view @click="getImg">保存图片</view>
        </view>
	</view>
</template>

<script>
import SignatureBoard from './signature-board'

export default {
    components: {
        SignatureBoard
    },
    data() {
        return {
            img: ''
        }
    },
    methods: {
        clear() {
            this.img = ''
            this.$refs.signature.clear()
        },
        getImg() {
            uni.canvasToTempFilePath({
                canvasId: 'signature',
                success: res => {
                    this.img = res.tempFilePath
                }
            }, this.$refs.signature)
        }
    }
}
</script>

<style>
.signature-board-wrapper {
    width: 600rpx;
    height: 600rpx;
	border: 1px solid red;
}
</style>
