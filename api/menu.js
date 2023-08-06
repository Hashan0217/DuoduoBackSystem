import requset from "./index"

//获取所有商品分类
export async function getShopingCategoryAll(data) {
	const CategoryInfo = {
		url: '/admin/category/list',
		method: 'POST',
		data: {
			...data
		}
	}
	const res = await requset(CategoryInfo)
	return res
}


//增加分类
export async function addShopingCategory(data) {
	const addCategoryInfo = {
		url: `/admin/category/save`,
		method: 'POST',
		data: {
			...data
		}
	}

	const res = await requset(addCategoryInfo)
	return res
}

//修改分类
export async function reviseShopingCategory(data) {
	const reviseCategoryInfo = {
		url: `/admin/category/update`,
		method: 'PUT',
		data: {
			...data
		}
	}

	const res = await requset(reviseCategoryInfo)
	return res
}

//删除分类
export async function deconsteShopingCategory(data) {
	const deconsteCategoryInfo = {
		url: `/admin/category/deconste/${data.id}`,
		method: 'DEconstE',
	}

	const res = await requset(deconsteCategoryInfo)
	return res
}

//商品添加
export async function addShopingItem(data) {
	const addShopingItemInfo = {
		url: `/admin/dish/save`,
		method: 'POST',
		data: {
			...data
		}
	}

	const res = await requset(addShopingItemInfo)
	return res
}


//获取商品
export async function getShopingItem(data) {
	const ShopingItemInfo = {
		url: '/admin/dish/page',
		method: 'POST',
		data: {
			...data
		}
	}

	const res = await requset(ShopingItemInfo)
	return res
}
//修改商品
export async function getReviseShopingItem(data) {
	const ShopingItemInfo = {
		url: '/admin/dish/update',
		method: 'PUT',
		data: {
			...data
		}
	}

	const res = await requset(ShopingItemInfo)
	return res
}

//删除商品
export async function deletShopingItem(id) {
	const ShopingItemInfo = {
		url: '/admin/dish/delete',
		method: 'DELETE',
		data: {
			dishId: id
		}
	}

	const res = await requset(ShopingItemInfo)
	return res
}