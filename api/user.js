import requset from "./index"

//登录

export async function userLogin(data) {
	let userInfo = {
		url: '/admin/employee/login',
		method: 'POST',
		data: {
			...data
		}
	}

	const res = await requset(userInfo)
	return res
}
//获取全部用户
export async function getUserAll(data) {
	let userInfo = {
		url: '/admin/employee/page',
		method: 'POST',
		data: {
			...data
		}
	}

	const res = await requset(userInfo)
	return res
}

//根据id获取用户
export async function getUserItem(id) {
	let userInfo = {
		url: `/admin/employee/${id}`,
		method: 'POST',
	}

	const res = await requset(userInfo)
	return res
}
//注册账号
export async function addUser(data) {
	let userInfo = {
		url: '/admin/employee/save',
		method: 'POST',
		data: {
			...data
		}
	}

	const res = await requset(userInfo)
	return res
}

//修改账号
export async function reviseUser(data) {
	let userInfo = {
		url: '/admin/employee/update',
		method: 'POST',
		data: {
			...data
		}
	}

	const res = await requset(userInfo)
	return res
}