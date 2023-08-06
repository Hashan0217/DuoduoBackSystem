import {
	userLogin,
	getUserAll,
	getUserItem,
	addUser,
	reviseUser
} from "@/api/user.js"

export default {
	namespaced: true,

	state: {
		isLoding: false,
		userInfo: null
	},
	mutations: {
		addUserInfo(state, data) {
			state.userInfo = data
		},
		changeIsLoding(state, data) {
			state.isLoding = data
		},
	},
	actions: {
		//登录
		async userLogin(ctx, userInfo) {
			ctx.commit("changeIsLoding", true)
			const res = await userLogin(userInfo)
			if (res.data.code == 200) {
				ctx.commit("addUserInfo", res.data.data)
				uni.setStorageSync('token', res.data.data.token); //本地存储
			} else {
				return {
					code: 201,
					err: res.errMsg
				}
			}
			ctx.commit("changeIsLoding", false)
			return {
				code: 200
			}
		},
		//注册
		async actionAddUser(ctx, userInfo) {
			const res = await addUser(userInfo)
			if (res.data.code == 200) {
				return true
			} else {
				return false
			}
		},
		//根据id查询
		async actionGetUserItem(ctx, id) {
			const res = await getUserItem(id)
			if (res.data.code == 200) {
				console.log(res);
				true
			} else {
				false
			}
		},
		//查询用户
		async actionGetUserAll(ctx, userInfo) {
			const res = await getUserItem(userInfo)
			if (res.data.code == 200) {
				console.log(res);
				true
			} else {
				false
			}
		},
		//修改用户
		async actionReviseUser(ctx, userInfo) {
			const res = await getUserItem(userInfo)
			if (res.data.code == 200) {
				console.log(res);
				true
			} else {
				false
			}
		},
	}
}