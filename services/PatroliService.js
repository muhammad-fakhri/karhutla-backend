import { simaduApiUrl, simadu2Url } from './config';

export default class PatroliService {
    static async getPatroli(date) {
        try {
            let patroliSpots = new Array();
            let patroliTerpadu = new Array();
            let patroliMandiri = new Array();
            let patroliPencegahan = new Array();
            let counter = {
                mandiri: 0,
                pencegahan: 0,
                terpadu: 0
            };
            const url = `${simaduApiUrl}/list?tanggal_patroli=${date}`;
            const res = await (await fetch(url)).json();
            let patroliData = res.data;
            patroliData.forEach((item) => {
                item.forEach(patroli => {
                    if (patroli.laporanDarat[0]) {
                        let data = {};
                        data.latitude = patroli.laporanDarat[0].latitude;
                        data.longitude = patroli.laporanDarat[0].longitude;
                        const baseMarkerUrl = 'http://maps.google.com/mapfiles/ms/icons/';
                        if (patroli.kategori_patroli == 'Mandiri') {
                            data.marker = baseMarkerUrl + "blue-dot.png";
                            counter.mandiri++;
                        }
                        if (patroli.kategori_patroli == 'Pencegahan') {
                            data.marker = baseMarkerUrl + "green-dot.png";
                            counter.pencegahan++;
                        }
                        if (patroli.kategori_patroli == 'Terpadu') {
                            data.marker = baseMarkerUrl + "yellow-dot.png";
                            counter.terpadu++;
                        }
                        data.patroli = patroli;
                        patroliSpots.push(data);
                    }

                    let data2 = {};
                    data2.reportLink = `${simadu2Url}/app/downloader.php?id=${patroli.id_laporan_header}`;
                    data2.patrolRegion = patroli.id_daerah_patroli.nama_daerah_patroli;
                    data2.operationRegion = patroli.id_daerah_patroli.nama_daops;
                    data2.patrolDate = patroli.tanggal_patroli;
                    if (patroli.kategori_patroli === 'Terpadu') patroliTerpadu.push(data2);
                    else if (patroli.kategori_patroli === 'Mandiri') patroliMandiri.push(data2);
                    else if (patroli.kategori_patroli === 'Pencegahan') patroliPencegahan.push(data2);
                });
            });

            return {
                patroliSpots,
                counter,
                patroliTerpadu,
                patroliMandiri,
                patroliPencegahan
            }
        } catch (error) {
            console.log(error);
        }
    }
}