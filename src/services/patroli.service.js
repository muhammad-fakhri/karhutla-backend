import Moment from 'moment'
import { SimaduAPI, simaduApiUrl } from '../api'

export default class PatroliService {
	static async getPatroli(date) {
		try {
			const patroliSpots = []
			const patroliTerpadu = []
			const patroliMandiri = []
			const patroliRutin = []
			const counter = {
				mandiri: 0,
				rutin: 0,
				terpadu: 0
			}
			const res = await SimaduAPI.get(`/list?tanggal_patroli=${date}`)
			const patroliData = res.data
			patroliData.forEach((item) => {
				item.forEach((patroli) => {
					if (patroli.laporanDarat[0]) {
						const data = {}
						data.latitude = patroli.laporanDarat[0].latitude
						data.longitude = patroli.laporanDarat[0].longitude
						const baseMarkerUrl =
							'http://maps.google.com/mapfiles/ms/icons/'
						if (patroli.kategori_patroli === 'Mandiri') {
							data.marker = `${baseMarkerUrl}blue-dot.png`
							counter.mandiri += 1
						}
						if (patroli.kategori_patroli === 'Rutin') {
							data.marker = `${baseMarkerUrl}green-dot.png`
							counter.rutin += 1
						}
						if (patroli.kategori_patroli === 'Terpadu') {
							data.marker = `${baseMarkerUrl}yellow-dot.png`
							counter.terpadu += 1
						}
						data.patroli = patroli
						patroliSpots.push(data)
					}

					const data2 = {}
					data2.reportLink = `${simaduApiUrl}/download/${patroli.id_laporan_header}`
					data2.patrolRegion =
						patroli.id_daerah_patroli.nama_daerah_patroli
					data2.operationRegion = patroli.id_daerah_patroli.nama_daops

					// Format patrol date to DD-MM-YYYY
					const tempDate = Moment(patroli.tanggal_patroli)
					data2.patrolDate = tempDate.format('DD-MM-YYYY')

					if (patroli.kategori_patroli === 'Terpadu')
						patroliTerpadu.push(data2)
					else if (patroli.kategori_patroli === 'Mandiri')
						patroliMandiri.push(data2)
					else if (patroli.kategori_patroli === 'Rutin')
						patroliRutin.push(data2)
				})
			})

			return {
				patroliSpots,
				counter,
				patroliTerpadu,
				patroliMandiri,
				patroliRutin
			}
		} catch (error) {
			return error
		}
	}

	static async getAllPatroliTerpadu(url) {
		try {
			const patroliTerpadu = []
			const date = new Moment()
			for (let index = 0; index < 5; index += 1) {
				if (index !== 0) date.subtract(1, 'days')
				const res = await SimaduAPI.get(url, {
					params: {
						tanggal_patroli: date.format('D-MM-YYYY')
					}
				})
				const patroliData = res.data
				patroliData.forEach((item) => {
					item.forEach((patroli) => {
						if (patroli.kategori_patroli === 'Terpadu') {
							const data = {}
							data.reportLink = `${simaduApiUrl}/download/${patroli.id_laporan_header}`
							data.patrolRegion =
								patroli.id_daerah_patroli.nama_daerah_patroli
							data.operationRegion =
								patroli.id_daerah_patroli.nama_daops
							data.patrolDate = patroli.tanggal_patroli
							patroliTerpadu.push(data)
						}
					})
				})
			}
			return patroliTerpadu
		} catch (error) {
			return error
		}
	}

	static async getAllPatroliMandiri(url) {
		try {
			const patroliMandiri = []
			const date = new Moment()
			for (let index = 0; index < 5; index += 1) {
				if (index !== 0) date.subtract(1, 'days')
				const res = await SimaduAPI.get(url, {
					params: {
						tanggal_patroli: date.format('D-MM-YYYY')
					}
				})
				const patroliData = res.data
				patroliData.forEach((item) => {
					item.forEach((patroli) => {
						if (patroli.kategori_patroli === 'Mandiri') {
							const data = {}
							data.reportLink = `${simaduApiUrl}/download/${patroli.id_laporan_header}`
							data.patrolRegion =
								patroli.id_daerah_patroli.nama_daerah_patroli
							data.operationRegion =
								patroli.id_daerah_patroli.nama_daops
							data.patrolDate = patroli.tanggal_patroli
							patroliMandiri.push(data)
						}
					})
				})
			}
			return patroliMandiri
		} catch (error) {
			return error
		}
	}

	static async getAllPatroliRutin(url) {
		try {
			const patroliRutin = []
			const date = new Moment()
			for (let index = 0; index < 5; index += 1) {
				if (index !== 0) date.subtract(1, 'days')
				const res = await SimaduAPI.get(url, {
					params: {
						tanggal_patroli: date.format('D-MM-YYYY')
					}
				})
				const patroliData = res.data
				patroliData.forEach((item) => {
					item.forEach((patroli) => {
						if (patroli.kategori_patroli === 'Rutin') {
							const data = {}
							data.reportLink = `${simaduApiUrl}/download/${patroli.id_laporan_header}`
							data.patrolRegion =
								patroli.id_daerah_patroli.nama_daerah_patroli
							data.operationRegion =
								patroli.id_daerah_patroli.nama_daops
							data.patrolDate = patroli.tanggal_patroli
							patroliRutin.push(data)
						}
					})
				})
			}
			return patroliRutin
		} catch (error) {
			return error
		}
	}
}
