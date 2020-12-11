import { makeStyles } from '@material-ui/core/styles'
import { Grid, CircularProgress } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import MaterialTable from 'material-table'
import SiteLayout from '../components/Layout/SiteLayout'
import Loader from '../components/Loader/Loader'
import styles from '../assets/jss/nextjs-material-kit/pages/penugasan/penugasan.page.style'
import useAuth, { ProtectRoute } from '../context/auth'
import PenugasanService from '../services/penugasan.service'

const useStyles = makeStyles(styles)

const columns = [
	{ title: 'Jenis Patroli', field: 'type' },
	{ title: 'Nomor Surat Tugas', field: 'number' },
	{ title: 'Tanggal Mulai', field: 'startDate' },
	{ title: 'Tanggal Selesai', field: 'finishDate' }
]

function PelaporanPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [penugasan, setPenugasan] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	React.useEffect(() => {
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
			<Grid container justify="center" className={classes.gridContainer}>
				<Grid item xs={10} align="center" className={classes.title}>
					<h2>Rekapitulasi Laporan Per SK</h2>
				</Grid>
				<Grid item xs={10} align="center" className={classes.gridItem}>
					{loading ? (
						<CircularProgress />
					) : (
						<MaterialTable
							title=""
							columns={columns}
							data={penugasan}
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
								body: {
									editRow: {
										deleteText: 'Yakin hapus data ini ?'
									}
								},
								header: { actions: 'Aksi' }
							}}
						/>
					)}
				</Grid>
			</Grid>
		</SiteLayout>
	)
}

export default ProtectRoute(PelaporanPage)
