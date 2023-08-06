<template>
	<view class="statostics-container">
		<!-- 销售额 -->
		<view class="container-sales">
			<view class="sales-title">
				<view class="title">
					销售额
				</view>
			</view>
			<!-- 年度销售额 -->
			<view class="annual-sales">
				<view class="isLoding" v-if="salesData.isLoding">
					<u-loading-icon text="加载中" :vertical="true" textSize="18" color="#2979ff"></u-loading-icon>
				</view>
				<u-grid v-else col="2" align="center" border="true">
					<u-grid-item :customStyle="{height:100+ 'px'}">
						<u-count-to :duration="2000" :startVal="0" :endVal="sales.day" :decimals="2" separator=","
							color="#2979ff" bold fontSize="30px"></u-count-to>
						<text class="sales-data-title">每天</text>
					</u-grid-item>
					<u-grid-item :customStyle="{height:100+ 'px'}">
						<u-count-to :duration="2000" :startVal="0" :endVal="sales.week" :decimals="2" separator=","
							color="#2979ff" bold fontSize="30px"></u-count-to>
						<text class="sales-data-title">周度</text>
					</u-grid-item>
					<u-grid-item :customStyle="{height:100+ 'px'}">
						<u-count-to :duration="2000" :startVal="0" :endVal="sales.moon" :decimals="2" separator=","
							color="#2979ff" bold fontSize="30px"></u-count-to>
						<text class="sales-data-title">月度</text>
					</u-grid-item>
					<u-grid-item :customStyle="{height:100+ 'px'}">
						<u-count-to :duration="2000" :startVal="0" :endVal="sales.year" :decimals="2" separator=","
							color="#2979ff" bold fontSize="30px"></u-count-to>
						<text class="sales-data-title">年度</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- 订单与用户数据 -->
		<view class="container-user-data">
			<view class="user-data-title">
				<view class="title">
					用户数据
				</view>
			</view>
			<view class="isLoding" v-if="userData.isLoding&&orderData.isLoding">
				<u-loading-icon text="加载中" :vertical="true" textSize="18" color="#2979ff"></u-loading-icon>
			</view>

			<view v-else class="user-data-card">
				<view class="user-data-item">
					<view class="user-data-number">
						<u-count-to :duration="2000" :startVal="0" :endVal="user.orderNum" separator="," color="#2979ff"
							bold fontSize="28px"></u-count-to>
					</view>
					<view class="user-data-title">订单量</view>
				</view>
				<view class="user-data-item">
					<view class="user-data-number">
						<u-count-to :duration="2000" :startVal="1" :endVal="user.userNum" separator="," color="#2979ff"
							bold fontSize="28px"></u-count-to>
					</view>
					<view class="user-data-title">用户量</view>
				</view>
			</view>
		</view>
		<!-- 商品排行榜 -->
		<view class="commodity-ranking">
			<view class="commodity-ranking-title">
				<view class="title">
					销售榜
				</view>
				<view class="commodity-ranking-card">
					<view class="commodity-ranking-itme">
						<image src="../../static/swiperImages/1.jpg" mode=""></image>
						<text class="commodity-ranking-item-title">皮皮虾</text>
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
	export default {
		data() {
			return {
				user: {
					userNum: 0,
					orderNum: 0
				},
				sales: {
					day: 0,
					week: 0,
					moon: 0,
					year: 0
				}
			}
		},
		computed: {
			...mapState("statistics_store", ["isLoding", "userData", "orderData", "salesData"]),
			userDataNum() {
				this.user.userNum = this.userData.data
				this.user.orderNum = this.orderData.data
				return 0
			},
			salesDataNum() {
				this.sales.day = this.salesData.data.day
				this.sales.week = this.salesData.data.week
				this.sales.moon = this.salesData.data.moon
				this.sales.year = this.salesData.data.year
				return 0
			}
		},
		created() {

			this.$store.dispatch("statistics_store/actionsGetOrderStatistics")
			this.$store.dispatch("statistics_store/actionsGetUserData")
			this.$store.dispatch("statistics_store/actionsGetTurnover")
			this.$store.dispatch("statistics_store/actionsGetShopingTop")


		}
	}
</script>

<style scoped lang="less">
	.statostics-container {
		padding: 10px;

		//销售额度
		.container-sales {
			height: 280px;
			border-radius: 10px;
			background-color: #f3f4f6;
			margin-bottom: 15px;

			//标题调整
			.sales-title {
				width: 100%;
				height: 40px;
				// background-color: aqua;
			}

			//数据内容
			.annual-sales {
				padding: 10px;
				// width: 100%;
				height: 100%;
				position: relative;

				.sales-data-title {
					font-size: 14px;
					text-align: center;
					margin-top: 10px;
					color: #82848a;
				}

			}

		}

		//订单与用户数据
		.container-user-data {
			height: 260px;
			border-radius: 10px;
			background-color: #f3f4f6;
			margin-bottom: 15px;
			position: relative;

			.user-data-title {
				width: 100%;
				height: 40px;
			}

			.user-data-card {
				height: 100%;
				padding: 10px;
				display: flex;
				justify-content: space-between;
				text-align: center;

				.user-data-item {
					width: 170px;
					height: 170px;
					margin-top: 15px;
					background-color: #ffff;
					border: #2979ff solid 5px;
					border-radius: 50%;
					// line-height: 100px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					text-align: center;
					position: relative;

					// padding: 10px;
					.user-data-number {
						margin-bottom: 10px;
					}

					.user-data-title {
						font-size: 18px;
						text-align: center;
						color: #b3b3b3;
						position: absolute;
						bottom: 0;
					}
				}



			}

		}

		//商品排行榜
		.commodity-ranking {
			min-height: 300px;
			border-radius: 10px;
			background-color: #f3f4f6;
			margin-bottom: 15px;

			.commodity-ranking-title {
				width: 100%;
				height: 40px;
			}

			.commodity-ranking-card {
				height: 100%;
				padding: 5px;

				.commodity-ranking-itme {
					margin: 10px auto;
					padding: 10px;
					display: flex;
					align-items: center;
					background-color: #ffff;
					border-radius: 10px;

					image {
						width: 70px;
						height: 70px;
						border-radius: 10px;
						margin-right: 10px;
					}

					.commodity-ranking-item-title {
						font-size: 24px;
						font-weight: bolder;
						color: #2979ff;
						margin-left: 10px;
					}

				}
			}

		}
	}

	//标题
	.title {
		color: #ffff;
		font-size: 20px;
		font-weight: bolder;
		width: 130px;
		height: 40px;
		background-color: #2979ff;
		border-radius: 10px 0px 10px 0px;
		text-align: center;
		line-height: 40px;

	}

	//加载位置
	.isLoding {

		position: absolute;
		top: 45%;
		left: 45%;
		transform: -50%, -50%;
		// display: flex;

	}
</style>