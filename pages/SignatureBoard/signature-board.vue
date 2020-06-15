<template>
    <view class="signature-board">
        <canvas 
            ref="canvas"
            class="signature" 
            canvas-id="signature" 
            @touchstart="touchstart" 
            @touchmove="touchmove" 
            @touchend="touchend"
        ></canvas>
    </view>
</template>

<script>
// signature board component

// TODO: android native实现

export default {
    props: {
        lineStyle: {
            type: Object,
            default: () => {}
        },
    },
	data() {
		return {
			ctx: '', // canvas el
            points: [], 
            img: '',
			signature: ''
		}
	},
	methods: {
        init() {
            this.ctx = uni.createCanvasContext('signature', this)
            
            const {
                lineWidth = 4,
                lineCap = 'round',
                lineJoin = 'round'
            } = this.lineStyle || {}
			
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
			this.points.push( movePoint )
			const len = this.points.length
			if( len >= 2 ){ 
				this.draw()
			}
		},
		touchend() {                   
			this.points = []
        },
        draw() {
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
    },
    created() {
        this.init()
    }
}
</script>

<style>
.signature-board {
    width: 100%;
    height: 100%;
}
.signature {
    width: 100%;
    height: 100%;
}
</style>