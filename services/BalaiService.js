import API from "../api";
import BalaiValidator from "../validators/BalaiValidator";

class BalaiService {
  static async getAllBalai() {
    const r = await API.get("/balai/list");
    if (r.status == 200) {
      const data = new Array();
      r.data.forEach((balai) => {
        data.push({
          id: balai.id,
          code: balai.kode,
          name: balai.nama,
          region: balai.r_wilayah_id,
        });
      });
      return data;
    } else {
      return new Array();
    }
  }

  static async addBalai(balai) {
    let validate = BalaiValidator.createBalai(balai);
    if (!validate.pass) return { success: false, message: validate.message };

    let formData = new FormData();
    formData.append("kode", balai.code);
    formData.append("nama", balai.name);
    formData.append("r_wilayah_id", balai.region);

    let r = await API.post("/balai/add", formData);
    if (r.status == 200) {
      return { success: true };
    } else {
      return { success: false, message: [r.message] };
    }
  }

  static async updateBalai(newData, oldData) {
    let validate = BalaiValidator.updateBalai(newData);
    if (!validate.pass) return { success: false, message: validate.message };

    let formData = new FormData();
    formData.append("id", newData.id);
    formData.append("nama", newData.name);
    formData.append("r_wilayah_id", newData.region);
    if (oldData.code !== newData.code) {
      formData.append("kode", newData.code);
    }

    let r = await API.post("/balai/save", formData);

    if (r.status == 200) {
      return { success: true };
    } else {
      return { success: false, message: [r.message] };
    }
  }

  static async deleteBalai(balai) {
    const validate = BalaiValidator.deleteBalai(balai);
    if (!validate.pass) return { success: false, message: validate.message };

    const r = await API.delete(`/balai/remove/${balai.id}`);

    if (r.status == 200) {
      return { success: true };
    } else {
      r = await r.json();
      return { success: false, message: [r.message] };
    }
  }
}
export default BalaiService;
