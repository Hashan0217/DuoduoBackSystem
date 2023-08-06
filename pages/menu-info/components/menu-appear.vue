<template>
	<view class="isLoding" v-if="cateGoryIsLoding&&shopingItemIsLoding">
		<u-loading-icon text="加载中" :vertical="true" textSize="18" color="#2979ff"></u-loading-icon>
	</view>
	<view class="menu-appear-container" v-else id="menuAppearContainer">
		<view class="container-tabs">
			<u-tabs :list="category" :is-scroll="false" :current="current" @change="handleTabsChange"></u-tabs>
		</view>

		<view class="container-info" id="containerInfo">
			<uni-swipe-action>
				<uni-swipe-action-item @click="bindClick" @change="swipeChange(item.dishId,item)"
					:right-options="options1" :left-options="options2" v-for="item in  shopItemData.data"
					:key="item.dishId">
					<view class="container-card" id="cardItem">
						<image style="border-radius: 10px;position: relative;" class="t-image c-image " mode="aspectFit"
							:src="item.image">
							<view class="c-image-active" v-if="item.status==0">已下架</view>
						</image>
						<text class="t-name  c-text-size ">{{item.name}}</text>
						<text class="t-unit c-text-size ">{{item.description}}</text>
						<text class="t-price c-text-size ">{{item.price}}元</text>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view class="itemBottom" v-if="isEnd">
			-------到底啦ε=ε=ε=(~￣▽￣)~----
		</view>
	</view>


</template>

