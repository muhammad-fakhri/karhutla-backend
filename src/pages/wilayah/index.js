import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useRouter } from 'next/router'
import styles from '../../assets/jss/nextjs-material-kit/pages/wilayah-kerja.page.style'
import SiteLayout from '../../components/Layout/SiteLayout'
import Loader from '../../components/Loader/Loader'
import NavBtnGroup from '../../components/NavBtnGroup'
import useAuth, { ProtectRoute } from '../../context/auth'
import WilayahService from '../../services/wilayah.service'

const column = [
	{ title: 'Wilayah', field: 'name' },
	{ title: 'Kode Wilayah', field: 'code' },
	{
		title: 'Unit Wilayah',
		field: 'type',
		lookup: {
			Pulau: 'Pulau',
			Provinsi: 'Provinsi',
			Kabupaten: 'Kabupaten',
			Kecamatan: 'Kecamatan',
			Kelurahan: 'Kelurahan',
			Desa: 'Desa'
		}
	}
]

function WilayahPage() {
	const { isAuthenticated, user } = useAuth()
	const router = useRouter()
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	const [loading, setLoading] = React.useState(true)
	const [values, setValues] = React.useState({
		wilayah: []
	})
	React.useEffect(() => {
		const fetchData = async () => {
			const data = await WilayahService.getAllWilayah()
			setValues({ ...values, wilayah: data })
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
				<h2>Data Wilayah</h2>
				<NavBtnGroup page="wilayah" />
				{loading ? (
					<CircularProgress />
				) : (
					<MaterialTable
						title=""
						columns={column}
						components={{
							Container: (props) => (
								<Paper {...props} elevation={0} />
							)
						}}
						data={values.wilayah}
						options={{
							search: true
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(WilayahPage, false, true)
