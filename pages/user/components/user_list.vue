<template>
	<view class="user-list-container">
		<view class="item-card">
			<view class="item-title">
				<u-avatar size="100px" class="avatar"></u-avatar>
				<view class="item-name">
					Hashan
				</view>
			</view>
			<view class="item-userInfo">
				<view class="item-userId">
					<text>账号:hashan123</text>
				</view>
				<view class="item-userPassword">
					<text>密码:12345678</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

</script>

<style scoped lang="less">
	.user-list-container {

		.item-card {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-content: center;

			.item-title {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-content: center;
				margin-bottom: 30px;

				.item-name {
					font-size: 24px;
					color: #2b85e4;
					font-weight: bolder;
				}
			}

			.item-userInfo {
				width: 100%;
				margin-top: 20px;
				display: flex;
				flex-direction: column;
				// justify-content: center;
				align-content: center;
				font-size: 18px;

			}

		}
	}
</style>