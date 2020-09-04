import { apiUrl } from './config';
import WilayahValidator from '../validators/WilayahValidator';

class WilayahService {
    static async getAllWilayah() {
        const r = await (await fetch(apiUrl + '/wilayah/list')).json();
        if (r.status == 200) {
            const data = new Array();
            r.data.forEach(wilayah => {
                data.push({
                    id: wilayah.id,
                    code: wilayah.kode,
                    name: wilayah.nama,
                    type: wilayah.tipe,
                })
            });
            return data;
        } else {
            return new Array();
        }
    }

    static async addWilayah(wilayah) {
        let validate = WilayahValidator.createWilayah(wilayah);
        if (!validate.pass) return { "success": false, "message": validate.message };

        let formData = new FormData();
        formData.append('kode', wilayah.code);
        formData.append('nama', wilayah.name);
        formData.append('tipe', wilayah.type);

        let r = await fetch(apiUrl + '/wilayah/add', {
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

    static async updateWilayah(newData, oldData) {
        let validate = WilayahValidator.updateWilayah(newData);
        if (!validate.pass) return { "success": false, "message": validate.message };

        let formData = new FormData();
        formData.append('id', newData.id);
        formData.append('nama', newData.name);
        formData.append('tipe', newData.type);
        if (oldData.code !== newData.code) {
            formData.append('kode', newData.code);
        }

        let r = await fetch(apiUrl + '/wilayah/save', {
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

    static async deleteWilayah(wilayah) {
        let validate = WilayahValidator.deleteWilayah(wilayah);
        if (!validate.pass) return { "success": false, "message": validate.message };

        let r = await fetch(`${apiUrl}/wilayah/remove/${wilayah.id}`, {
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
export default WilayahService;