<template>
	<view class="user-login-container">

		<view class="container-title">
			登录
		</view>
		<view class="container-info">
			<u--input placeholder="账号" border="surround" clearable prefixIcon="man-add-fill" v-model="userNumber"
				type="number"></u--input>
			<u-gap height="20"></u-gap>
			<u--input placeholder="密码" prefixIcon="lock-opened-fill" type="password" password clearable
				v-model="userPassword"></u--input>
			<button @click="handleClick()"> 登录</button>
		</view>
		<view class="erro" v-if="show">
			{{message}}
		</view>
	</view>

</template>

<script>
	export default {

		data() {
			return {
				userNumber: '',
				userPassword: '',
				show: false,
				message: "账号或密码错误"
			}
		},
		methods: {

			//检验函数
			ruleInfo() {

				const numberLenght = this.userNumber.length > 0
				const passWordLenght = this.userPassword.length >= 7 || this.userPassword <= 16
				const rule = numberLenght && passWordLenght ? true : false

				return rule
			},

			//弹窗错误信息
			alertErro(errMeseage) {
				this.message = errMeseage
				this.show = true
				setTimeout(() => {
					this.show = false
				}, 2000)
			},
			async handleClick() {


				const res = this.ruleInfo()
				console.log(res);
				if (!res) {
					this.alertErro('密码或账号错误')
				} else {

					const userInfo = {
						username: this.userNumber,
						password: this.userPassword
					}
					uni.showLoading({
						title: '加载中'
					});
					const res = await this.$store.dispatch("user_info/userLogin", userInfo)
					if (res.code == 201) {
						this.alertErro('登录失败，请重试')
						uni.hideLoading();
						return 0
					} else {
						uni.hideLoading();
						uni.redirectTo({
							url: '../index/index'
						});
					}

				}
			}
		}

	}
</script>

<style lang="less">
	.user-login-container {
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;

	}

	.container-title {
		text-align: center;
		margin: 50px 0px;
		font-size: 24px;
		font-weight: bolder;
		color: #2b85e4;
	}

	.container-info {
		padding: 10px;

		& button {
			margin-top: 20px;
			color: #ffff;
			background-color: #2b85e4;
		}

		.info-number {}
	}

	.erro {
		position: absolute;
		width: 150px;
		height: 50px;
		top: 5%;
		left: 30%;
		background-color: red;
		color: #fff;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		font-weight: bolder;
		border-radius: 5px;

	}
</style>