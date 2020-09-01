import { apiUrl } from './config';
import fetch from 'isomorphic-unfetch';
import UserValidator from '../validators/UserValidator';

class UserService {
    static async getNonPatroliUsers(url) {
        const r = await (await fetch(url)).json();
        if (r.status == 200) {
            const daopsUsers = new Array();
            const balaiUsers = new Array();
            r.data.forEach(user => {
                if (user.r_role_id == 8 || user.r_role_id == 9) {
                    daopsUsers.push({
                        id: user.m_user.id,
                        role: user.r_role_id,
                        organization: user.m_user.instansi,
                        nip: user.m_user.no_registrasi,
                        name: user.m_user.nama,
                        email: user.m_user.email,
                        phone: user.m_user.no_telepon
                    });
                } else {
                    balaiUsers.push({
                        id: user.m_user.id,
                        role: user.r_role_id,
                        organization: user.m_user.instansi,
                        nip: user.m_user.no_registrasi,
                        name: user.m_user.nama,
                        email: user.m_user.email,
                        phone: user.m_user.no_telepon
                    });
                }
            });
            return { daopsUsers, balaiUsers };
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
        let validate = UserValidator.createNonPatroli(data);
        if (!validate.pass) return { "success": false, "message": validate.message };

        let formData = new FormData();
        formData.append('no_registrasi', data.nip);
        formData.append('nama', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('no_telepon', data.phone);
        formData.append('instansi', data.organization);
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

    static async updateDaopsUser(data) {
        let validate = UserValidator.updateNonPatroli(data);
        if (!validate.pass) return { "success": false, "message": validate.message };

        // update user data 
        let formData = new FormData();
        formData.append('id', data.id);
        formData.append('nama', data.name);
        formData.append('no_telepon', data.phone);
        formData.append('instansi', data.organization);
        let r = await fetch(apiUrl + '/user/save', {
            method: 'POST',
            body: formData
        });
        // return { "success": true };

        if (r.status == 200) {
            console.log("update user data berhasil");
            // update user's role
            console.log(data);
            let formData2 = new FormData();
            formData2.append('id', data.id);
            formData2.append('r_role_id', data.role);
            let r2 = await fetch(apiUrl + '/non_patroli/save', {
                method: 'POST',
                body: formData2
            });

            if (r2.status == 200) {
                console.log("update role berhasil");
                return { "success": true };
            } else {
                console.log("update role gagal");
                r2 = await r2.json();
                console.log(r2);
                return { "success": false, "message": [r2.message] };
            }
        } else {
            console.log("update user data gagal");
            r = r.json();
            return { "success": false, "message": [r.message] };
        }
    }
}
export default UserService;