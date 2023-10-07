import {
	getShopingCategoryAll,
	addShopingCategory,
	reviseShopingCategory,
	deleteShopingCategory,
	addShopingItem,
	getShopingItem,
	deletShopingItem,
	getReviseShopingItem
} from "@/api/menu.js"

import {
	filiesPreview
} from "@/api/fili.js"

export default {
	namespaced: true,

	state: {
		category: [], //分类
		shopingItem: {}, //商品数据
		cateGoryIsLoding: true,
		shopingItemIsLoding: true,
	},
	mutations: {
		//获取分类，存储
		setCateGory(state, data) {
			state.cateGoryIsLoding = false
			state.category = data
		},
		//增加分类
		addCateGoryItem(state, data) {
			state.category.push(data)
		},
		//修改分类
		reviseCateGoryItem(state, data) {
			state.category.forEach(item => {
				if (item.id == data.id) {
					item.name = data.name
					return true
				}
			})
		},
		//删除分类
		DeletCatGoryItem(state, data) {

			const newArr = []
			state.category.forEach(item => {
				if (data.id != item.id) {
					newArr.push(item)
				}
			})
			state.category = newArr
			return true
		},
		//存储商品数据
		setShopingItem(state, data) {

			//是否有数据
			if (data.records.length == 0) {
				return
			} else {
				const categoryId = data.records[0].categoryId //分类id
				const isExist = Object.hasOwnProperty.call(state.shopingItem, categoryId)
				//数据是否创建
				if (isExist) {
					//把旧和新数据合并
					data.records.forEach(item => {
						let isOk = true;
						state.shopingItem[categoryId].data.forEach(elmet => {
							if (item.dishId === elmet.dishId) {
								isOk = false
								if (item.name !== elmet.name) {
									elmet.name = item.name
									return
								}
							}
						})
						if (isOk) {
							state.shopingItem[categoryId].data.push(item)
							isOk = true
						}
					})

				} else {
					//创建新的数据集，并根据分类id添加
					const obj = {
						data: data.records,
						total: data.total
					}
					state.shopingItem[data.records[0].categoryId] = obj
				}
				state.shopingItemIsLoding = false
			}


		},
		//修改状态
		ReviseShopingItemStatus(state, data) {
			const itemData = state.shopingItem[data.categoryId].data
			itemData.forEach(item => {
				if (item.dishId === data.id) {
					item.status = data.status
					return 1
				}
			})
		},
		//删除商品数据
		deletShopingItem(state, data) {
			const itemData = state.shopingItem[data.catgoryId]
			let itemIndex
			itemData.data.forEach((item, index) => {
				if (item.dishId === data.itemId) {
					itemIndex = index
					return
				}
			})
			state.shopingItem[data.catgoryId].data.splice(itemIndex, 1)
		}

	},
	actions: {
		//获取全部分类数据
		async actionsGetShopingCategoryAll(ctx) {

			if (ctx.state.category.length > 0) {
				return 1
			} else {

				const res = await getShopingCategoryAll({
					current: '1',
					size: '10',
					name: '',
					type: 1
				})
				// console.log(res);
				if (res.data.code == 200) {
					ctx.commit("setCateGory", res.data.data)
					return true
				} else {
					return false
				}
			}

		},
		//增加分类数据
		async actionsaddShopingCategory(ctx, data) {
			const res = await addShopingCategory(data)
			if (res.data.code == 200) {
				ctx.commit("addCateGoryItem", data)
				return true
			} else {
				return false
			}
		},
		//修改分类数据
		async actionsreviseShopingCategory(ctx, data) {
			const res = await reviseShopingCategory(data)
			if (res.data.code == 200) {
				ctx.commit("reviseCateGoryItem", data)
				return true
			} else {
				return false
			}
		},
		//删除分类
		async actionsdeleteShopingCategory(ctx, data) {
			const res = await deleteShopingCategory(data)
			if (res.data.code == 200) {
				ctx.commit("DeletCatGoryItem", data)
				return true
			} else {
				return false
			}
		},
		//添加商品数据
		async actionsAddShopingItem(ctx, data) {
			const res = await addShopingItem(data)
			if (res.data.code === 200) {
				return true
			} else {
				return false
			}
		},
		//获取商品数据
		async actionsGetShopingItem(ctx, data) {
			const res = await getShopingItem(data)
			if (res.data.code == 200) {
				//把数据图片加载出来
				const resData = await imagUrl(res.data.data.records)
				const dataInfo = {
					records: resData,
					total: res.data.data.total
				}
				ctx.commit("setShopingItem", dataInfo)
				return true
			} else {
				return false
			}

		},
		//修改商品状态
		async actionsgetReviseShopingItemStatues(ctx, data) {
			const ReviseData = {
				id: data.id,
				status: data.status
			}

			const res = await getReviseShopingItem(ReviseData)
			if (res.data.code == 200) {
				ctx.commit("ReviseShopingItemStatus", data)
				return true
			} else {
				return false
			}

		},
		//修改商品信息
		async actionsgetReviseShopingItem(ctx, data) {
			const res = await getReviseShopingItem(data)
			const target = data.id !== data.oldCatgoryId //是否换分类了

			if (res.data.code == 200) {
				//删除旧分类下的商品
				if (target) {
					ctx.commit("deletShopingItem", {
						catgoryId: data.oldCatgoryId,
						itemId: data.id
					})
				}
				return true
			} else {
				return false
			}

		},
		//删除商品数据
		async actionsdeletShopingItem(ctx, data) {
			const res = await deletShopingItem(data.itemId)
			if (res.data.code == 200) {
				ctx.commit("deletShopingItem", data)
				return true
			} else {
				return false
			}

		},

	},
}

//图片名称 更换图片地址
function imagUrl(data) {
	let arr = []
	return new Promise((resolve, rejecte) => {
		data.forEach((item, index) => {
			filiesPreview(item.image).then((res) => {
				if (res.data.code == 200) {
					item.image = res.data.message
					arr.push(item)
				}
				if (arr.length === data.length) {
					resolve(arr)
				}
			})

		})
	})
}