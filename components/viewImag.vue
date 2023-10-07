<template>
	<view class="view-image-container">
		<image src="../static/logo.png" mode="" v-if="!iamgeUrl"></image>
		<image :src="iamgeUrl" mode="" v-else></image>
	</view>
</template>

<script>
	import {
		filiesPreview,
	} from "@/api/fili.js"
	export default ({
		props: ["imagName"],
		data() {
			return {
				iamgeUrl: ''
			}
		},
		watch: {
			imagName: {
				async handler(newValue, oldValue) {
					const res = await filiesPreview(newValue)
					this.iamgeUrl = res.data.message
				},
				// 这里增加了一个immediate属性，说明监听到props传参后立即先去执行handler方法
				immediate: true,

			}
		}
	})
</script>

<style scoped>

</style>