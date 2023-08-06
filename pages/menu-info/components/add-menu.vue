<template>
	<view class="add-menu-container">
		<u-form :model="form" ref="uForm">
			<u-form-item label="商品名称" label-position="top" label-width="200" label-align="center">
				<u-input style="margin-top: 10px;" placeholder="例:皮皮虾" v-model="form.name"
					:customStyle="{marginTop: '10px'}" />
			</u-form-item>
			<u-form-item label="分类选择" label-position="top" label-width="200" label-align="center">
				<picker @change="handleChange" mode="selector" :range="category" range-key="name">
					<view class="uni-input">{{category[form.catgoryIndex].name}}</view>
				</picker>
			</u-form-item>
			<u-form-item label="输入单位" label-position="top" label-width="200" label-align="center">
				<u-input :type="'text'" style="margin-top: 10px;" v-model="form.unit" :customStyle="{marginTop: '10px'}"
					placeholder="例:盘" />
			</u-form-item>
			<u-form-item label="商品价格" prop="price" label-position="top" label-width="200" label-align="center">
				<u-input type="number" style="margin-top: 10px;" v-model="form.price" :customStyle="{marginTop: '10px'}"
					placeholder="例:20.00" />
			</u-form-item>
			<u-form-item label="商品库存" label-position="top" label-width="200" label-align="center">
				<u-gap height="10" bg-color="#ffffff"></u-gap>
				<u-number-box v-model="form.shopStocks" @change="valChange" :input-width="'100%'"></u-number-box>
			</u-form-item>
			<u-form-item label="商品图片" label-position="top" label-width="200" label-align="center">
				<u-gap height="10" bg-color="#ffffff"></u-gap>
				<u-upload :action="action" :fileList="fileList" :previewFullImage="true" @afterRead="afterRead"
					@delete="deletePic" multiple :maxCount="1" width="120" height="120">
				</u-upload>
			</u-form-item>
			<button class="btt" @click="submit">提交</button>
		</u-form>
	</view>
</template>

