<template>
    <view class="collect-signature">
        <button @tap="createCanvas">签名</button>
        <view class="signature" v-show="showCanvas">
            <canvas 
                class="mycanvas" 
                canvas-id="mycanvas" 
                @touchstart="touchstart" 
                @touchmove="touchmove" 
                @touchend="touchend"
            ></canvas>
            <view class="footer">
                <view class="left" @click="finish">保存</view>
                <view class="right" @click="clear">清除</view>
                <view class="close" @click="close">关闭</view>
            </view>
        </view>
    </view>
</template>

<script>
// signature board component
// 一个画板线条线条样式 大小定制化 TODO:

// TODO: 组件化
// TODO: 查看另一个库的实现
// TODO: android native实现
// this.ctx.draw(true)
// TODO: 整理api

export default {
    props: {
        lineStyle: {
            type: Object,
            default: {}
        }
    },
	data() {
		return {
			showCanvas: false,
			ctx: '', // canvas el
			points: [], 
			signature: ''
		}
	},
	methods: {
		close() {
			this.showCanvas = false
			this.clear()
		},
		//创建并显示画布s
		createCanvas() {
			this.showCanvas = true
            this.ctx = uni.createCanvasContext('mycanvas', this)
            
            const {
                lineWidth = 4,
                lineCap = 'round',
                lineJoin = 'round'
            } = this.lineStyle
			
			//设置画笔样式
			this.ctx.lineWidth = lineWidth
			this.ctx.lineCap = lineCap
			this.ctx.lineJoin = lineJoin
		},
		touchstart({ changedTouches }) {
            const { x, y } = changedTouches[0]
			let startPoint = { x, y }
            this.points.push(startPoint)
            // new path 
			this.ctx.beginPath()
		},
		
		touchmove({ changedTouches }) {
            const { x, y } = changedTouches[0]
			const movePoint = { x, y }
			this.points.push(movePoint)
			const len = this.points.length
			if( len >= 2 ){ 
				this.draw()
			}
		},
		touchend() {                   
			this.points=[]
		},
		
		draw: function() {
            const [ start, end ] = this.points
			this.points.shift()
			this.ctx.moveTo(start.x, start.y)
			this.ctx.lineTo(end.x, end.y)
			this.ctx.stroke()
			this.ctx.draw(true) 
		},
		
		clear() {
			uni.getSystemInfo({
				success: ({ windowWidth, windowHeight }) => {
					this.ctx.clearRect(0, 0, windowWidth, windowHeight)
					this.ctx.draw(true)
				},
			})
        },
        
		finish() {
			let that = this;
			uni.canvasToTempFilePath({
			  canvasId: 'mycanvas',
			  success: function(res) {
				//上传到服务器
				that.api.uploadFile({
					url: 'user/upload/one',
					filePath: res.tempFilePath,
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes)
						that.signature = uploadFileRes.data.url;
						that.clear();
						that.showCanvas = false;
					}
				})
			  } 
			})
		},
    }
}
</script>

<style>
.signature {position: fixed;top: 10px;left: 2%;z-index: 999;width:96%;}

page{
    background: #fff;
}
.container {
    padding: 20rpx 0 120rpx 0;
    box-sizing: border-box;
}
.title{
    height:50upx;
    line-height: 50upx;
    font-size: 16px;
}
.mycanvas{
    width: 100%;
    height: calc(100vh - 200upx);
    background-color: #ECECEC;
}
.footer{
    font-size: 14px;
    height: 150upx;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.left,.right,.close{
    line-height: 100upx;
    height: 100upx;
    width: 220upx;
    text-align: center;
    font-weight: bold;
    color: white;
    border-radius: 5upx;
}
.left{
    background: #007AFF;
}
.right{
    background:orange;
}
.close {
    background:#A3A3A3;
}
</style>