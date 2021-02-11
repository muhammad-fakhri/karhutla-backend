import { SiavipalaAPI } from '../api'
import { APIResponse, HotspotItem, HotspotResponse } from '../interfaces'

export default class HotspotService {
	static async getHotspot(url: string): Promise<HotspotItem[]> {
		try {
			const res: APIResponse<HotspotResponse> = await SiavipalaAPI.get(
				url
			)
			const hotspots: HotspotItem[] = []
			res.data.hostspot_sipongi.map((item) => {
				item.sebaran_hotspot.map((item) => {
					hotspots.push(item)
				})
			})
			return hotspots
		} catch (error) {
			return error
		}
	}
}
