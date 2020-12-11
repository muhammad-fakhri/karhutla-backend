import { Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import useSWR from 'swr'
import { Alert } from '@material-ui/lab'
import styles from '../../assets/jss/nextjs-material-kit/pages/wilayah-kerja.page.style'
import SiteLayout from '../../components/Layout/SiteLayout'
import NavBtnGroup from '../../components/NavBtnGroup'
import DaopsService from '../../services/daops.service'
import BalaiService from '../../services/balai.service'
import useAuth, { ProtectRoute } from '../../context/auth'
import Loader from '../../components/Loader/Loader'

const generateBalaiLookup = async () => {
	const data = {}
	const wilayah = await BalaiService.getAllBalai()
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
	const [show, setShow] = React.useState(false)
	const [column, setColumn] = React.useState([])
	const [values, setValues] = React.useState({
		daops: [],
		alertMessage: '',
		successAlert: true
	})
	const { data, isValidating } = useSWR(
		isAuthenticated ? '/daops/list' : null,
		DaopsService.getAllDaops
	)
	const closeAlert = () => setShow(false)
	const showAlert = () => {
		setShow(true)
		setTimeout(() => {
			setShow(false)
		}, 3000)
	}
	React.useEffect(() => {
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
	React.useEffect(() => {
		setValues({ ...values, daops: data })
	}, [data])

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
					>
						{values.alertMessage}
					</Alert>
				) : null}
				<NavBtnGroup />
				{isValidating ? (
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
							header: { actions: 'Aksi' }
						}}
						editable={{
							onRowAdd: (newData) =>
								new Promise((resolve, reject) => {
									DaopsService.addDaops(newData).then(
										async (result) => {
											if (result.success) {
												const data = await DaopsService.getAllDaops()
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
													alertMessage: `Tambah Daerah Operasi Gagal, ${result.message[0]}`,
													successAlert: false
												})
												reject()
											}
											showAlert()
										}
									)
								}),
							onRowUpdate: (newData, oldData) =>
								new Promise((resolve, reject) => {
									DaopsService.updateDaops(
										newData,
										oldData
									).then((result) => {
										if (result.success) {
											const dataUpdate = [...values.daops]
											const index = oldData.tableData.id
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
												alertMessage: `Update Daerah Operasi Gagal, ${result.message[0]}`,
												successAlert: false
											})
											reject()
										}
										showAlert()
									})
								}),
							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									DaopsService.deleteDaops(oldData).then(
										(result) => {
											if (result.success) {
												const dataDelete = [
													...values.daops
												]
												const index =
													oldData.tableData.id
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
													alertMessage: `Hapus Daerah Operasi Gagal, ${result.message[0]}`,
													successAlert: false
												})
											}
											showAlert()
											resolve()
										}
									)
								})
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(DaopsPage)
