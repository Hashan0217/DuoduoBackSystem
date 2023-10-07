import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

// uView 
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

//仓库
import store from "./store/index.js"

//webSocket
import webSocket from "./utils/websocket.js"
let webSocketItem = new webSocket()
Vue.prototype.$socket = webSocketItem

Vue.config.productionTip = false
App.mpType = 'app'



const app = new Vue({
	store,
	...App
})
app.$mount()
// // #endif

// // #ifdef VUE3
// import {
// 	createSSRApp
// } from 'vue'
// // export function createApp() {
// // 	const app = createSSRApp(App)
// // 	return {
// // 		app
// // 	}
// // }
// // // #endif

export default app