import { apiUrl } from './config';
import fetch from 'isomorphic-unfetch';
import UserValidator from '../validators/UserValidator';

class UserService {
    static async getNonPatroliUsers(url) {
        const r = await (await fetch(url)).json();
        if (r.status == 200) {
            const data = new Array();
            r.data.forEach(user => {
                data.push({
                    id: user.m_user.id,
                    region: user.m_user.instansi,
                    nipNumber: user.m_user.no_registrasi,
                    name: user.m_user.nama,
                    email: user.m_user.email,
                    phoneNumber: user.m_user.no_telepon
                })
            });
            return data;
        } else {
            return new Array();
        }
    }

    static async getNonPatroliRoles() {
        const r = await (await fetch(apiUrl + '/role/list')).json();
        if (r.status == 200) {
            const data = new Array();
            r.data.forEach(role => {
                data.push({
                    id: role.id,
                    name: role.nama,
                    level: role.level,
                    active: role.aktif
                })
            });
            data.pop();
            data.pop();
            data.pop();
            data.pop();
            data.pop();
            return data;
        } else {
            return new Array();
        }
    }

    static async addNonPatroliUser(data) {
        console.log(data);
        let validate = UserValidator.createNonPatroli(data);
        if (!validate.pass) return { "success": false, "message": validate.message };

        let formData = new FormData();
        formData.append('no_registrasi', data.nip);
        formData.append('nama', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('no_telepon', data.phone);
        formData.append('instansi', data.institution);
        formData.append('aktif', true);
        const r = await (await fetch(apiUrl + '/user/add', {
            method: 'POST',
            body: formData
        })).json();

        if (r.status == 200) {
            const r2 = await (await fetch(apiUrl + '/user/list')).json();
            let id = null;
            r2.data.forEach(user => {
                if (user.email === data.email) {
                    id = user.id;
                }
            });
            let formData2 = new FormData();
            formData2.append('m_user_id', id);
            formData2.append('r_role_id', data.role);
            const r3 = await (await fetch(apiUrl + '/non_patroli/add', {
                method: 'POST',
                body: formData2
            })).json();

            if (r3.status == 200) {
                return { "success": true };
            } else {
                return { "success": false, "message": [r3.message] };
            }
        } else {
            return { "success": false, "message": [r.message] };
        }
    }
}
export default UserService;