import styles from '@asset/jss/nextjs-material-kit/pages/penugasan/penugasan.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import GridItem from '@component/Grid/GridItem'
import { SuratTugasData } from '@interface'
import { Button, CircularProgress, Paper, Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
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

type AlertElemenPropType = {
	text: string[]
}

const AlertElement = (props: AlertElemenPropType) => {
	return (
		<>
			{props.text.map((str, index) => (
				<p key={index}>{str}</p>
			))}
		</>
	)
}

function PenugasanPage() {
	const classes = useStyles()
	const router = useRouter()
	const { isAuthenticated, user } = useAuth()
	const [penugasan, setPenugasan] = useState<SuratTugasData[]>([])
	const [showAlert, setShowAlert] = useState(false)
	const [show, setShow] = useState(false)
	const [showCheck, setShowCheck] = useState(false)
	const [alertSuccess, setAlertSuccess] = useState(true)
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

				<Grid container justify="center">
					<GridItem sm={6} xs={10}>
						{showCheck ? (
							<Alert
								severity={alertSuccess ? 'success' : 'error'}
								style={{ margin: '0 0 40px 0' }}
								variant="filled"
								onClose={() => {
									setShowCheck(false)
								}}
								hidden={true}
							>
								{alertMessage}
							</Alert>
						) : null}
					</GridItem>
				</Grid>

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
							header: { actions: 'Aksi' },
							body: {
								editRow: {
									deleteText:
										'Apakah Anda yakin ingin menghapus laporan tersebut?'
								}
							},
							pagination: {
								labelRowsSelect: 'Baris',
								labelDisplayedRows: '{from}-{to} dari {count}'
							},
							toolbar: {
								searchPlaceholder: 'Pencarian'
							}
						}}
						editable={{
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
											setAlertSuccess(true)
											setAlertMessage(
												'Hapus data penugasan berhasil'
											)
											setShowCheck(true)
											resolve()
										} else {
											setAlertType('error')
											setAlertSuccess(false)
											setAlertMessage(
												result.message as string
											)
											setShowCheck(true)
											resolve()
										}
									})
								})
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PenugasanPage)
