import {
	addTable,
	checkTableNumAll,
	ReviseTable,
	DelletTable
} from "@/api/table.js"
export default {
	namespaced: true,

	state: {
		table_data: null
	},
	mutations: {
		//查询桌号
		setTableNumAll(state, data) {
			state.table_data = data
		},
		//修改桌号
		ReviseTableNumber(state, data) {
			state.table_data.forEach(item => {
				if (item.id == data.id) {
					item.name = data.name
					return true
				}
			})
		},
		//删除桌号
		DeletTableNumber(state, data) {
			const newArr = []
			state.table_data.forEach(item => {
				if (data != item.id) {
					newArr.push(item)
				}
			})
			state.table_data = newArr
			return true
		}


	},
	actions: {
		//添加桌号
		async addTableNum(ctx, name) {

			const res = await addTable(name)
			if (res.data.code == 200) {
				return true
			} else {
				return false
			}
		},
		//查询所有桌号
		async checkTableNumAll(ctx) {
			const res = await checkTableNumAll()
			if (res.data.code == 200) {
				const data = res.data.data
				ctx.commit("setTableNumAll", data)
				return true
			} else {
				return false
			}
		},
		//修改桌号
		async ReviseTableNumber(ctx, data) {
			const res = await ReviseTable(data)
			if (res.data.code == 200) {
				ctx.commit("ReviseTableNumber", data)
				return true
			} else {
				return false
			}
		},
		//删除桌号
		async DelletTableNum(ctx, id) {
			const res = await DelletTable(id)
			if (res.data.code == 200) {
				ctx.commit("DeletTableNumber", id)
				return true
			} else {
				return false
			}
		}
	}
}