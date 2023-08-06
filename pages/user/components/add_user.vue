<template>
	<view class="addUser-container">
		<view class="container-avatar">
			<u-avatar size="100px" class="avatar" :src="model1.userInfo.src"></u-avatar>
		</view>

		<view class="container-form">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
				<u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
					<u--input v-model="model1.userInfo.name" placeholder=" 哈山" border="none"></u--input>
				</u-form-item>
				<u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true;hideKeyboard()  "
					ref="item2">
					<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="手机" prop="userInfo.phone" borderBottom ref="item3">
					<u--input v-model="model1.userInfo.phone" type="number" placeholder="例:17709955555"
						border="none"></u--input>
				</u-form-item>
				<u-form-item label="身份证" prop="userInfo.userIdNumber" borderBottom ref="item4">
					<u--input v-model="model1.userInfo.userIdNumber" type="number" placeholder="身份证号码18位"
						border="none"></u--input>
				</u-form-item>
				<u-form-item label="账号" prop="userInfo.userLoginId" borderBottom ref="item5">
					<u--input v-model="model1.userInfo.userLoginId" placeholder="例:admin123" type="number"
						border="none"></u--input>
				</u-form-item>
				<u-form-item label="密码" prop="userInfo.password" borderBottom ref="item6">
					<u--input v-model="model1.userInfo.password" type="password" border="none"></u--input>
				</u-form-item>
			</u--form>
			<button class="button" @click="handleClick">提交</button>
			<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="必选" @close="showSex = false"
				@select="sexSelect">
			</u-action-sheet>
		</view>

	</view>
</template>

<script>
	import
	helpDispatch
	from "@/utils/helpDispatch.js"
	export default {
		data() {
			return {
				showSex: false,
				model1: {
					userInfo: {
						name: '', //名称
						sex: '', //性别
						sexValue: 0,
						phone: "", //手机号
						userLoginId: '', //账号
						password: "", //密码
						src: '', //头像
						userIdNumber: ''
					},
				},
				actions: [{
						name: '男',
						value: 1

					},
					{
						name: '女',
						value: 0
					},
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						whitespace: true,
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					'userInfo.phone': {
						pattern: /^1[3-9][0-9]{9}$/,
						max: 11,
						min: 11,
						required: true,
						whitespace: true,
						message: '输入正确的手机号',
						trigger: ['blur', 'change']
					},
					'userInfo.userIdNumber': {
						pattern: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
						max: 18,
						min: 18,
						required: true,
						whitespace: true,
						message: '输入正确的身份证号',
						trigger: ['blur', 'change']
					},
					'userInfo.userLoginId': {
						pattern: /^[0-9a-zA-Z]*$/g,
						min: 6,
						required: true,
						whitespace: true,
						message: '不要输入空格或最少6位账号',
						trigger: ['blur', 'change']
					},
					'userInfo.password': {
						pattern: /^[0-9a-zA-Z]*$/g,
						min: 6,
						required: true,
						whitespace: true,
						message: '不要输入空格或最少6位密码',
						trigger: ['blur', 'change']
					}
				},
				radio: '',
				switchVal: false,
				isOk: false
			};
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		created() {

		},
		methods: {
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.model1.userInfo.sexValue = e.value
				this.$refs.uForm.validateField('userInfo.sex')
			},
			hideKeyboard() {
				this.switchVal = true
			},
			//提交注册
			async handleClick() {
				//检验是否通过
				const res = await this.fromRuleFun()
				if (!res) {
					return
				}
				//提交
				const data = {
					name: this.model1.userInfo.name,
					username: this.model1.userInfo.userLoginId,
					password: this.model1.userInfo.password,
					phone: this.model1.userInfo.phone,
					avatar: "",
					sex: this.model1.userInfo.sexValue,
					idNumber: this.model1.userInfo.userIdNumber
				}
				helpDispatch("user_info/actionAddUser", data, "添加失败")

			},
			//检验函数
			fromRuleFun() {
				return new Promise((resolve, reject) => {
					this.$refs.uForm.validate().then(res => {
						resolve(true)
					}).catch(errors => {
						uni.$u.toast('校验失败')
						reject(false)
					})
				})


			}
		},

	};
</script>

<style lang="less" scoped>
	.addUser-container {
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.container-avatar {
		// width: 100%;
		margin: 0 auto;
		margin-bottom: 20px;
	}

	.container-form {
		width: 100%;
	}

	.button {
		background-color: #007aff;
		color: #fff;
		margin-top: 30px;
	}
</style>