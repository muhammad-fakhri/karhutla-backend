import moment from 'moment';
import { siavipalaUrl } from './config';

export default class HotspotService {
    static async getHotspot(url) {
        let responses = new Array();
        let hotspots = new Array();
        try {
            const res = await (await fetch(url)).json();
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