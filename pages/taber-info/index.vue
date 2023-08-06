<template>
	<view class="add-class-container">
		<view class="class-cantainer">
			<uni-swipe-action>
				<uni-swipe-action-item v-for="(item,index) in table_data" :key="item.id" @click="bindClick"
					@change="swipeChange(item)" :right-options="options1">
					<view class="class-card">
						<text>{{item.name}}</text>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<!-- 按钮 -->
		<button class="add-btt" @click="show = true">添加桌子</button>
		<!-- 添加桌号的弹窗 -->
		<view>
			<u-popup :show="show" :round="10" @close="close" @open="open" mode="center">
				<view class="pop-card">
					<view class="pop-input">
						<text>桌子:</text>
						<input type="text" placeholder="填写桌号" v-model="tableNum">
					</view>

					<button class="pop-btt" @click="popSubmit()">提交</button>
				</view>
			</u-popup>
		</view>
		<!-- 查看图片的弹窗 -->
		<view>
			<u-popup :show="viewImageCardShow" :customStyle="viewImageCardStyle" round="10" mode="center" closeable
				@close="viewImageCardClose" @open="viewImageCardOpen">
				<view class="isLoding" v-show="!isCanvas">
					<u-loading-icon text="加载中" :vertical="true" textSize="18" color="#2979ff"></u-loading-icon>
				</view>
				<view class="viewImageCard" v-show="isCanvas">
					<canvas type="2d" id="imageCod"></canvas>
					<button v-show="isCanvas" @click="setImageCode">保存图片</button>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import helpDispatch from "@/utils/helpDispatch.js"
	import {
		getTableUrlCodeViewImage
	} from "@/utils/getTableUrlCodeViewImage.js"

	import tableCodeImageBackgrond from "./tableCodeImage3.png"
	export default {
		data() {
			return {

				options1: [{
						text: '查看图片',
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
				], //滑块配置

				show: false, //添加桌号弹窗状态
				isSelectedTableItem: '', //滑块选中项
				tableNum: '', //输入的桌号
				viewImageCardShow: false, //查看图片卡片状态
				viewImageCardStyle: {
					height: '520px',
					width: '400px',
					padding: '0',
					position: 'relative',

				}, //查看图片卡片的自定义样式
				isCanvas: false //是否绘制完毕

			}
		},
		async onLoad() {
			//调用获取桌号信息函数
			this.getTableData()
			//


			// console.log(this.$refs.canvas);

		},
		onReady() {

		},
		mounted() {},
		computed: {
			...mapState("table_store", ["table_data"])
		},
		methods: {

			//左右滑块
			async bindClick(e) {
				//查看图片
				if (e.index === 0) {
					this.viewImageCardOpen()
				} else {
					//删除
					this.DeleteTabel()

				}

			},

			//选中item，打开弹窗
			swipeChange(item) {

				this.isSelectedTableItem = item
			},

			open() {
				// console.log('open');
			},

			//点击 添加桌号弹窗外，关闭
			close() {
				this.show = false
			},
			//查看图片弹窗关闭
			viewImageCardClose() {

				this.isCanvas = false
				this.viewImageCardShow = false

			},
			//查看图片弹窗打开
			viewImageCardOpen() {
				this.viewImageCardShow = true
				this.paintingTableViewCode()
			},
			//获取canvasDom节点
			getCanvasDom() {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#imageCod').node((res) => {
						if (res.node) {
							resolve(res.node)
						} else {
							reject('出错误了')
						}


					}).exec()

				})
			},

			//绘画二维条码
			async paintingTableViewCode() {
				try {

					//获取二维码图片
					const image = await getTableUrlCodeViewImage(this.isSelectedTableItem.name)
					//获取canvas组件的节点信息
					const canvasNodeDom = await this.getCanvasDom()
					const ctx = canvasNodeDom.getContext('2d')
					//设置canvas 参数 防止图片放大2倍
					const dpr = wx.getSystemInfoSync().pixelRatio
					//宽高乘像素比
					canvasNodeDom.width = 400 * dpr
					canvasNodeDom.height = 520 * dpr
					//再缩放
					ctx.scale(dpr, dpr)
					ctx.fillRect(0, 0, 100, 100)
					//绘制背景图片
					const backgroundImage = canvasNodeDom.createImage()
					backgroundImage.src = tableCodeImageBackgrond
					backgroundImage.onload = () => {
						ctx.drawImage(backgroundImage, 0, 0, 400, 520)
					}

					//绘制二维码
					const imageCode = canvasNodeDom.createImage()
					imageCode.src = image.base64
					imageCode.onload = () => {
						ctx.drawImage(imageCode, 80, 160, 240, 240)
						ctx.fillStyle = '#2b85e4';
						ctx.font = 'bolder 50px  楷体';
						ctx.fillText(`${image.parameter}`, 170, 480)
					}

					this.isCanvas = true
				} catch {
					uni.showToast({
						title: '图片加载失败',
						duration: 2000,
						icon: 'error',
					});

					this.viewImageCardShow = false

				}
			},
			//保存图片
			async setImageCode() {
				//获取canvas组件的节点信息
				const canvas = await this.getCanvasDom()
				//生成图片
				wx.canvasToTempFilePath({
					canvas: canvas,
					fileType: 'png',
					success: (res) => {
						if (res) {
							//生成图片的地址
							const url = res.tempFilePath
							//保存图片
							wx.saveImageToPhotosAlbum({
								filePath: url,
								success: (res) => {
									this.viewImageCardShow = false
								},
								fail: () => {
									uni.showToast({
										title: '图片保存失败',
										duration: 2000,
										icon: 'error',

									});
								}
							})
						}
					},
				})
			},
			//弹窗 提交
			async popSubmit() {
				this.addTableNumber()
			},

			//获取桌号信息
			async getTableData() {
				helpDispatch("table_store/checkTableNumAll", {}, '出现错误啦')
			},

			//增加桌号
			async addTableNumber() {
				this.show = false
				//查重
				const isRepeat = this.isRepeat()
				if (isRepeat) {
					uni.showToast({
						title: '桌号已存在~',
						duration: 2000,
						icon: 'error',
						mask: true
					});
					return 0
				} else {
					//不重复

					const rule = /^\d[A-Z]$/ //只能3A 一个数字和大写的形式
					if (rule.test(this.tableNum)) {
						await helpDispatch("table_store/addTableNum", this.tableNum, "添加失败")
						this.getTableData()
					} else {
						uni.showToast({
							title: '例:3A',
							duration: 2000,
							icon: 'error',
							mask: true
						});
					}


				}
			},


			//删除桌号
			DeleteTabel() {
				helpDispatch("table_store/DelletTableNum", this.isSelectedTableItem.id, '删除失败啦')
			},

			//桌号数据是否重复
			isRepeat() {
				let res = false
				this.table_data.forEach(item => {
					if (item.name == this.tableNum) {
						res = true
						return
					}
				})
				return res
			},
		}

	}
</script>
<style scoped lang="less">
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

	/* 查看图片卡片的样式 */
	.viewImageCard {
		width: 100%;
		height: 100%;
		// border-radius: 10px;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		background-color: #fff;


		& canvas {
			// background-color: #2b85e4;
			border-radius: 10px 10px 0px 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			margin: 0;
			padding: 0;
		}

		& button {
			// margin-top: 5px;
			margin: 0;
			padding: 0;
			background-color: #2b85e4;
			color: #fff;
			width: 100%;
			height: 10%;
			border-radius: 0;
			position: absolute;
			bottom: -15px;
			z-index: 99;
		}
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