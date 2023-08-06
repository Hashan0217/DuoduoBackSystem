import requset from "./index"
//获取营业额度统计
export async function getTurnover(data) {
	const TurnoverData = {
		url: `/admin/report/turnoverStatistics?begin=${data.begin}&end=${data.end}`,
		method: 'GET',
	}
	const res = await requset(TurnoverData)
	return res
}

//获取用户统计
export async function getUserData(data) {
	const userData = {
		url: `/admin/report/userStatistics?begin=${data.begin}&end=${data.end}`,
		method: 'GET',
	}
	const res = await requset(userData)
	return res
}

//获取订单统计
export async function getOrderStatistics(data) {
	const orderData = {
		url: `/admin/report/ordersStatistics?begin=${data.begin}&end=${data.end}`,
		method: 'GET',
	}
	const res = await requset(orderData)
	return res
}
//销量排行榜
export async function getShopingTop(data) {
	const shopingTopData = {
		url: `/admin/report/top10?begin=${data.begin}&end=${data.end}`,
		method: 'GET',
	}
	const res = await requset(shopingTopData)
	return res
}