import styles from '@asset/jss/nextjs-material-kit/pages/penugasan/penugasan.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { SuratTugasData } from '@interface'
import { Button, CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import LaunchIcon from '@material-ui/icons/Launch'
import { deletePenugasan, getAllPenugasan } from '@service'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
	const router = useRouter()
	const { isAuthenticated, user } = useAuth()
	const [penugasan, setPenugasan] = useState<SuratTugasData[]>([])
	const [showAlert, setShowAlert] = useState(false)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllPenugasan()
			setPenugasan(data)
			setLoading(false)
		}
		if (isAuthenticated) fetchData()
	}, [isAuthenticated])

	const [alertType, setAlertType] = useState<
		'success' | 'info' | 'warning' | 'error'
	>('success')
	const [alertMessage, setAlertMessage] = useState('')
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
								size="large"
								className={classes.addButton}
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
									const suratTugasRowData = rowData as SuratTugasData
									router.push(
										`/penugasan/detail?noSK=${suratTugasRowData.number}`
									)
								}
							}
						]}
						localization={{
							header: { actions: 'Aksi' }
						}}
						editable={
							{
								onRowDelete: (oldData) =>
									new Promise<void>((resolve, reject) => {
										deletePenugasan(oldData).then((result) => {
											if (result.success) {
												const dataDelete = [...penugasan]
												const userRowData: any = oldData
												const index =
													userRowData.tableData.id
												dataDelete.splice(index, 1)
												setPenugasan(dataDelete)
												setAlertType('success')
												setAlertMessage(
													'Hapus data penugasan berhasil'
												)
												setShowAlert(true)
												resolve()
											} else {
												setAlertType('error')
												setAlertMessage(
													result.message as string
												)
												setShowAlert(true)
												reject()
											}
										})
									})
							}
						}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PenugasanPage)
