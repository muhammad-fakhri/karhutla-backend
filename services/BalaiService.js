import { apiUrl } from './config';

class BalaiService {
    static async getAllBalai() {
        const r = await (await fetch(apiUrl + '/balai/list')).json();
        if (r.status == 200) {
            const data = new Array();
            r.data.forEach(balai => {
                data.push({
                    id: balai.id,
                    code: balai.kode,
                    name: balai.nama,
                })
            });
            return data;
        } else {
            return new Array();
        }
    }
}
export default BalaiService;