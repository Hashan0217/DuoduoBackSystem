import requset from "./index"
//获取订单
export async function getOrder(data) {
	const info = {
		url: `/admin/order/page/getOrderList`,
		method: 'POST',
		data
	}
	const res = await requset(info)
	return res
}

//提交订单
export async function submitOrder(data) {
	const info = {
		url: `/admin/order/confirm/${data}`,
		method: 'PUT',
	}
	const res = await requset(info)
	return res
}
//完成订单
export async function finishOrder(data) {
	const info = {
		url: `/admin/order/complete/${data}`,
		method: 'PUT',
	}
	const res = await requset(info)
	return res
}

//取消订单
export async function cancelOrder(data) {
	const info = {
		url: `/admin/order/cancel/${data}`,
		method: 'PUT',
	}
	const res = await requset(info)
	return res
}