<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="container-up">
			<view class="wrap">
				<u-swiper mode="round" height="180" effect3d :list="background" circular type="image"
					indicator></u-swiper>
			</view>
		</view>
		<!-- 导航栏 -->
		<view class="container-down">
			<view class="down-card-box">
				<navigator :url="item.url" v-for="(item, index) in navigation" :key="index"
					hover-class="navigator-hover">
					<view class="card-container">
						<i class="iconfont icont" :class="item.icon"></i>
						<text class="card-text">{{ item.title }}</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: [
					'/static/swiperImages/1.jpg',
					'/static/swiperImages/3.jpg',
					'/static/swiperImages/2.jpg'
				],
				indicatorDots: true,
				vertical: false,
				autoplay: true,
				interval: 5000,
				duration: 1000,
				navigation: [{
						icon: 'icon-dingdanguanli1',
						title: '订单管理',
						url: '/pages/my-order/index'
					},
					{
						icon: 'icon-dingdanguanli',
						title: '商品管理',
						url: '/pages/menu-info/index'
					},
					{
						icon: 'icon-chuangkouwindow30',
						title: '套餐管理',
						url: '/pages/index/no-content'
					},
					{
						icon: 'icon-yuanzhuo',
						title: '桌子管理',
						url: '/pages/taber-info/index'
					},
					{
						icon: 'icon-zongxiaoliang',
						title: '数据统计',
						url: '/pages/statistics/index'
					},
					{
						icon: 'icon-dianpu',
						title: '商铺信息',
						url: '/pages/shop-info/index'
					},
					{
						icon: 'icon-xufei1',
						title: '续费',
						url: '/pages/index/no-content'
					},

				]
			};
		},
		async onLoad() {

			const token = uni.getStorageSync('token');
			if (!token) {
				uni.redirectTo({
					url: '/pages/user/user_login'
				});
			}


			//获取openId
			const openId = uni.getStorageSync('OPENDID')
			if (!openId) {
				//用户同意后获取相关信息
				const isOkRes = await uni.showModal({
					title: '提示',
					content: '获取用户信息，便于通知订单',
				});
				if (isOkRes.confirm) {
					//获取code
					const codeRes = await wx.login()
					const CODE = codeRes.code
					//请求openId
					const openIdRes = await uni.request({
						method: 'GET',
						url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx77328d1368398c36&secret=5331e159637c0ac237a099d018a77456&js_code=${CODE}&grant_type=authorization_code `
					})

					const OPENDID = openIdRes.data.openid
					uni.setStorageSync('OPENDID', OPENDID);
				}
			}

		},
		methods: {}
	};
</script>

<style>
	@import '../../styles/iconfont.css';

	page {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		background-color: #2979ff;
	}

	.wrap {
		padding: 20rpx;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	/* .container-up {
		width: 100%;
		border-radius: 10px;
	} */

	/* swiper {
		height: 180px;
		width: 95%;
		margin: 5px auto;
		border-radius: 10px;
	} */

	.swiper-item {
		width: 100%;
		/* height:  */
	}

	.container-down {
		width: 100%;
		/* background-color: rebeccapurple; */
	}

	.down-card-box {
		width: 90%;
		padding: 0 10px;
		padding-bottom: 20px;
		/* height: 100px; */
		/* padding: 10px; */
		margin: 30px auto;
		/* background-color: rgba(239, 232, 24, 0.202); */
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.card-container {
		display: flex;
		flex-direction: column;
		width: 110px;
		height: 110px;
		align-items: center;
		justify-content: center;
		background-color: #fefffb;
		border-radius: 10px;
		margin-top: 20px;
		color: rgb(15, 27, 36);
	}

	.icont {
		font-size: 45px;
		color: white;
	}

	.card-text {
		margin-top: 8px;
		font-size: 20px;
		font-weight: bolder;
	}
</style>