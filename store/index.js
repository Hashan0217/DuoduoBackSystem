import Vue from 'vue'
import Vuex from 'vuex'

import table_store from "./table_store.js"
import user_info from "./user_info.js"
import menu_store from "./menu_store.js"
import statistics_store from "./statistics_store.js"
import order_store from "./order_store.js"
Vue.use(Vuex)


export default new Vuex.Store({
	modules: {
		table_store,
		user_info,
		menu_store,
		statistics_store,
		order_store
	},
	strict: true,
})