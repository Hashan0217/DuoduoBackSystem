import requset from "./index"

//增加桌子api

export async function addTable(name) {
	let addTableInfo = {
		url: '/admin/table/save',
		method: 'POST',
		data: {
			name
		}
	}

	return await requset(addTableInfo)

}

//获取全部桌号
export async function checkTableNumAll() {
	let checkTableNumberInfo = {
		url: '/admin/table/select',
		method: 'GET',
	}
	return await requset(checkTableNumberInfo)

}

//修改桌号
export async function ReviseTable(info) {
	let ReviseTableNumberInfo = {
		url: '/admin/table/update',
		method: 'PUT',
		data: {
			id: info.id,
			name: info.name
		}
	}
	return await requset(ReviseTableNumberInfo)

}


//删除桌号
export async function DelletTable(id) {
	let DelletTableNumberInfo = {
		url: `/admin/table/delete/${id}`,
		method: 'DELETE',
		query: true,
	}
	return await requset(DelletTableNumberInfo)

}