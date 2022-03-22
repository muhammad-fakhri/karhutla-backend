import styles from '@asset/jss/nextjs-material-kit/pages/wilayah-kerja.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import NavBtnGroup from '@component/NavBtnGroup'
import useAuth, { ProtectRoute } from '@context/auth'
import { KorwilData } from '@interface'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import {
	addKorwil,
	deleteKorwil,
	getAllKorwil,
	getAllDaops,
	updateKorwil
} from '@service'
import classNames from 'classnames'
import MaterialTable, { Column } from 'material-table'
import { useEffect, useState } from 'react'

type RegionType = {
	[name: string]: string
}

const generateDaopsLookup = async () => {
	const data: RegionType = {}
	const wilayah = await getAllDaops()
	wilayah.forEach((item) => {
		data[item.id] = `${item.name}`
	})
	return data
}

// TODO: Show organization at balai/pusat useraccess

function KOrwilPage() {
	const { isAuthenticated } = useAuth()
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	const [show, setShow] = useState(false)
	const [column, setColumn] = useState<Column<KorwilData>[]>([])
	const [loading, setLoading] = useState(true)
	const [values, setValues] = useState<{
		korwil: KorwilData[]
		alertMessage: string
		successAlert: boolean
	}>({
		korwil: [],
		alertMessage: '',
		successAlert: true
	})
	const closeAlert = () => setShow(false)
	const showAlert = () => {
		setShow(true)
		setTimeout(() => {
			setShow(false)
		}, 3000)
	}
	useEffect(() => {
		const fetchData = async () => {
			const wilayahLookup = await generateDaopsLookup()
			const column = [
				{ title: 'Nama Korwil', field: 'nama' },
				{ title: 'Kode Korwil', field: 'kode' },
				{
					title: 'Daops',
					field: 'm_daops_id',
					lookup: wilayahLookup
				}
			]
			setColumn(column)

			const data = await getAllKorwil()
			setValues({ ...values, korwil: data })
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
				<h2>Data Korwil</h2>
				{show ? (
					<Alert
						severity={values.successAlert ? 'success' : 'error'}
						onClose={closeAlert}
						className={classes.alert}
					>
						{values.alertMessage}
					</Alert>
				) : null}
				<NavBtnGroup page="korwil" />
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
						data={values.korwil}
						options={{
							search: true,
							actionsColumnIndex: -1,
							addRowPosition: 'first'
						}}
						localization={{
							body: {
								editRow: {
									deleteText: 'Yakin hapus data ini ?'
								}
							},
							header: { actions: 'Aksi' },
							pagination: {
								labelRowsSelect: 'Baris',
								labelDisplayedRows: '{from}-{to} dari {count}'
							},
							toolbar: {
								searchPlaceholder: 'Pencarian'
							}
						}}
						editable={{
							onRowAdd: (newData) =>
								new Promise<void>((resolve, reject) => {
									addKorwil(newData).then(async (result) => {
										if (result.success) {
											const data = await getAllKorwil()
											setValues({
												...values,
												korwil: data,
												alertMessage:
													'Tambah Korwil Berhasil',
												successAlert: true
											})
											resolve()
										} else {
											setValues({
												...values,
												alertMessage: `Tambah Korwil Gagal, ${result.message}`,
												successAlert: false
											})
											reject()
										}
										showAlert()
									})
								}),
							onRowUpdate: (newData, oldData) =>
								new Promise<void>((resolve, reject) => {
									if (oldData) {
										updateKorwil(newData, oldData).then(
											(result) => {
												if (result.success) {
													const dataUpdate = [
														...values.korwil
													]
													const oldRowData: any = oldData
													const index =
														oldRowData.tableData.id
													dataUpdate[index] = newData
													setValues({
														korwil: [...dataUpdate],
														alertMessage:
															'Update Korwil Berhasil',
														successAlert: true
													})
													resolve()
												} else {
													setValues({
														...values,
														alertMessage: `Update Korwil Gagal, ${result.message}`,
														successAlert: false
													})
													reject()
												}
												showAlert()
											}
										)
									}
								}),
							onRowDelete: (oldData) =>
								new Promise<void>((resolve) => {
									deleteKorwil(oldData).then((result) => {
										if (result.success) {
											const dataDelete = [
												...values.korwil
											]
											const oldRowData: any = oldData
											const index =
												oldRowData.tableData.id
											dataDelete.splice(index, 1)
											setValues({
												...values,
												korwil: [...dataDelete],
												alertMessage:
													'Hapus Balai Berhasil',
												successAlert: true
											})
										} else {
											setValues({
												...values,
												alertMessage: `Hapus Balai Gagal, ${result.message}`,
												successAlert: false
											})
										}
										showAlert()
										resolve()
									})
								})
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(KOrwilPage, false, true)
