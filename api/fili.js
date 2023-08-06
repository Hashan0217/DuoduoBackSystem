import requset from "./index"

//上传文件

export async function upFilies(data) {
	let filiesInfo = {
		url: '/file/upload',
		method: 'POST',
		data: {
			...data
		}
	}

	const res = await requset(filiesInfo)
	return res
}

//预览文件
export async function filiesPreview(data) {
	let previewInfo = {
		url: '/file/preview',
		method: 'POST',
		data: {
			fileName: data
		}
	}

	const res = await requset(previewInfo)
	return res
}

//删除文件
export async function deletePreview(data) {
	let deleteInfo = {
		url: '/file/delete',
		method: 'DELETE',
		data: {
			fileName: data
		}
	}

	const res = await requset(deleteInfo)
	return res
}