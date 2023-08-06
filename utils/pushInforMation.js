export async function pushInforMation() {

	const APPID = 'wx77328d1368398c36';
	const APPSECRET = '5331e159637c0ac237a099d018a77456';

	//获取ACCESS_TOKEN
	const tokenRes = await uni.request({
		url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
		method: 'GET',
	})
	const ACCESS_TOKEN = tokenRes.data.access_token
	const OPENID = uni.getStorageSync('OPENID')

	const data = {
		"touser": OPENID,
		"template_id": "NrMU9sY3rMZXH4_Rt19pFW3vQ3MsCoHmVIh9TWfNTyE",
		"page": "my-order/index",
		"miniprogram_state": "developer",
		"lang": "zh_CN",
		"data": {
			"character_string2": {
				"value": "A17"
			},
			"phrase4": {
				"value": "支付成功"
			},
			"amount5": {
				"value": "55.00"
			},
			"thing6": {
				"value": "生蚝大套餐"
			},
			"thing7": {
				"value": "多放蒜泥，要辣~"
			}
		}
	}
	if (true) {

		const mationRes = await wx.request({
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			url: `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${ACCESS_TOKEN}`,
			data: JSON.stringify(data)
		})
		console.log(mationRes);
	}


}