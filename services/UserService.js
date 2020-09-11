import API from '../api';
import UserValidator from '../validators/UserValidator';

class UserService {
    static async getNonPatroliUsers(url) {
        const r = await API.get(url);
        if (r.status == 200) {
            const daopsUsers = new Array();
            const balaiUsers = new Array();
            r.data.forEach(userAccess => {
                if (userAccess.r_role_id == 8 || userAccess.r_role_id == 9) {
                    daopsUsers.push({
                        id: userAccess.m_user.id,
                        accessId: userAccess.id,
                        role: userAccess.r_role_id,
                        organization: userAccess.m_user.instansi,
                        nip: userAccess.m_user.no_registrasi,
                        name: userAccess.m_user.nama,
                        email: userAccess.m_user.email,
                        phone: userAccess.m_user.no_telepon
                    });
                } else {
                    balaiUsers.push({
                        id: userAccess.m_user.id,
                        accessId: userAccess.id,
                        role: userAccess.r_role_id,
                        organization: userAccess.m_user.instansi,
                        nip: userAccess.m_user.no_registrasi,
                        name: userAccess.m_user.nama,
                        email: userAccess.m_user.email,
                        phone: userAccess.m_user.no_telepon
                    });
                }
            });
            return { daopsUsers, balaiUsers };
        } else {
            return new Array();
        }
    }

    static async getNonPatroliRoles() {
        const r = await API.get('/role/list');
        if (r.status == 200) {
            const data = new Array();
            r.data.forEach(role => {
                if (role.id <= 9) {
                    data.push({
                        id: role.id,
                        name: role.nama,
                        level: role.level,
                        active: role.aktif
                    })
                }
            });
            return data;
        } else {
            return new Array();
        }
    }

    static async getPatroliRoles() {
        const r = await API.get('/role/list');
        if (r.status == 200) {
            const data = new Array();
            r.data.forEach(role => {
                if (role.id > 9) {
                    data.push({
                        id: role.id,
                        name: role.nama,
                        level: role.level,
                        active: role.aktif
                    });
                }
            });
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

        const r = await API.post('/user/add', formData);

        if (r.status == 200) {
            const r2 = await API.get('/user/list');
            let id = null;
            r2.data.forEach(user => {
                if (user.email === data.email) {
                    id = user.id;
                }
            });
            let formData2 = new FormData();
            formData2.append('m_user_id', id);
            formData2.append('r_role_id', data.role);

            const r3 = await API.post('/non_patroli/add', formData2);

            if (r3.status == 200) {
                return { "success": true };
            } else {
                return { "success": false, "message": [r3.message] };
            }
        } else {
            return { "success": false, "message": [r.message] };
        }
    }

    static async updateNonPatroliUser(data) {
        let validate = UserValidator.updateNonPatroli(data);
        if (!validate.pass) return { "success": false, "message": validate.message };

        // update user data 
        let formData = new FormData();
        formData.append('id', data.id);
        formData.append('nama', data.name);
        formData.append('no_telepon', data.phone);
        formData.append('instansi', data.organization);

        const r = await API.post('/user/save', formData);

        if (r.status == 200) {
            // update user's role
            let formData2 = new FormData();
            formData2.append('id', data.accessId);
            formData2.append('r_role_id', data.role);

            const r2 = await API.post('non_patroli/save', formData2);

            if (r2.status == 200) {
                return { "success": true };
            } else {
                return { "success": false, "message": [r2.message] };
            }
        } else {
            return { "success": false, "message": [r.message] };
        }
    }

    static async deleteNonPatroliUser(data) {
        let validate = UserValidator.deleteNonPatroli(data);
        if (!validate.pass) return { "success": false, "message": validate.message };

        // TODO: fix double hit that causing 404 response
        // delete non patroli access
        const r = await API.delete(`/non_patroli/remove/${data.accessId}`);

        // delete user data
        const r2 = await API.delete(`/user/remove/${data.id}`);

        return { "success": true };
    }
}
export default UserService;