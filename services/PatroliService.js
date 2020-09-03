import { simaduUrl } from './config';

export default class PatroliService {
    static async getPatroli(date) {
        try {
            let patroliSpots = new Array();
            let counter = {
                mandiri: 0,
                pencegahan: 0,
                terpadu: 0
            };
            const url = `${simaduUrl}/list?tanggal_patroli=${date}`;
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
                });
            });

            return {
                patroliSpots,
                counter
            }
        } catch (error) {
            console.log(error);
        }
    }
}