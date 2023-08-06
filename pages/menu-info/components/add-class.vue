<template>
	<view class="add-class-container">
		<view class="class-cantainer">
			<uni-swipe-action>
				<uni-swipe-action-item v-if="item.id!==0" v-for="(item,index) in category" :key="index"
					@click="bindClick" @change="swipeChange(item)" :right-options="options1">
					<view class="class-card">
						<text>{{item.name}}</text>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<!-- 按钮 -->
		<button class="add-btt" @click="show = true">添加分类</button>
		<!-- 弹窗 -->
		<view>
			<u-popup :show="show" :round="10" @close="close" @open="open" mode="center">
				<view class="pop-card">
					<view class="pop-input">
						<text>分类:</text>
						<input type="text" placeholder="填写分类名称" v-model="categoryName">
					</view>

					<button class="pop-btt" @click="popSubmit">提交</button>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import helpDispatch from "@/utils/helpDispatch.js"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {

				options1: [{
						text: '编辑',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],

				show: false,
				isEdit: 1, //编辑 or 增加 状态号
				isSelectedTableItem: '', //滑块选中项
				categoryName: '',


			}
		},
		created() {
			//组件加载时，获取分类数据
			this.getCategoryDataAll()
		},
		computed: {
			...mapState("menu_store", ["category"])
		},
		methods: {
			bindClick(e) {
				//编辑
				if (e.index === 0) {
					this.isEdit = 0
					//修改卡片弹窗
					this.show = true
				} else {
					//删除
					this.deleteCatgoryDataItem()

				}
			},
			swipeChange(item) {
				this.isSelectedTableItem = item
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			//弹窗 提交
			popSubmit() {
				if (this.isEdit) {
					//正常提交
					this.show = false
					this.addCatgoryData()
				} else {
					//修改的提交
					this.show = false
					this.reviseCategoryData()
				}


			},

			//获取数据
			getCategoryDataAll() {
				//获取分类数据
				helpDispatch("menu_store/actionsGetShopingCategoryAll", 1, "获取失败")
			},

			//添加分类数据
			addCatgoryData() {
				const addInfo = {
					type: 1,
					name: this.categoryName
				}
				helpDispatch("menu_store/actionsaddShopingCategory", addInfo, "添加失败")
			},
			//修改分类数据
			reviseCategoryData() {
				const reviseInfo = {
					type: 1,
					name: this.categoryName,
					id: this.isSelectedTableItem.id
				}
				helpDispatch("menu_store/actionsreviseShopingCategory", reviseInfo, "修改失败")
			},
			//删除分类数据
			deleteCatgoryDataItem() {
				const deleteInfo = {
					id: this.isSelectedTableItem.id
				}
				helpDispatch("menu_store/actionsdeleteShopingCategory", deleteInfo, "删除失败")
			}
		}

	}
</script>
<style scoped>
	.class-card {
		height: 50px;
		text-align: center;
		line-height: 50px;
		/* background-color: #a0cfff; */
		border-bottom: 1px solid #2b85e4;

	}

	.add-btt {
		width: 90%;
		margin-top: 30px;
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
</style>