const BASE_URL = 'http://localhost:8001/api';
// const BASE_URL = '/api';

const token = uni.getStorageSync('token')
// const tokenHead = uni.getStorageSync('tokenHead')


let header = {
	'Content-Type': 'application/json',
	'token': token || ""
}


/**
 * option 配置对象
 */
const request = (option) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + option.url,
			method: option.method || 'GET',
			header: header,
			timeout: 3000,
			data: option.data || '',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export default request;