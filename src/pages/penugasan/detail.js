import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useRouter } from 'next/router'
import styles from '../../assets/jss/nextjs-material-kit/pages/penugasan/penugasan.page.style'
import SiteLayout from '../../components/Layout/SiteLayout'
import Loader from '../../components/Loader/Loader'
import useAuth, { ProtectRoute } from '../../context/auth'
import PenugasanService from '../../services/penugasan.service'

const useStyles = makeStyles(styles)

const columns = [
	{ title: 'Tanggal Awal', field: 'startDate' },
	{ title: 'Tanggal Akhir', field: 'endDate' },
	{ title: 'Nama', field: 'name' },
	{ title: 'Nomor Registrasi', field: 'registrationNumber' },
	{ title: 'Instansi', field: 'organization' },
	{ title: 'Posko', field: 'posko' },
	{ title: 'Daops', field: 'daops' }
]

function DetailPenugasanPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { noSK } = router.query
	const [teamMembers, setTeamMembers] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	React.useEffect(() => {
		const fetchData = async () => {
			const data = await PenugasanService.getPenugasanDetail(noSK)
			setTeamMembers(data)
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
				<h2>Detail Surat Tugas : {noSK}</h2>
				{loading ? (
					<CircularProgress />
				) : (
					<MaterialTable
						title=""
						columns={columns}
						data={teamMembers}
						options={{
							search: true,
							actionsColumnIndex: -1
						}}
						components={{
							Container: (props) => (
								<Paper {...props} elevation={0} />
							)
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(DetailPenugasanPage)
