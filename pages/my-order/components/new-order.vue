<template>
	<view class="new-order">
		<view class="container">
			<view class="order-card-container" v-for="(item,index) in newOrder" :key="index">
				<view class="order-info">
					<!-- 表头 -->
					<view class="info-title">
						<!--时间与表单号 -->
						<view class="title-card">
							<text class="title-time">{{item.orderTime}}</text>
							<text class="title-num">{{item.orderNumber}}</text>
						</view>
						<!-- 桌号 -->
						<view class="title-table-num">
							<text>{{item.tableName}}-号桌</text>
							<text style="font-size: 14px;color: rgb(151, 145, 146);">{{item.deliverCode}}-取餐码</text>
						</view>
					</view>
					<!-- 订单-菜单 -->
					<view class="info-menu">
						<view class="menu-card" v-for="(shop,j) in item.dishList" :key="j">
							<!-- <image :src="shop.image" mode=""></image> -->
							<viewImage :imagName="shop.image" />
							<view class="menu-info">
								<text class="text info-text">
									<text class="text-name">
										<text class="name">{{shop.name}}</text>
									</text>
									<text class="">{{shop.number}}{{shop.description}}</text>
								</text>
								<text class="text info-price">{{shop.price*shop.number}}元</text>

							</view>
						</view>

					</view>
					<view class="info-other">
						<view class="other-price">
							总价：{{item.amount}}
						</view>
						<view class="other-btt">
							<button class="other-btt-item" style="background-color: #2b85e4;"
								@click="ordersFun(item.id)" :disabled="item.status!=1">接单</button>
							<button class="other-btt-item" style="background-color: #e4c239;" :disabled="item.status==3"
								@click="finishOrderFun(item.id)">完成</button>
							<button class="other-btt-item" style="background-color: red;" :disabled="item.status!=1"
								@click="cancelOrderFun(item.id)">取消</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import viewImage from "@/components/viewImag.vue"
	export default ({
		components: {
			viewImage
		},
		data() {
			return {


			}
		},
		computed: {
			...mapState("order_store", ["newOrder", "isNoOrder", "isLoding"]),
			//加载反馈
			isLodingFun() {

				if (this.isLoding) {
					uni.showLoading({
						title: '加载中'
					});
				} else {
					uni.hideLoading();
				}
				return 1
			},
			//未处理新订单提示
			isNoOrderFun() {
				if (this.isNoOrder) {
					uni.showToast({
						title: '有未处理订单',
						duration: 3000,
						icon: 'error'
					});
				}

			}

		},
		methods: {
			async handleClick() {

				// console.log(res);
			},
			//接单
			ordersFun(id) {
				this.$store.dispatch("order_store/actionsSubmitOrder", id)
			},
			//完成订单
			finishOrderFun(id) {
				this.$store.dispatch("order_store/actionsFinishOrder", id)
			},
			//取消订单
			cancelOrderFun(id) {
				this.$store.dispatch("order_store/actionsCancelOrder", id)
			}
		}
	})
</script>

<style>
	page {

		background-color: rgb(240, 248, 255);

	}

	.order-card-container {
		/* background-color: #2b85e4; */
	}

	/* 订单标题 */
	.order-info {
		width: 95%;
		margin: 15px auto;
		border-radius: 5px;
		/* min-height: 280px; */
		background-color: white;
	}

	.info-title {
		display: flex;
		border-bottom: solid 0.5px #2979ff;
		/* align-items: center; */
	}

	.title-card {
		/* background-color: aqua; */
		padding: 5px;
		min-width: 75%;
	}

	.title-time {
		display: block;
		font-size: 18px;
		/* font-weight: 600; */
		color: #2979ff;
		font-weight: bolder;

	}

	.title-num {
		display: block;
		font-size: 14px;
		margin-top: 5px;
		color: rgb(151, 145, 146);

	}

	.title-table-num {
		/* background-color: blue; */
		font-size: 20px;
		font-weight: bolder;
		text-align: center;
		margin-top: 10px;
		color: #2979ff;
		display: flex;
		flex-direction: column;
	}

	/* 订单菜单 */
	.info-menu {
		/* min-height: 130px; */
		padding-bottom: 10px;
		/* border-bottom: solid 0.5px #2979ff; */
	}

	.menu-card {
		display: flex;
		width: 100%;
		height: 100px;
		/* background-color: #909399; */
		margin: 10px auto;
		align-items: center;
		justify-content: space-between;
		border-radius: 10px;
	}

	.menu-card image {
		width: 90px;
		height: 90px;
		margin-left: 5px;
		border-radius: 15px;
	}

	.text {
		display: block;
	}

	.menu-info {
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.info-text {
		font-size: 20px;
		font-weight: 900;
		margin-right: 10px;
		/* color: white; */
	}

	.text-name {
		margin-right: 10px;
	}

	.info-price {
		font-size: 16px;
		margin-right: 10px;
		text-align: right;
	}

	/* 其他信息 */
	.info-other {
		height: 50px;
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding-bottom: 10px;
	}

	.other-price {
		/* margin-top: 10px; */
		font-size: 20px;
		font-weight: 700;
		margin-left: 5px;
		color: #2b85e4;
	}

	.other-btt-item {
		width: 70px;
		border-radius: 5px;
		/* margin-right: 10px; */
		color: white;

	}

	.other-btt {
		width: 60%;
		display: flex;
		margin-left: 50px;
	}
</style>