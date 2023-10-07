import {
	getOrder,
	submitOrder,
	finishOrder,
	cancelOrder
} from "@/api/order.js"

export default {
	namespaced: true,

	state: {
		newOrder: [], //新订单
		oldOrder: [], //历史订单
		isNoOrder: false, //是否没有新处理订单
		isLoding: false, //是否加载中

	},
	mutations: {
		//存储新订单
		setNewOrder(state, data) {
			//检测上一个订单是否处理
			let target = false
			state.newOrder.forEach(item => {
				if (item.orderNumber == data[0].orderNumber) {
					target = true
				}
			})
			if (target) {
				state.isNoOrder = true
			} else {

				state.newOrder.push(...data)
			}


		},
		//存储历史订单
		setOldOrder(state, data) {
			//去重操作

			data.forEach((dataItem, index) => {
				state.oldOrder.forEach(stateItem => {
					if (dataItem.orderNumber == stateItem.orderNumber) {
						data.pop(index)
					}
				})
			})
			state.oldOrder.push(...data)

		},
		//改变加载状态
		changeIsLoding(state, data) {
			state.isLoding = data
		},
		//改变订单状态
		changeOrderState(state, data) {
			state.newOrder.forEach(item => {
				if (item.id === data.id) {
					item.status = data.value
				}
			})
		},
		//去除订单
		removeOrder(state, data) {
			const arr = []
			state.newOrder.forEach(item => {
				if (item.id !== data) {
					arr.push(item)
				}
			})
			state.newOrder = arr
		}


	},
	actions: {
		//获取订单
		async actionsGetOrder(ctx, data) {
			const res = await getOrder(data)
			ctx.commit("changeIsLoding", true)
			if (res.data.code == 200) {
				if (res.data.data.total == 0) {
					ctx.commit("changeIsLoding", false)
					return
				}
				//数据处理
				ctx.commit("setNewOrder", res.data.data.records)
				ctx.commit("changeIsLoding", false)
			}
		},
		//获取旧订单
		async actionsGetOldOrder(ctx, data) {
			ctx.commit("changeIsLoding", true)
			const res = await getOrder(data)

			if (res.data.code == 200) {
				ctx.commit("setOldOrder", res.data.data.records)
				ctx.commit("changeIsLoding", false)
			}

		},
		//提交订单
		async actionsSubmitOrder(ctx, data) {
			const res = await submitOrder(data)
			if (res.data.code == 200) {
				ctx.commit("changeOrderState", {
					id: data,
					value: 2
				})
			}
		},
		//完成订单
		async actionsFinishOrder(ctx, data) {
			const res = await finishOrder(data)
			if (res.data.code == 200) {
				ctx.commit("changeOrderState", {
					id: data,
					value: 3
				})
				ctx.commit("removeOrder", data)
			}
		},
		//取消订单
		async actionsCancelOrder(ctx, data) {
			const res = await cancelOrder(data)
			if (res.data.code == 200) {
				ctx.commit("changeOrderState", {
					id: data,
					value: 4
				})
				ctx.commit("removeOrder", data)
			}
		},
	}
}