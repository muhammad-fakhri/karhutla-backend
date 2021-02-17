import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'
import styles from '../../assets/jss/nextjs-material-kit/pages/pelaporan/surat-tugas.page.style'
import SiteLayout from '../../components/Layout/SiteLayout'
import Loader from '../../components/Loader/Loader'
import useAuth, { ProtectRoute } from '../../context/auth'
import PenugasanService from '../../services/penugasan.service'

const useStyles = makeStyles(styles)

const columns = [
	{ title: 'Jenis Patroli', field: 'type' },
	{ title: 'Nomor Surat Tugas', field: 'number' },
	{ title: 'Tanggal Mulai', field: 'startDate' },
	{ title: 'Tanggal Selesai', field: 'finishDate' }
]

function PelaporanSuratTugasPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [penugasan, setPenugasan] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchData = async () => {
			const data = await PenugasanService.getAllPenugasan()
			setPenugasan(data)
			setLoading(false)
		}
		if (isAuthenticated) fetchData()
	}, [isAuthenticated])

	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout headerColor="info">
			<div
				className={classNames(
					classes.main,
					classes.mainRaised,
					classes.textCenter
				)}
			>
				<h2>Rekapitulasi Laporan Per Surat Tugas</h2>
				{loading ? (
					<CircularProgress />
				) : (
					<MaterialTable
						title=""
						columns={columns}
						data={penugasan}
						components={{
							Container: (props) => (
								<Paper {...props} elevation={0} />
							)
						}}
						actions={[
							{
								icon: CloudDownloadIcon,
								tooltip: 'Download Laporan',
								onClick: (event, rowData) => {
									window.open(rowData.reportLink)
								}
							}
						]}
						options={{
							search: true,
							actionsColumnIndex: -1
						}}
						localization={{
							header: { actions: 'Aksi' }
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PelaporanSuratTugasPage)
