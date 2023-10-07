<template>
	<view class=" old-order-container">
		<view class="container">
			<view class="order-card-container" v-for="(item,index) in oldOrder" :key="index">
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
							<!-- <image :src="getImageUrl(shop.image)" mode=""></image> -->
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
							<text v-if="item.status==3" style="color:#2b85e4 ;">订单完成</text>
							<text v-if="item.status==4" style="color:red;">订单取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import viewImage from "@/components/viewImag.vue"
	import {
		mapState
	} from "vuex"
	export default ({
		components: {

			viewImage
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState("order_store", ["oldOrder", "isLoding"]),
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
		},
		created() {
			// console.log(111);
			this.getOldOrder()
			this.getOldOrder(4)

		},
		methods: {
			async getOldOrder(status = 3) {
				const getData = {
					"page": "1",
					"pageSize": "10",
					"orderNumber": "",
					"status": status
				}
				await this.$store.dispatch("order_store/actionsGetOldOrder", getData)

			},
			getImageUrl(name) {

				// const temp = filiesPreview('public_2023-08-11-17-58-43.jfif')
				// console.log(res.data.message);
				// return '6666'

				// return res.data.message



				// console.log(res);
			}

		},

	})
</script>

<style>
	main {
		min-height: 100%;
		padding-top: 100px;
		padding-bottom: 100px;
		margin-top: -100px;
		margin-bottom: -100px;
	}

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
		width: 70%;
		/* margin-left: 50px; */
		text-align: right;
		margin-right: 10px;
		font-weight: bolder;
	}
</style>