<script>
	// import picker from './picker.vue'
	//导入文件API
	import {
		deletePreview,
		filiesPreview
	} from "@/api/fili.js"
	//辅助函数
	import {
		mapState
	} from "vuex"
	//dispatch 辅助函数
	import helpDispatch from "@/utils/helpDispatch.js"
	export default {
		// components: {
		// 	picker
		// },
		data() {
			return {
				form: {
					name: '',
					price: '',
					unit: '',
					shopStocks: '',
					catgoryIndex: 0,
					catgoryId: 0,
				},
				action: 'http://localhost:8001/api/file/upload', //上传地址
				showUploadList: false,
				uUpload: {}, // 组件实例
				fileList: [], //文件列表
				fileResName: '', //文件返回的名字
				filiePreviewUrl: '', //文件预览地址
				reviseItemOldCatgoryId: '',
				Revise: false //是否修改商品
			}
		},
		onLoad: function(option) {
			if (option) {
				this.Revise = true
				this.handleRevise(option)
			}

		},
		created() {
			//获取分类	
			this.getCatgoryData()

		},
		computed: {
			...mapState("menu_store", ["categoryNameList", "category", "shopingItem"]),

		},
		methods: {
			//处理修改商品的事件
			handleRevise(option) {
				this.itemId = option.shopId
				const catgoryId = option.catgoryId
				const shoping = this.shopingItem[catgoryId]
				let itemData, catgoryIndex;
				shoping.data.forEach(item => {
					if (item.dishId === option.shopId) {
						itemData = item
						return 1
					}
				})
				this.category.forEach((item, index) => {

					if (item.id == catgoryId) {
						catgoryIndex = index
						return 1
					}
				})
				//添加商品数据
				this.form.name = itemData.name
				this.form.price = itemData.price
				this.form.unit = itemData.description
				this.form.shopStocks = 999
				this.form.catgoryIndex = catgoryIndex
				this.form.catgoryId = this.category[catgoryIndex].id
				this.reviseItemOldCatgoryId = this.category[catgoryIndex].id

			},
			//处理pickr选择
			handleChange(e) {
				//获取分类下标，并且赋值
				this.form.catgoryIndex = e.target.value
				//根据下标，赋值id号
				this.form.catgoryId = this.category[e.target.value].id
			},
			//获取分类
			async getCatgoryData() {
				const catgoryData = this.$store.state.menu_store.category.length
				//没有获取分类 那么触发获取分类函数
				if (catgoryData == 0) {
					await helpDispatch("menu_store/actionsGetShopingCategoryAll", 1, "页面加载失败")
				}

			},

			onReady() {
				// 得到整个组件对象，内部图片列表变量为"lists"
				this.uUpload = this.$refs.uUpload;
			},

			//库存的事件
			valChange(e) {
				console.log('当前值为: ' + e.value)

			},

			/**
			 * 图片
			 * */

			//读取图片
			async afterRead(event) {
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				//循环选中列表 请求处理
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					this.fileResName = result.data
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result.data
					}))
					fileListLen++
				}
			},

			//上传图片 请求
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://localhost:8001/api/file/upload',
						filePath: url,
						name: 'file',
						formData: {
							file: this.fileList
						},
						success: (res) => {
							resolve(JSON.parse(res.data))
						},
						fail: (res) => {
							reject(res)
						}
					});
				})
			},

			//获取预览图片的地址
			async getFiliesPreviewUrl() {
				if (!this.fileResName) {
					uni.showToast({
						title: '请上传图片',
						duration: 2000,
						icon: 'error',
					});
					return
				}
				const res = await filiesPreview(this.fileResName)
				const resData = JSON.parse(res.data)
				if (resData.code == 200) {
					this.filiePreviewUrl = resData.data
					return true
				} else {
					uni.showToast({
						title: '图片上传失败',
						duration: 2000,
						icon: 'error',
					});
					return false
				}
			},

			//删除图片
			async deletePic(event) {
				const res = await deletePreview(this.fileResName)
				if (res.data.code == 200) {
					this[`fileList${event.name}`].splice(event.index, 1)
				} else {
					uni.showToast({
						title: '删除失败',
						duration: 2000,
						icon: 'error',
						mask: true
					});
				}
			},

			//检验价格是否合法
			fromRulesFun() {
				//检验规则
				const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
				const priceTarget = reg.test(this.form.price)
				const shopName = this.form.name.length > 0
				const shopUnit = this.form.unit.length > 0
				const shopStocks = this.form.shopStocks > 1

				//错误时的处理
				if (!priceTarget) {
					uni.showToast({
						title: '输入正确的价格',
						duration: 2000,
						icon: 'error',
					});
					this.form.price = ""
					return false
				}

				//返回是否真
				if (priceTarget && shopName && shopUnit && shopStocks) {
					return true
				} else {
					uni.showToast({
						title: '输入错误，正确输入',
						duration: 2000,
						icon: 'error',
					});
					return false
				}


			},

			//提交表单
			async submit() {
				//检查是修改，还是添加数据
				if (this.Revise) {
					let res;
					//修改数据
					const data = {
						id: this.itemId,
						name: this.form.name,
						description: this.form.unit,
						categoryId: this.form.catgoryId,
						price: this.form.price,
						image: this.filiePreviewUrl,
						oldCatgoryId: this.reviseItemOldCatgoryId,
						flavors: [{
							name: "",
							value: ""
						}]
					}
					const isOk = this.fromRulesFun()

					res = await this.getFiliesPreviewUrl()
					// 若没有图片直接通过并且不带图片地址
					if (this.fileList.length == 0) {
						res = true
						delete data.image
					}


					if (isOk && res) {
						const res = await helpDispatch("menu_store/actionsgetReviseShopingItem", data, "修改失败")
						if (res) {
							uni.showToast({
								title: '修改成功',
								duration: 2000,
								icon: 'success',
							});
							this.emptyForm()
						}
					}


				} else {
					//添加数据
					const isOk = this.fromRulesFun()
					const res = await this.getFiliesPreviewUrl()
					if (isOk && res) {

						const data = {
							name: this.form.name,
							description: this.form.unit,
							categoryId: this.form.catgoryId,
							price: this.form.price,
							image: this.filiePreviewUrl,
							flavors: [{
								name: "",
								value: ""
							}]
						}

						const res = await helpDispatch("menu_store/actionsAddShopingItem", data, "添加失败")
						if (res) {
							uni.showToast({
								title: '添加成功',
								duration: 2000,
								icon: 'success',
							});
							this.emptyForm()
						}


					}
				}

			},
			//清空表单
			emptyForm() {
				this.form.name = ''
				this.form.price = ''
				this.form.unit = ''
				this.form.shopStocks = ''
				this.form.catgory = 0
				this.fileList = []
			}
		}
	}
</script>

<style>
	.add-menu-container {
		padding: 10px;


	}

	.btt {
		margin-top: 10px;
		width: 100%;
		background-color: #2b85e4;
		color: white;
	}

	/* 弹窗内的样式 */
	.pop-card {
		width: 700rpx;
		height: 200rpx;
		padding-top: 10px;
	}


	.pop-input {
		display: flex;
		align-items: center;
		font-size: 20px;

	}

	.pop-input input {
		width: 80%;
		border-radius: 10px;
		height: 40px;
		border: 1px solid #2b85e4;
		padding: 5px;
		margin-left: 5px;
	}

	.pop-input text {
		margin-left: 2px;
	}

	.pop-btt {
		margin-top: 30px;
		width: 50%;
		background-color: #2b85e4;
		color: white;
	}

	,
	.uni-input {
		background: rgb(235, 236, 238);
		margin-top: 5px;
		border-radius: 5px;
		height: 40px;
		text-align: center;
		line-height: 40px;

	}

	.picker {
		width: 100%;
		box-sizing: border-box;
		padding: 50rpx;
		text-align: center;
		margin-top: 50rpx;
	}
</style>