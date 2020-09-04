import { apiUrl } from './config';

class PenugasanService {
    static async getAllPenugasan(url) {
        const r = await (await fetch(url)).json();
        if (r.status == 200) {
            const data = new Array();
            r.data.forEach(work => {
                data.push({
                    id: work.id,
                    number: work.nomor,
                    type: work.jenis_surat,
                    startDate: work.tanggal_awal,
                    finishDate: work.tanggal_akhir
                })
            });
            return data;
        } else {
            return new Array();
        }
    }
}
export default PenugasanService;