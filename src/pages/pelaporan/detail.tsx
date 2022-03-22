import styles from '@asset/jss/nextjs-material-kit/pages/penugasan/penugasan.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { SuratTugasLaporanData } from '@interface'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getSKLaporanDetail, deleteLaporan } from '@service'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import GridItem from '@component/Grid/GridItem'
import { Alert } from '@material-ui/lab'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { apiV2URL } from '@api'

const useStyles = makeStyles(styles)

const columns = [
	{ title: 'Nama Daops', field: 'nama_daops' },
	{ title: 'Daerah Patroli', field: 'nama_daerah_patroli' },
	{ title: 'Ketua', field: 'nama_ketua' },
	{ title: 'Tanggal Patroli', field: 'tanggal_patroli' }
]

function DetailPelaporanPage() {
	const classes = useStyles()
	const { isAuthenticated, user } = useAuth()
	const router = useRouter()
	const { noSK } = router.query
	const [laporan, setLaporan] = useState<SuratTugasLaporanData[]>([])
	const [showCheck, setShowCheck] = useState(false)
	const [alertSuccess, setAlertSuccess] = useState(true)
	const [delete_condition, setdelete] = useState(false)
	console.log(noSK)

	const delete_role = [0, 6]

	const [loading, setLoading] = useState(true)
	const [alertMessage, setAlertMessage] = useState('')
	const [alertType, setAlertType] = useState<
		'success' | 'info' | 'warning' | 'error'
	>('success')
	useEffect(() => {
		const fetchData = async () => {
			if (noSK) {
				const data = await getSKLaporanDetail(noSK as string)
				console.log(data)
				setLaporan(data)
				setLoading(false)

				if (delete_role.includes(user.roleLevel)) {
					setdelete(true)
				}
			}
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
				<h2>Detail Laporan : {noSK}</h2>
				<Grid container justify="center">
					<GridItem sm={6} xs={10}>
						{showCheck ? (
							<Alert
								severity={alertSuccess ? 'success' : 'error'}
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
				{loading ? (
					<CircularProgress />
				) : (
					<MaterialTable
						title=""
						columns={columns}
						data={laporan}
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
								icon: 'edit',
								tooltip: 'Ubah Data Laporan',
								onClick: (event, rowData) => {
									{
										const laporanData = rowData as SuratTugasLaporanData
										router.push(
											`/pelaporan/ubah/${laporanData.id_laporan_header}`
										)
									}
								}
							},
							{
								icon: CloudDownloadIcon,
								tooltip: 'Download Laporan',
								onClick: (event, rowData) => {
									const laporanData = rowData as SuratTugasLaporanData
									window.open(
										apiV2URL +
											`/karhutla/download/${laporanData.id_laporan_header}`
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
							isDeletable: (rowData) => delete_condition,
							onRowDelete: (oldData) =>
								new Promise<void>((resolve, reject) => {
									deleteLaporan(oldData).then((result) => {
										if (result.success) {
											const dataDelete = [...laporan]
											const userRowData: any = oldData
											const index =
												userRowData.tableData
													.id_laporan_header
											dataDelete.splice(index, 1)
											setLaporan(dataDelete)
											setAlertSuccess(true)
											setAlertMessage(
												'Hapus data Laporan berhasil'
											)
											setShowCheck(true)
											resolve()
										} else {
											console.log(result)
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

export default ProtectRoute(DetailPelaporanPage)