<script>
	//辅助函数
	import {
		mapState
	} from "vuex"
	//dispatch 辅助函数
	import helpDispatch from "@/utils/helpDispatch.js"
	export default {
		data() {
			return {
				current: 0,
				options1: [{
						text: '编辑',
						style: {
							backgroundColor: '#007aff',
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				options2: [{
					text: '下架',
					style: {
						backgroundColor: '#dd524d'
					}

				}, {
					text: '上架',
					style: {
						backgroundColor: '#007aff'
					}
				}],
				pageSize: 7, //展示多少个数据
				itemHight: 120, //商品卡片高度
				selectedItemId: '', //选中商品的Id
				selectedItem: '', //选中的商品
				page: 1, //页码
				getShopingFunRun: false, //是否获取数据
				catgoryId: '', //分类id
				shopItemData: {
					data: []
				}
			}
		},
		async created() {
			//获取分类	
			await this.getCatgoryData()

			//监听事件
			uni.$on('upScrollData', this.handleUpScrollData)
			//获取商品



		},
		async mounted() {
			// const res = await this.getDomSizeData("#cardItem")
			// this.itemHight = res[0]



		},
		//销毁组件前
		beforeDestroy() {
			//消除监听
			this.comunicationOff()
		},
		computed: {
			...mapState("menu_store", ["category", "shopingItem", "shopingItemIsLoding", "cateGoryIsLoding"]),
			isEnd() {
				return this.shopItemData.data.length >= this.shopItemData.total
			},

		},
		watch: {
			shopingItem: function() {
				console.log('发生改变了');
			}
		},
		methods: {
			//获取改动后数据
			itemData() {
				const id = this.category[this.current].id
				if (!this.shopingItem[id]) {
					this.shopItemData = {
						data: [],
						total: 0,
					}
					return
				}
				this.shopItemData = this.shopingItem[id]
			},
			//获取分类id
			async getCatgoryData() {
				const res = await helpDispatch("menu_store/actionsGetShopingCategoryAll", "页面加载失败")
				//获取商品
				if (res) {
					this.catgoryId = this.category[this.current].id
					await this.getShopingItem()
				}

			},
			//获取商品
			async getShopingItem() {
				await this.appearMenuNum(this.itemHight)
				const data = {
					current: this.page,
					size: `${this.pageSize}`,
					categoryId: this.catgoryId,
				}
				await helpDispatch("menu_store/actionsGetShopingItem", data, "页面加载失败")
				this.itemData()
			},
			//处理tabs
			async handleTabsChange(data) {
				this.current = data.index;
				this.catgoryId = this.category[this.current].id
				this.page = 1
				await this.getShopingItem()
				this.itemData()
			},
			async bindClick(e) {

				if (e.content.text === '编辑') {
					const category = this.catgoryId
					uni.redirectTo({
						url: `/pages/menu-info/components/add-menu?shopId=${this.selectedItemId}&catgoryId=${category}`
					});
				}
				if (e.content.text === '删除') {
					//删除商品
					const data = {
						catgoryId: this.catgoryId, //当前的分类Id
						itemId: this.selectedItemId,
					}
					const res = await helpDispatch("menu_store/actionsdeletShopingItem", data, '删除失败')
					if (res) {
						this.itemData()
					}
				}
				if (e.content.text === '上架') {
					console.log(this.selectedItem);
					if (this.selectedItem.status === 1) {
						uni.showToast({
							title: '商品已上架',
							duration: 2000,
						});
						return
					}
					const data = {
						status: 1,
						id: this.selectedItemId,
						categoryId: this.catgoryId
					}
					const res = await helpDispatch("menu_store/actionsgetReviseShopingItemStatues", data, '下架失败')

				}
				if (e.content.text === '下架') {
					if (this.selectedItem.status === 0) {
						uni.showToast({
							title: '商品已下架',
							duration: 2000,
						});
						return
					}
					const data = {
						status: 0,
						id: this.selectedItemId,
						categoryId: this.catgoryId
					}
					const res = await helpDispatch("menu_store/actionsgetReviseShopingItemStatues", data, '下架失败')

				}

			},
			swipeChange(id, item) {
				this.selectedItemId = id
				this.selectedItem = item
			},
			//计算窗口内，出现几个菜单元素
			async appearMenuNum(domSize) {
				const data = await uni.getSystemInfo()
				const ViewHeight = data.windowHeight
				const itemNum = Math.ceil(ViewHeight / domSize)
				this.pageSize = itemNum
				const res = await this.getDomSizeData("#containerInfo")
			},
			//处理监听 滚动事件
			async handleUpScrollData(data) {
				const target = this.itemHight * 2
				//判断是否数加载新数据
				if (data.data.scrollTop > target && data.data.deltaY <= 0) {
					if (this.getShopingFunRun) {
						return
					} else {
						if (this.shopItemData.data.length >= this.shopItemData.total) {
							return
						} else {
							this.getShopingFunRun = true
							this.page++
							// this.pageSize = this.pageSize * 2
							await this.getShopingItem()
							this.getShopingFunRun = false
						}


					}

				}

			},
			//获取dom元素的大小数据
			getDomSizeData(dom) {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					const res = query.selectAll(dom)
					res.fields({
						size: true
					}, data => {
						resolve(data)
					}).exec(() => {
						reject('失败')
					})


				})
			},
			//消除监听
			comunicationOff() {
				uni.$off('upScrollData', this.handleUpScrollData)
			},
		}
	}
</script>

<style scoped lang="less">
	page {
		font-size: 28rpx;
		color: #303133;
	}

	.temp {
		display: flex;

	}

	.container-title {
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 30px;
		font-size: 18px;
		text-align: center;
		line-height: 30px;
	}

	.t-image {
		border-radius: 10px;
		flex: 1;
		height: 100%;

	}

	.t-name {
		flex: 1;
	}

	.t-unit {
		flex: 0.5;

	}

	.t-price {
		flex: 0.5;

	}


	.container-card {
		display: flex;
		height: 120px;
		margin-top: 15px;
		// background-color: #a0cfff;
	}

	.c-image {
		border-radius: 10px;
		height: 100%;
	}

	.c-image-active {
		position: absolute;
		left: 30px;
		top: 45%;
		font-weight: bolder;
		font-size: 24px;
		color: rgba(255, 255, 255, 0.75);
		text-align: center;
		transform: rotate(45deg);

	}

	.c-text-size {
		text-align: center;
		line-height: 120px;
		font-size: 24px;
	}

	.container-info {
		height: 100%;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

	}

	.itemBottom {
		margin: 0 auto;
		font-size: 14px;
		color: rgb(199, 200, 201);
		text-align: center;
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