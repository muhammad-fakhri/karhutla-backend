import { apiUrl } from './config';
import DaopsValidator from '../validators/DaopsValidator';

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
                    balaiId: daops.r_balai_id
                })
            });
            return data;
        } else {
            return new Array();
        }
    }

    static async addDaops(daops) {
        let validate = DaopsValidator.createDaops(daops);
        if (!validate.pass) return { "success": false, "message": validate.message };
        
        let formData = new FormData();
        formData.append('kode', daops.code);
        formData.append('nama', daops.name);
        formData.append('r_balai_id', daops.balaiId);

        let r = await fetch(apiUrl + '/daops/add', {
            method: 'POST',
            body: formData
        });

        if (r.status == 200) {
            return { "success": true };
        } else {
            r = await r.json();
            return { "success": false, "message": [r.message] };
        }
    }

    static async updateDaops(newData, oldData) {
        let validate = DaopsValidator.updateDaops(newData);
        if (!validate.pass) return { "success": false, "message": validate.message };

        let formData = new FormData();
        formData.append('id', newData.id);
        formData.append('nama', newData.name);
        formData.append('r_balai_id', newData.balaiId);
        if (oldData.code !== newData.code) {
            formData.append('kode', newData.code);
        }

        let r = await fetch(apiUrl + '/daops/save', {
            method: 'POST',
            body: formData
        });

        if (r.status == 200) {
            return { "success": true };
        } else {
            r = await r.json();
            return { "success": false, "message": [r.message] };
        }
    }

    static async deleteDaops(daops) {
        let validate = DaopsValidator.deleteDaops(daops);
        if (!validate.pass) return { "success": false, "message": validate.message };
        
        let r = await fetch(`${apiUrl}/daops/remove/${daops.id}`, {
            method: 'DELETE'
        });

        // TODO: Fix backend, because delete method always 404
        // if (r.status == 200) {
        return { "success": true };
        // } else {
        //     r = await r.json();
        //     return { "success": false, "message": [r.message] };
        // }
    }
}
export default DaopsService;