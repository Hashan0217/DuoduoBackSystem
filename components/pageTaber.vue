<template>
	<view class="contianer">
		<!-- <>切换 Tab</> -->
		<view @tap="click(item.id)" class="item" :class="isOk==item.id?'active':''" v-for="(item,index) in taber"
			:key="index">
			<i class="iconfont " :class="item.icon"></i>
			<text class="text">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default ({
		props: {
			taber: {
				type: Array
			}
		},
		data() {
			return {
				isOk: 0
			}
		},
		methods: {
			click(id) {
				this.isOk = id
				this.$emit('handlerClick', id)
			},
		},
	})
</script>

<style>
	@import "../styles/iconfont.css";

	page {
		margin: 0;
		padding: 0;
	}

	.contianer {
		display: flex;
		justify-content: center;
		height: 70px;
		left: 0;
		width: 100%;
		position: fixed;
		bottom: 0px;
		background-color: #a0cfff;
		color: white;
	}

	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top: 5px;
		height: 100%;
		width: 50%;
	}

	.active {
		background-color: #2979ff;
	}

	.iconfont {
		font-size: 24px;
	}

	.text {
		font-size: 18px;
		font-weight: bolder;
		margin-left: 10px;
	}
</style>