	/**
	 * @param initData object 必传  配置函数信息
	 * @param initData {  storeFun 调度的仓库函数 ， message 报错信息 ，  }
	 * @returns null
	 * 
	 */
	import app from "@/main.js"

	export default async function(sotreFunName, storeData, errMessage) {

		uni.showLoading({
			title: '加载中',
			mask: true
		});
		const res = await app.$store.dispatch(sotreFunName, storeData || "")
		if (res) {
			uni.hideLoading();
			return res
		} else {
			uni.hideLoading();
			uni.showToast({
				title: errMessage,
				duration: 2000,
				icon: 'error',
				// mask: true
			});
			return res
		}


	}