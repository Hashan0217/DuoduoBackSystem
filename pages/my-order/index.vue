<template>
	<view class="my-order-container">
		<view class="order">
			<newOrder v-if="id == 0" />
			<oldOrder v-if="id == 1" />
		</view>
		<view class="taber">
			<pageTaber @handlerClick="handlerClick" :taber="taber" />
		</view>
	</view>
</template>

<script>
	import pageTaber from '@/components/pageTaber.vue';
	import newOrder from './components/new-order.vue';
	import oldOrder from './components/oldOrder.vue';
	import remind from "./remind.mp3"
	export default {
		components: {
			pageTaber,
			newOrder,
			oldOrder
		},
		data() {
			return {
				id: 0,
				taber: [{
						id: 0,
						icon: 'icon-dingdanguanli1',
						title: '新订单'
					},
					{
						id: 1,
						icon: 'icon-dingdanguanli1',
						title: '历史订单'
					}
				]
			};
		},
		onLoad() {
			this.getNewOrder()
			this.getNewOrder(2)
			//webSocket
			this.$socket.initSocket()
			uni.$on('socket-message', (res) => {
				if (res) {
					this.remindUser()
				}
			})

		},
		methods: {
			handlerClick(id) {
				this.id = id;
			},
			//获取新订单
			async getNewOrder(status = 1) {
				const getData = {
					"page": "1",
					"pageSize": "10",
					"orderNumber": "",
					"status": status
				}
				await this.$store.dispatch("order_store/actionsGetOrder", getData)

			},
			//提醒用户刷新
			async remindUser() {

				// 提醒信息发送
				// uni.showModal({
				// 	title: '提示',
				// 	content: '获取用户信息，便于通知订单',
				// 	success: async () => {
				// 		const isOk = await wx.requestSubscribeMessage({
				// 			tmplIds: ['NrMU9sY3rMZXH4_Rt19pFW3vQ3MsCoHmVIh9TWfNTyE'],
				// 		})
				// 		await pushInforMation()
				// 	}
				// });

				//播报音乐
				const bgAudioManager = uni.createInnerAudioContext();
				bgAudioManager.src = remind;
				bgAudioManager.play()


			}
		},
		// 刷新
		onPullDownRefresh() {
			this.getNewOrder()
		}
	};
</script>

<style lang="scss">
	// @import '@/uni_modules/uview-ui/index.scss';

	.order {
		/* margin-bottom: 100px; */
		overflow: auto;
		/* min-height: 500px; */
		max-height: 90vh;
	}

	.taber {
		position: relative;
		/* margin-top: 150px; */
	}
</style>