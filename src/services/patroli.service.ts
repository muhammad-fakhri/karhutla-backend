import { SimaduAPI, simaduApiUrl, apiV2URL } from '@api'
import {
	APIResponse,
	PatrolData,
	PatroliResponse,
	PatroliServiceResponse,
	PatrolListData
} from '@interface'
import Moment from 'moment'

export const getPatroli = async (
	date: string
): Promise<PatroliServiceResponse> => {
	const patroliSpots: PatrolData[] = []
	const patroliTerpadu: PatrolListData[] = []
	const patroliMandiri: PatrolListData[] = []
	const patroliRutin: PatrolListData[] = []
	const counter = {
		mandiri: 0,
		rutin: 0,
		terpadu: 0
	}
	try {
		const res: APIResponse<[[PatroliResponse]]> = await SimaduAPI.get(
			`/list?tanggal_patroli=${date}`
		)
		console.log(res)
		const patroliData = res.data
		patroliData.forEach((item) => {
			item.forEach((patroli) => {
				if (patroli.laporanDarat[0]) {
					const data: PatrolData = {
						latitude: '',
						longitude: '',
						marker: '',
						patroli: null
					}
					data.latitude = patroli.laporanDarat[0].latitude
					data.longitude = patroli.laporanDarat[0].longitude
					const baseMarkerUrl =
						'https://maps.google.com/mapfiles/ms/icons/'
					if (patroli.kategori_patroli === 'Mandiri') {
						data.marker = `${baseMarkerUrl}blue-dot.png`
						counter.mandiri += 1
					}
					if (patroli.kategori_patroli === 'Rutin') {
						data.marker = `${baseMarkerUrl}pink-dot.png`
						counter.rutin += 1
					}
					if (patroli.kategori_patroli === 'Terpadu') {
						data.marker = `${baseMarkerUrl}green-dot.png`
						counter.terpadu += 1
					}
					data.patroli = patroli
					patroliSpots.push(data)
				}

				const data2: PatrolListData = {
					reportLink: '',
					patrolRegion: '',
					operationRegion: '',
					patrolDate: ''
				}
				data2.reportLink = `${apiV2URL}/karhutla/download/${patroli.id_laporan_header}`
				data2.patrolRegion =
					patroli.id_daerah_patroli.nama_daerah_patroli
				data2.operationRegion = patroli.id_daerah_patroli.nama_daops

				// Format patrol date to DD-MM-YYYY
				const tempDate = Moment(patroli.tanggal_patroli)
				data2.patrolDate = tempDate.format('DD-MM-YYYY')

				if (patroli.my_daops) {
					if (patroli.kategori_patroli === 'Terpadu')
						patroliTerpadu.push(data2)
					else if (patroli.kategori_patroli === 'Mandiri')
						patroliMandiri.push(data2)
					else if (patroli.kategori_patroli === 'Rutin')
						patroliRutin.push(data2)
				}
			})
		})
		console.log(patroliTerpadu)
		return {
			patroliSpots,
			counter,
			patroliTerpadu,
			patroliMandiri,
			patroliRutin
		}
	} catch (error) {
		console.log(patroliTerpadu)
		return {
			patroliSpots,
			counter,
			patroliTerpadu,
			patroliMandiri,
			patroliRutin
		}
	}
}
