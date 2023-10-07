export async function getUnlimitedQRCode(parameter) {

	const APPID = 'wx77328d1368398c36';
	const APPSECRET = '5331e159637c0ac237a099d018a77456';
	//获取ACCESS_TOKEN
	const tokenRes = await uni.request({
		url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
		method: 'GET',
	})
	const ACCESS_TOKEN = tokenRes.data.access_token
	const data = {
		"page": "pages/index/index",
		"scene": `id=${parameter},shopId='456456489'`,
		"check_path": true,
		"env_version": "release"
	}
	const mationRes = await uni.request({
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: 'POST',
		url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${ACCESS_TOKEN}`,
		data: JSON.stringify(data),
		responseType: 'arraybuffer'
	})
	const arrayBuffer = new Uint8Array(mationRes.data)
	const base64 = "data:image/png;base64," + uni.arrayBufferToBase64(arrayBuffer)

	return {
		parameter,
		base64
	}



}