import {
	upFilies,
	filiesPreview
} from "@/api/fili.js"

export default async function(file) {
	const upFiliesInfo = {
		file: file
	}
	const res = await upFilies(upFiliesInfo)
	console.log(res);

	return res
}