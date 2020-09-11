import { SiavipalaAPI } from '../api';

export default class HotspotService {
    static async getHotspot(url) {
        let responses = new Array();
        let hotspots = new Array();
        try {
            const res = await SiavipalaAPI.get(url);
            responses = res.hostspot_sipongi;
            responses.forEach((item) => {
                item.sebaran_hotspot.forEach((item) => {
                    hotspots.push(item);
                });
            });
            return hotspots;
        } catch (error) {
            console.log(error);
        }
    }
}