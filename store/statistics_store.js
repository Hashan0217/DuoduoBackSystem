import {
	getTurnover,
	getUserData,
	getOrderStatistics,
	getShopingTop
} from "@/api/statistics.js"
import {
	formatDate,
	getTime
} from "@/utils/formatDate.js"
export default {
	namespaced: true,

	state: {
		userData: {
			isLoding: true,
			data: 0
		},
		orderData: {
			isLoding: true,
			data: 0
		},
		shopingTop: {
			isLoding: true,
			data: []
		},
		salesData: {
			data: {},
			isLoding: true
		}
	},
	mutations: {
		//存储用户数量
		setUserData(state, data) {
			state.userData.isLoding = false
			state.userData.data = data
		},
		//存储订单数量
		setOrderData(state, data) {
			state.orderData.isLoding = false
			state.orderData.data = data
		},
		//存储榜单数据
		setTopData(state, data) {
			state.shopingTop.isLoding = false
			state.shopingTop.data = data
		},
		//存储销售额度
		setSalesData(state, data) {
			state.salesData.data = data
			state.salesData.isLoding = false
		}


	},
	actions: {
		//获取营业额度统计
		async actionsGetTurnover(ctx) {
			const time = await getTime()
			if (time) {
				//获取天营业额
				const dayRes = await getTurnover({
					begin: time.today,
					end: time.tomorrow
				})
				//获取周
				const weekRes = await getTurnover({
					begin: time.weekStart,
					end: time.weekEnd
				})
				//获取月
				const moonRes = await getTurnover({
					begin: time.moonStart,
					end: time.moonEnd
				})
				//获取年
				const yearRes = await getTurnover({
					begin: time.yearStart,
					end: time.yearEnd
				})
				const isOk = dayRes.data.code == 200 || weekRes.data.code == 200 || moonRes.data.code == 200 ||
					yearRes.data.code == 200
				if (isOk) {
					const data = {
						day: dayRes.data.data,
						week: weekRes.data.data,
						moon: moonRes.data.data,
						year: yearRes.data.data
					}
					ctx.commit("setSalesData", data)
					return true
				}

			}


		},
		//获取用户量
		async actionsGetUserData(ctx) {
			const res = await getUserData({
				begin: '2000-01-01',
				end: '2023-07-31'
			})
			if (res.data.code == 200) {
				ctx.commit("setUserData", res.data.data)
			}

		},
		//获取订单量
		async actionsGetOrderStatistics(ctx) {
			const res = await getOrderStatistics({
				begin: '2000-01-01',
				end: '2023-07-31'
			})
			if (res.data.code == 200) {
				ctx.commit("setOrderData", res.data.data)

			}

		},
		//获取榜单商品
		async actionsGetShopingTop(ctx) {
			const time = await getTime()
			if (time) {
				const res = await getShopingTop({
					begin: time.yearStart,
					end: time.yearEnd
				})
				if (res.data.code == 200) {
					console.log(res);

					ctx.commit("setTopData", res.data.data)

				}

			}


		},
	}
}