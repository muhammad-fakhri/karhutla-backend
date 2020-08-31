import { apiUrl } from './config';
import fetch from 'isomorphic-unfetch';

class DaopsService {
    static async getAllDaops() {
        const r = await (await fetch(apiUrl + '/daops/list')).json();
        if (r.status == 200) {
            const data = new Array();
            r.data.forEach(daops => {
                data.push({
                    id: daops.id,
                    code: daops.kode,
                    name: daops.nama,
                })
            });
            return data;
        } else {
            return new Array();
        }
    }
}
export default DaopsService;