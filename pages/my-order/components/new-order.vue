<template>
	<view class="new-order">
		<orderCard :order="orderData" />
		<button @click="handleClick">点击我发送订阅信息</button>
	</view>
</template>

<script>
	import orderCard from './order-card.vue'
	import {
		pushInforMation
	} from "@/utils/pushInforMation.js"
	export default ({
		components: {
			orderCard
		},
		data() {
			return {
				orderData: '',
				isLoding: false
			}
		},
		created() {

		},
		async mounted() {

		},
		methods: {
			async handleClick() {
				const isOk = await wx.requestSubscribeMessage({
					tmplIds: ['NrMU9sY3rMZXH4_Rt19pFW3vQ3MsCoHmVIh9TWfNTyE'],
				})
				const res = await pushInforMation()
				// console.log(res);
			},
		}
	})
</script>

<style>

</style>