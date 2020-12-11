import { makeStyles } from '@material-ui/core/styles'
import {
	Paper,
	Grid,
	Box,
	AppBar,
	Tabs,
	Tab,
	CircularProgress
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { Alert } from '@material-ui/lab'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'
import SiteLayout from '../../components/Layout/SiteLayout'
import Loader from '../../components/Loader/Loader'
import styles from '../../assets/jss/nextjs-material-kit/pages/hak-akses.page.style'
import UserService from '../../services/user.service'
import DaopsService from '../../services/daops.service'
import BalaiService from '../../services/balai.service'
import useAuth, { ProtectRoute } from '../../context/auth'

const useStyles = makeStyles(styles)

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`
	}
}

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
}

const generateRolesLookup = async () => {
	const daopsRoles = {}
	const balaiRoles = {}
	const patroliNonLoginRoles = {}
	const nonPatrolRoles = await UserService.getNonPatroliRoles()
	const patrolRoles = await UserService.getPatroliNonLoginRoles()
	nonPatrolRoles.forEach((role) => {
		if (role.id === 8 || role.id === 9) {
			daopsRoles[role.id] = role.name
		} else if (role.id < 8) {
			balaiRoles[role.id] = role.name
		}
	})
	patrolRoles.forEach((role) => {
		patroliNonLoginRoles[role.id] = role.name
	})
	return { daopsRoles, balaiRoles, patroliNonLoginRoles }
}
const generateDaopsLookup = async () => {
	const data = {}
	const daops = await DaopsService.getAllDaops()
	daops.forEach((item) => {
		data[item.code] = item.name
	})
	return data
}
const generateBalaiLookup = async () => {
	const data = {}
	const daops = await BalaiService.getAllBalai()
	daops.forEach((item) => {
		data[item.code] = item.name
	})
	data.KLHK = 'KLHK'
	return data
}

function HakAksesPage() {
	const { isAuthenticated, user } = useAuth()
	const router = useRouter()
	const classes = useStyles()

	const [manggalaState, setManggalaState] = React.useState([])
	const [daopsState, setDaopsState] = React.useState()
	const [balaiState, setBalaiState] = React.useState()
	const [patroliNonLogin, setPatroliNonLogin] = React.useState()
	const [manggalaColumn, setManggalaColumn] = React.useState()
	const [daopsColumn, setDaopsColumn] = React.useState()
	const [balaiColumn, setBalaiColumn] = React.useState()
	const [patroliNonLoginColumn, setPatroliNonLoginColumn] = React.useState()
	const [value, setValue] = React.useState(0)
	const [show, setShow] = React.useState(false)
	const [loading, setLoading] = React.useState(true)
	const [values, setValues] = React.useState({
		alertMessage: '',
		successAlert: true
	})

	React.useEffect(() => {
		const fetchData = async () => {
			const roles = await generateRolesLookup()
			const daopsLookup = await generateDaopsLookup()
			const balaiLookup = await generateBalaiLookup()
			const manggalaColumn = [
				{ title: 'Nama', field: 'name', editable: 'never' },
				{
					title: 'No Registrasi/NIP',
					field: 'registrationNumber',
					editable: 'never'
				},
				{ title: 'Email', field: 'email', editable: 'never' },
				{ title: 'Organisasi', field: 'organization' }
			]
			const daopsColumn = [
				{ title: 'Nama', field: 'name', editable: 'never' },
				{ title: 'No Registrasi/NIP', field: 'nip', editable: 'never' },
				{ title: 'Email', field: 'email', editable: 'never' },
				{
					title: 'Organisasi',
					field: 'organization',
					lookup: daopsLookup
				},
				{ title: 'Hak Akses', field: 'role', lookup: roles.daopsRoles }
			]
			const balaiColumn = [
				{ title: 'Nama', field: 'name', editable: 'never' },
				{ title: 'No Registrasi/NIP', field: 'nip', editable: 'never' },
				{ title: 'Email', field: 'email', editable: 'never' },
				{
					title: 'Balai/Organisasi',
					field: 'organization',
					lookup: balaiLookup
				},
				{ title: 'Hak Akses', field: 'role', lookup: roles.balaiRoles }
			]
			const patroliNonLoginColumn = [
				{ title: 'Nama', field: 'name' },
				{
					title: 'Hak Akses',
					field: 'role',
					lookup: roles.patroliNonLoginRoles
				}
			]
			setManggalaColumn(manggalaColumn)
			setDaopsColumn(daopsColumn)
			setBalaiColumn(balaiColumn)
			setPatroliNonLoginColumn(patroliNonLoginColumn)

			const dataNonPatroli = await UserService.getNonPatroliUsers()
			const dataPatroliNonLogin = await UserService.getPatroliNonLoginUsers()
			setManggalaState([])
			setDaopsState(dataNonPatroli.daopsUsers)
			setBalaiState(dataNonPatroli.balaiUsers)
			setPatroliNonLogin(dataPatroliNonLogin)

			setLoading(false)
		}
		if (isAuthenticated) fetchData()
	}, [isAuthenticated])

	React.useEffect(() => {
		if (user) {
			if (user.roleLevel > 1) {
				alert(
					'Hak akses anda tidak mencukupi untuk mengakses halaman ini'
				)
				router.back()
			}
		}
	}, [user])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const closeAlert = () => setShow(false)
	const showAlert = (isSuccess, message) => {
		setValues({
			...values,
			alertMessage: message,
			successAlert: !!isSuccess
		})
		setShow(true)
		setTimeout(() => {
			setShow(false)
		}, 3000)
	}

	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout headerColor="info">
			<Grid container justify="center" className={classes.gridContainer}>
				<Grid item xs={10} align="center" className={classes.title}>
					<h2>Manajemen Hak Akses</h2>
				</Grid>
				<Grid item xs={10}>
					{show ? (
						<Alert
							severity={values.successAlert ? 'success' : 'error'}
							onClose={closeAlert}
							style={{ marginTop: '16px' }}
						>
							{values.alertMessage}
						</Alert>
					) : null}
				</Grid>

				<Grid item xs={10} align="center" className={classes.gridItem}>
					{loading ? (
						<CircularProgress />
					) : (
						<>
							<AppBar position="static" color="default">
								<Tabs
									value={value}
									onChange={handleChange}
									indicatorColor="primary"
									textColor="primary"
									centered
									aria-label="full width tabs example"
								>
									<Tab
										label="Personil Manggala Agni"
										wrapped
										{...a11yProps(0)}
									/>
									<Tab label="Daops" {...a11yProps(1)} />
									<Tab
										label="Balai/Pusat"
										{...a11yProps(2)}
									/>
									<Tab
										label="Patroli Non Login"
										{...a11yProps(3)}
									/>
								</Tabs>
							</AppBar>
							<TabPanel value={value} index={0}>
								<MaterialTable
									title="Personil Manggala Agni"
									columns={manggalaColumn}
									data={manggalaState}
									components={{
										Container: (props) => (
											<Paper {...props} elevation={0} />
										)
									}}
									options={{
										search: true,
										actionsColumnIndex: -1
									}}
								/>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<MaterialTable
									title="Hak Akses Daops"
									columns={daopsColumn}
									data={daopsState}
									components={{
										Container: (props) => (
											<Paper {...props} elevation={0} />
										)
									}}
									options={{
										search: true,
										actionsColumnIndex: -1
									}}
									localization={{
										body: {
											editRow: {
												deleteText:
													'Yakin hapus data ini ?'
											}
										},
										header: { actions: 'Aksi' }
									}}
									editable={{
										onRowUpdate: (newData, oldData) =>
											new Promise((resolve, reject) => {
												if (user.roleLevel > 1) {
													alert(
														'Hak akses anda tidak mencukupi untuk melakukan operasi ini'
													)
													resolve()
												} else {
													UserService.updateNonPatroliUser(
														newData
													).then((result) => {
														if (result.success) {
															if (oldData) {
																setDaopsState(
																	(
																		prevState
																	) => {
																		const data = [
																			...prevState
																		]
																		data[
																			data.indexOf(
																				oldData
																			)
																		] = newData
																		return data
																	}
																)
															}
															showAlert(
																true,
																'Update hak akses daops berhasil'
															)
															resolve()
														} else {
															showAlert(
																false,
																result
																	.message[0]
															)
															reject()
														}
													})
												}
											}),
										onRowDelete: (oldData) =>
											new Promise((resolve, reject) => {
												if (user.roleLevel > 1) {
													alert(
														'Hak akses anda tidak mencukupi untuk melakukan operasi ini'
													)
													resolve()
												} else {
													UserService.deleteNonPatroliUser(
														oldData
													).then((result) => {
														if (result.success) {
															const dataDelete = [
																...daopsState
															]
															const index =
																oldData
																	.tableData
																	.id
															dataDelete.splice(
																index,
																1
															)
															setDaopsState(
																dataDelete
															)
															showAlert(
																true,
																'Hapus hak akses daops berhasil'
															)
															resolve()
														} else {
															showAlert(
																false,
																result
																	.message[0]
															)
															reject()
														}
													})
												}
											})
									}}
								/>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<MaterialTable
									title="Hak Akses Balai/Pusat"
									columns={balaiColumn}
									data={balaiState}
									components={{
										Container: (props) => (
											<Paper {...props} elevation={0} />
										)
									}}
									options={{
										search: true,
										actionsColumnIndex: -1
									}}
									localization={{
										body: {
											editRow: {
												deleteText:
													'Yakin hapus data ini ?'
											}
										},
										header: { actions: 'Aksi' }
									}}
									editable={{
										onRowUpdate: (newData, oldData) =>
											new Promise((resolve, reject) => {
												if (user.roleLevel > 1) {
													alert(
														'Hak akses anda tidak mencukupi untuk melakukan operasi ini'
													)
													resolve()
												} else {
													UserService.updateNonPatroliUser(
														newData
													).then((result) => {
														if (result.success) {
															if (oldData) {
																setBalaiState(
																	(
																		prevState
																	) => {
																		const data = [
																			...prevState
																		]
																		data[
																			data.indexOf(
																				oldData
																			)
																		] = newData
																		return data
																	}
																)
															}
															showAlert(
																true,
																'Update hak akses balai/pusat berhasil'
															)
															resolve()
														} else {
															showAlert(
																false,
																result
																	.message[0]
															)
															reject()
														}
													})
												}
											}),
										onRowDelete: (oldData) =>
											new Promise((resolve, reject) => {
												if (user.roleLevel > 1) {
													alert(
														'Hak akses anda tidak mencukupi untuk melakukan operasi ini'
													)
													resolve()
												} else {
													UserService.deleteNonPatroliUser(
														oldData
													).then((result) => {
														if (result.success) {
															const dataDelete = [
																...balaiState
															]
															const index =
																oldData
																	.tableData
																	.id
															dataDelete.splice(
																index,
																1
															)
															setBalaiState(
																dataDelete
															)
															showAlert(
																true,
																'Hapus hak akses balai/pusat berhasil'
															)
															resolve()
														} else {
															showAlert(
																false,
																result
																	.message[0]
															)
															reject()
														}
													})
												}
											})
									}}
								/>
							</TabPanel>
							<TabPanel value={value} index={3}>
								<MaterialTable
									title="Personil Patroli (Non Login)"
									columns={patroliNonLoginColumn}
									data={patroliNonLogin}
									components={{
										Container: (props) => (
											<Paper {...props} elevation={0} />
										)
									}}
									options={{
										search: true,
										actionsColumnIndex: -1,
										addRowPosition: 'first'
									}}
									localization={{
										body: {
											editRow: {
												deleteText:
													'Yakin hapus data ini ?'
											}
										},
										header: { actions: 'Aksi' }
									}}
									editable={{
										onRowAdd: (newData) =>
											new Promise((resolve, reject) => {
												if (user.roleLevel > 1) {
													alert(
														'Hak akses anda tidak mencukupi untuk melakukan operasi ini'
													)
													resolve()
												} else {
													UserService.addPatroliNonLoginUser(
														newData
													).then((result) => {
														if (result.success) {
															setPatroliNonLogin([
																...patroliNonLogin,
																newData
															])
															showAlert(
																true,
																'Tambah hak akses patroli (non login) Berhasil'
															)
															resolve()
														} else {
															showAlert(
																false,
																result
																	.message[0]
															)
															reject()
														}
													})
												}
											}),
										onRowUpdate: (newData, oldData) =>
											new Promise((resolve, reject) => {
												if (user.roleLevel > 1) {
													alert(
														'Hak akses anda tidak mencukupi untuk melakukan operasi ini'
													)
													resolve()
												} else {
													UserService.updatePatroliNonLoginUser(
														newData
													).then((result) => {
														if (result.success) {
															if (oldData) {
																setPatroliNonLogin(
																	(
																		prevState
																	) => {
																		const data = [
																			...prevState
																		]
																		data[
																			data.indexOf(
																				oldData
																			)
																		] = newData
																		return data
																	}
																)
															}
															showAlert(
																true,
																'Update hak akses patroli (non login) berhasil'
															)
															resolve()
														} else {
															showAlert(
																false,
																result
																	.message[0]
															)
															reject()
														}
													})
												}
											}),
										onRowDelete: (oldData) =>
											new Promise((resolve, reject) => {
												if (user.roleLevel > 1) {
													alert(
														'Hak akses anda tidak mencukupi untuk melakukan operasi ini'
													)
													resolve()
												} else {
													UserService.deletePatroliNonLoginUser(
														oldData
													).then((result) => {
														if (result.success) {
															const dataDelete = [
																...patroliNonLogin
															]
															const index =
																oldData
																	.tableData
																	.id
															dataDelete.splice(
																index,
																1
															)
															setPatroliNonLogin(
																dataDelete
															)
															showAlert(
																true,
																'Hapus hak akses patroli (non login) berhasil'
															)
															resolve()
														} else {
															showAlert(
																false,
																result
																	.message[0]
															)
															reject()
														}
													})
												}
											})
									}}
								/>
							</TabPanel>
						</>
					)}
				</Grid>
			</Grid>
		</SiteLayout>
	)
}

export default ProtectRoute(HakAksesPage)
