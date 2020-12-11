import { Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import useSWR from 'swr'
import { Alert } from '@material-ui/lab'
import styles from '../../assets/jss/nextjs-material-kit/pages/wilayah-kerja.page.style'
import SiteLayout from '../../components/Layout/SiteLayout'
import NavBtnGroup from '../../components/NavBtnGroup'
import Loader from '../../components/Loader/Loader'
import BalaiService from '../../services/balai.service'
import WilayahService from '../../services/wilayah.service'
import useAuth, { ProtectRoute } from '../../context/auth'

const generateWilayahLookup = async () => {
	const data = {}
	const wilayah = await WilayahService.getAllPulau()
	wilayah.forEach((item) => {
		data[item.id] = `${item.type} ${item.name}`
	})
	return data
}

// TODO: Show organization at balai/pusat useraccess

function BalaiPage() {
	const { isAuthenticated } = useAuth()
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	const [show, setShow] = React.useState(false)
	const [column, setColumn] = React.useState([])
	const [values, setValues] = React.useState({
		balai: [],
		alertMessage: '',
		successAlert: true
	})
	const { data: dataBalai, isValidating } = useSWR(
		isAuthenticated ? '/balai/list' : null,
		BalaiService.getAllBalai
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
			const wilayahLookup = await generateWilayahLookup()
			const column = [
				{ title: 'Nama Balai', field: 'name' },
				{ title: 'Kode Balai', field: 'code' },
				{
					title: 'Wilayah',
					field: 'region',
					lookup: wilayahLookup
				}
			]
			setColumn(column)
		}
		if (isAuthenticated) setLookup()
	}, [isAuthenticated])
	React.useEffect(() => {
		setValues({ ...values, balai: dataBalai })
	}, [dataBalai])

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
				<h2>Data Balai</h2>
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
						data={values.balai}
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
									BalaiService.addBalai(newData).then(
										async (result) => {
											if (result.success) {
												const data = await BalaiService.getAllBalai()
												setValues({
													...values,
													balai: data,
													alertMessage:
														'Tambah Balai Berhasil',
													successAlert: true
												})
												resolve()
											} else {
												setValues({
													...values,
													alertMessage: `Tambah Balai Gagal, ${result.message[0]}`,
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
									BalaiService.updateBalai(
										newData,
										oldData
									).then((result) => {
										if (result.success) {
											const dataUpdate = [...values.balai]
											const index = oldData.tableData.id
											dataUpdate[index] = newData
											setValues({
												balai: [...dataUpdate],
												alertMessage:
													'Update Balai Berhasil',
												successAlert: true
											})
											resolve()
										} else {
											setValues({
												...values,
												alertMessage: `Update Balai Gagal, ${result.message[0]}`,
												successAlert: false
											})
											reject()
										}
										showAlert()
									})
								}),
							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									BalaiService.deleteBalai(oldData).then(
										(result) => {
											if (result.success) {
												const dataDelete = [
													...values.balai
												]
												const index =
													oldData.tableData.id
												dataDelete.splice(index, 1)
												setValues({
													...values,
													balai: [...dataDelete],
													alertMessage:
														'Hapus Balai Berhasil',
													successAlert: true
												})
											} else {
												setValues({
													...values,
													alertMessage: `Hapus Balai Gagal, ${result.message[0]}`,
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

export default ProtectRoute(BalaiPage)
