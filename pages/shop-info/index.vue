<template>
	<view>
		<view class="my-container">
			<!-- 用户信息展示 -->
			<view class="my-info">
				<!-- 头像与名称 -->
				<image :src="userInfo.avatarUrl" mode="" class="left image"></image>
				<text class="my-info-name">{{userInfo.nickName}}</text>
				<text class="my-info-tiem">2023-10-1 到期</text>
				<!-- 登录与注册按钮 -->
				<i class="iconfont  right icon-youjiantou" @tap="jumpUserInfo"></i>
			</view>
			<!-- 链接列表 -->
			<view class="my-link-list">
				<listCard :list="list" />
				<!-- <listCard :list="list" /> -->
			</view>
		</view>
	</view>
</template>

<script>
	import icont from "./icont.css"
	import listCard from "./components/listCard.vue"
	export default {
		components: {
			listCard,

		},
		data() {
			return {
				list: [{
					left: 'icon-guanyuwomen',
					text: '关于我们',
					right: 'icon-youjiantou2',
					url: '/pages/shop-info/components/About'
				}, ],
				userInfo: {
					nickName: '多多点餐饮',
					avatarUrl: '../../static/logo.png'
				},
				token: "",
				userInfoUrl: '/pages/shop-info/components/userInfo'
			}
		},
		methods: {

			jumpUserInfo() {
				wx.navigateTo({
					url: this.userInfoUrl
				})
			}


		},


	}
</script>

<style>
	page {
		background-color: rgb(245, 247, 250);
	}

	.my-container {
		display: flex;
		flex-direction: column;
	}

	/* 用户信息展示样式 */
	.my-info {
		/* background-color: rgb(252, 197, 58); */
		background-color: #2979ff;
		width: 100%;
		height: 200px;
		display: flex;
		align-items: center;
		position: relative;
		padding: 10px;
		color: white;
	}

	.left {
		font-size: 80px;
	}

	.image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		/* margin-left: 10px; */
	}

	.my-info-name {
		margin-left: 20px;
		font-size: 20px;
		font-weight: 800;

	}

	.my-info-tiem {
		position: absolute;
		bottom: 20px;
		right: 30px;
		font-size: 18px;
		font-weight: 800;
		/* color: rgb(235, 237, 239) */
	}

	.right {
		font-size: 20px;
		right: 20px;
		position: absolute;
		margin-right: 10px;
	}

	.icon-zhuce {
		font-size: 70px;

	}

	/* 链接列表样式 */
	.my-link-list {
		width: 93%;
		margin-left: 3px;
		/* margin: 10px auto; */
	}
</style>