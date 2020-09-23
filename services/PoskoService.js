import PoskoValidator from "../validators/PoskoValidator";
import API from "../api";

class PoskoService {
  static async getAllPosko() {
    const r = await API.get("/posko/list");
    if (r.status == 200) {
      const data = new Array();
      r.data.forEach((posko) => {
        data.push({
          id: posko.id,
          name: posko.nama,
          daops: posko.daops,
          kecamatan: posko.kecamatan.nama,
          kelurahan: posko.kelurahan.nama,
          desa: posko.desa ? posko.desa.nama : "",
        });
      });
      return data;
    } else {
      return new Array();
    }
  }

  static async addPosko(posko) {
    let validate = PoskoValidator.createPosko(posko);
    if (!validate.pass) return { success: false, message: validate.message };

    let formData = new FormData();
    formData.append("kode", posko.code);
    formData.append("nama", posko.name);
    formData.append("r_balai_id", posko.balaiId);

    let r = await API.post("/posko/add", formData);

    if (r.status == 200) {
      return { success: true };
    } else {
      return { success: false, message: [r.message] };
    }
  }

  static async updatePosko(newData, oldData) {
    let validate = PoskoValidator.updatePosko(newData);
    if (!validate.pass) return { success: false, message: validate.message };

    let formData = new FormData();
    formData.append("id", newData.id);
    formData.append("nama", newData.name);
    formData.append("r_balai_id", newData.balaiId);
    if (oldData.code !== newData.code) {
      formData.append("kode", newData.code);
    }

    let r = await API.post("/posko/save", formData);

    if (r.status == 200) {
      return { success: true };
    } else {
      return { success: false, message: [r.message] };
    }
  }

  static async deletePosko(posko) {
    let validate = PoskoValidator.deletePosko(posko);
    if (!validate.pass) return { success: false, message: validate.message };

    let r = await API.delete(`/posko/remove/${posko.id}`);

    // TODO: Fix backend, because delete method always 404
    // if (r.status == 200) {
    return { success: true };
    // } else {
    //     r = await r.json();
    //     return { "success": false, "message": [r.message] };
    // }
  }
}
export default PoskoService;
