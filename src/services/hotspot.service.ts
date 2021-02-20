import { SiavipalaAPI } from '@api'
import { HotspotItem, HotspotResponse } from '@interface'

export const getHotspot = async (url: string): Promise<HotspotItem[]> => {
	try {
		const res: HotspotResponse = await SiavipalaAPI.get(url)
		const hotspots: HotspotItem[] = []
		if (res.hostspot_sipongi.length < 1) {
			return hotspots
		}
		res.hostspot_sipongi.map((item) => {
			item.sebaran_hotspot.map((item) => {
				hotspots.push(item)
			})
		})
		return hotspots
	} catch (error) {
		return error
	}
}
