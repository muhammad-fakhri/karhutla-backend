import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import LaunchIcon from '@material-ui/icons/Launch'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../assets/jss/nextjs-material-kit/pages/penugasan/penugasan.page.style'
import Button from '../../components/CustomButtons/Button'
import SiteLayout from '../../components/Layout/SiteLayout'
import Loader from '../../components/Loader/Loader'
import useAuth, { ProtectRoute } from '../../context/auth'
import PenugasanService from '../../services/penugasan.service'
import { useEffect, useState } from 'react'

const useStyles = makeStyles(styles)

const columns = [
	{ title: 'Jenis Patroli', field: 'type' },
	{ title: 'Nomor Surat Tugas', field: 'number' },
	{ title: 'Tanggal Mulai', field: 'startDate' },
	{ title: 'Tanggal Selesai', field: 'finishDate' }
]

function PenugasanPage() {
	const classes = useStyles()
	const { isAuthenticated, user } = useAuth()
	const router = useRouter()
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
				<h2>Daftar Penugasan</h2>
				{user.roleLevel === 4 ? (
					<>
						<Link href="penugasan/berkas">
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								startIcon={<AddBoxIcon />}
							>
								Tambah Penugasan
							</Button>
						</Link>
						<br />
					</>
				) : null}
				{loading ? (
					<CircularProgress />
				) : (
					<MaterialTable
						title=""
						columns={columns}
						data={penugasan}
						options={{
							search: true,
							actionsColumnIndex: -1
						}}
						components={{
							Container: (props) => (
								<Paper {...props} elevation={0} />
							)
						}}
						actions={[
							{
								icon: LaunchIcon,
								tooltip: 'Buka Detail Surat Tugas',
								onClick: (event, rowData) => {
									event.preventDefault()
									router.push(
										`/penugasan/detail?noSK=${rowData.number}`
									)
								}
							}
						]}
						localization={{
							header: { actions: 'Aksi' }
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PenugasanPage)
