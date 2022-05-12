import { HotspotAPI } from '@api'
import { APIResponse, HotspotItem } from '@interface'

export const getHotspot = async (url: string): Promise<HotspotItem[]> => {
	try {
		const res: APIResponse<HotspotItem[]> = await HotspotAPI.get(url)
		// console.log(res.data)
		return res.data ? res.data : []
	} catch (error) {
		return error
	}
}
