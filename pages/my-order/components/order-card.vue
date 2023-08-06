<template>
	<view class="container">
		<view class="order-card-container" v-for="(item,index) in order" :key="index">
			<view class="order-info">
				<!-- 表头 -->
				<view class="info-title">
					<!--时间与表单号 -->
					<view class="title-card">
						<text class="title-time">{{item.order_time}}</text>
						<text class="title-num">{{item.order_no}}</text>
					</view>
					<!-- 桌号 -->
					<view class="title-table-num">
						<text>{{item.table_number}}-号桌</text>
					</view>
				</view>
				<!-- 订单-菜单 -->
				<view class="info-menu">
					<view class="menu-card" v-for="(shop,j) in item.menu[0].goods_list" :key="j">
						<image :src="shop.image[0].url" mode=""></image>
						<view class="menu-info">
							<text class="text info-text">
								<text class="text-name">
									<shop class="name"></shop>
								</text>
								<text class="">{{shop.quantity}}{{shop.unit}}</text>
							</text>
							<text class="text info-price">{{shop.total_price}}元</text>
						</view>
					</view>

				</view>
				<view class="info-other">
					<view class="other-price">
						总价：{{item.sett_amount}}
					</view>
					<button class="other-btt">了解</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default ({
		props: {
			order: {
				type: Array
			}
		},
		data() {
			return {
				// order: [4, 5, 6, 7, 8, 9, 4, 1, 0, ]
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
		margin-left: 10px;
	}

	/* 其他信息 */
	.info-other {
		height: 50px;
		display: flex;
		/* flex-direction: column; */
		justify-content: center;
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

	.other-btt {
		width: 120px;
		background-color: #2b85e4;
		border-radius: 20px;
		margin-right: 10px;
		color: white;
	}
</style>