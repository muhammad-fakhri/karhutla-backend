import styles from '@asset/jss/nextjs-material-kit/pages/wilayah-kerja.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import NavBtnGroup from '@component/NavBtnGroup'
import useAuth, { ProtectRoute } from '@context/auth'
import { DaopsData } from '@interface'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import {
	addDaops,
	deleteDaops,
	getAllBalai,
	getAllDaops,
	updateDaops
} from '@service'
import classNames from 'classnames'
import MaterialTable, { Column } from 'material-table'
import { useEffect, useState } from 'react'

type RegionType = {
	[name: string]: string
}

const generateBalaiLookup = async () => {
	const data: RegionType = {}
	const wilayah = await getAllBalai()
	wilayah.forEach((item) => {
		data[item.id] = item.name
	})
	return data
}

// TODO: Show organization at daops useraccess

function DaopsPage() {
	const { isAuthenticated } = useAuth()
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	const [show, setShow] = useState(false)
	const [column, setColumn] = useState<Column<DaopsData>[]>([])
	const [loading, setLoading] = useState(true)
	const [values, setValues] = useState<{
		daops: DaopsData[]
		alertMessage: string
		successAlert: boolean
	}>({
		daops: [],
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
		const setLookup = async () => {
			const balaiLookup = await generateBalaiLookup()
			const column = [
				{ title: 'Daerah Operasi', field: 'name' },
				{ title: 'Kodefikasi', field: 'code' },
				{
					title: 'Balai',
					field: 'balaiId',
					lookup: balaiLookup
				}
			]
			setColumn(column)
		}
		if (isAuthenticated) setLookup()
	}, [isAuthenticated])
	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllDaops()
			setValues({ ...values, daops: data })
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
				<h2>Data Daerah Operasi</h2>
				{show ? (
					<Alert
						severity={values.successAlert ? 'success' : 'error'}
						onClose={closeAlert}
						className={classes.alert}
					>
						{values.alertMessage}
					</Alert>
				) : null}
				<NavBtnGroup page="daops" />
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
						data={values.daops}
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
									addDaops(newData).then(async (result) => {
										if (result.success) {
											const data = await getAllDaops()
											setValues({
												...values,
												daops: data,
												alertMessage:
													'Tambah Daerah Operasi Berhasil',
												successAlert: true
											})
											resolve()
										} else {
											setValues({
												...values,
												alertMessage: `Tambah Daerah Operasi Gagal, ${result.message}`,
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
										updateDaops(newData, oldData).then(
											(result) => {
												if (result.success) {
													const dataUpdate = [
														...values.daops
													]
													const oldRowData: any = oldData
													const index =
														oldRowData.tableData.id
													dataUpdate[index] = newData
													setValues({
														daops: [...dataUpdate],
														alertMessage:
															'Update Daerah Operasi Berhasil',
														successAlert: true
													})
													resolve()
												} else {
													setValues({
														...values,
														alertMessage: `Update Daerah Operasi Gagal, ${result.message}`,
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
									deleteDaops(oldData).then((result) => {
										if (result.success) {
											const dataDelete = [...values.daops]
											const oldRowData: any = oldData
											const index =
												oldRowData.tableData.id
											dataDelete.splice(index, 1)
											setValues({
												...values,
												daops: [...dataDelete],
												alertMessage:
													'Hapus Daerah Operasi Berhasil',
												successAlert: true
											})
										} else {
											setValues({
												...values,
												alertMessage: `Hapus Daerah Operasi Gagal, ${result.message}`,
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

export default ProtectRoute(DaopsPage, false, true)
