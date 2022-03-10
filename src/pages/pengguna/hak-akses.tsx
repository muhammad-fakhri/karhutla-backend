import styles from '@asset/jss/nextjs-material-kit/pages/hak-akses.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { NonPatroliUserData, UserData } from '@interface'
import {
	AppBar,
	Box,
	CircularProgress,
	Grid,
	Paper,
	Tab,
	Tabs
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import {
	addPatroliNonLoginUser,
	deleteNonPatroliUser,
	deletePatroliNonLoginUser,
	getAllBalai,
	getAllDaops,
	getNonPatroliRoles,
	getNonPatroliUsers,
	getPatroliNonLoginRoles,
	getPatroliNonLoginUsers,
	updateNonPatroliUser,
	updatePatroliNonLoginUser
} from '@service'
import classNames from 'classnames'
import MaterialTable, { Column } from 'material-table'
import PropTypes from 'prop-types'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

const useStyles = makeStyles(styles)

function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`
	}
}

type TabPanelPropType = {
	children: ReactNode
	index: number
	value: number
}

function TabPanel(props: TabPanelPropType) {
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

type RolesType = {
	[name: number]: string
}

type LookupItemType = {
	[name: string]: string
}

const generateRolesLookup = async () => {
	const daopsRoles: RolesType = {}
	const balaiRoles: RolesType = {}
	const patroliNonLoginRoles: RolesType = {}
	const nonPatrolRoles = await getNonPatroliRoles()
	const patrolRoles = await getPatroliNonLoginRoles()
	nonPatrolRoles.forEach((role) => {
		if (role.level <= 3) {
			balaiRoles[role.id] = role.name
		} else if (role.level <= 5) {
			daopsRoles[role.id] = role.name
		}
	})
	patrolRoles.forEach((role) => {
		patroliNonLoginRoles[role.id] = role.name
	})
	return { daopsRoles, balaiRoles, patroliNonLoginRoles }
}
const generateDaopsLookup = async () => {
	const daops = await getAllDaops()
	const data: LookupItemType = {}
	daops.forEach((item) => {
		data[item.code] = item.name
	})
	return data
}
const generateBalaiLookup = async () => {
	const balai = await getAllBalai()
	const data: LookupItemType = {}
	balai.forEach((item) => {
		data[item.code] = item.name
	})
	data.KLHK = 'KLHK'
	return data
}

function HakAksesPage() {
	const { isAuthenticated } = useAuth()
	const classes = useStyles()

	const [manggalaState, setManggalaState] = useState<NonPatroliUserData[]>([])
	const [daopsState, setDaopsState] = useState<NonPatroliUserData[]>([])
	const [balaiState, setBalaiState] = useState<NonPatroliUserData[]>([])
	const [patroliNonLogin, setPatroliNonLogin] = useState<UserData[]>([])
	const [manggalaColumn, setManggalaColumn] = useState<
		Column<NonPatroliUserData>[]
	>([])
	const [daopsColumn, setDaopsColumn] = useState<
		Column<NonPatroliUserData>[]
	>([])
	const [balaiColumn, setBalaiColumn] = useState<
		Column<NonPatroliUserData>[]
	>([])
	const [patroliNonLoginColumn, setPatroliNonLoginColumn] = useState<
		Column<UserData>[]
	>([])
	const [value, setValue] = useState(0)
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(true)
	const [values, setValues] = useState({
		alertMessage: '',
		successAlert: true
	})

	useEffect(() => {
		const fetchData = async () => {
			const roles = await generateRolesLookup()
			const daopsLookup = await generateDaopsLookup()
			const balaiLookup = await generateBalaiLookup()
			const manggalaColumn = [
				{ title: 'Nama', field: 'name', editable: 'never' as const },
				{
					title: 'No Registrasi/NIP',
					field: 'registrationNumber',
					editable: 'never' as const
				},
				{
					title: 'Email',
					field: 'email',
					editable: 'never' as const
				},
				{ title: 'Organisasi', field: 'organization' }
			]
			const daopsColumn = [
				{ title: 'Nama', field: 'name', editable: 'never' as const },
				{
					title: 'No Registrasi/NIP',
					field: 'registrationNumber',
					editable: 'never' as const
				},
				{
					title: 'Email',
					field: 'email',
					editable: 'never' as const
				},
				{
					title: 'Organisasi',
					field: 'organization',
					lookup: daopsLookup
				},
				{ title: 'Hak Akses', field: 'role', lookup: roles.daopsRoles }
			]
			const balaiColumn: Column<NonPatroliUserData>[] = [
				{ title: 'Nama', field: 'name', editable: 'never' as const },
				{
					title: 'No Registrasi/NIP',
					field: 'registrationNumber',
					editable: 'never' as const
				},
				{
					title: 'Email',
					field: 'email',
					editable: 'never' as const
				},
				{
					title: 'Organisasi',
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

			const dataNonPatroli = await getNonPatroliUsers()
			const dataPatroliNonLogin = await getPatroliNonLoginUsers()
			setManggalaState([])
			setDaopsState(dataNonPatroli.daopsUsers)
			setBalaiState(dataNonPatroli.balaiUsers)
			setPatroliNonLogin(dataPatroliNonLogin)

			setLoading(false)
		}
		if (isAuthenticated) fetchData()
	}, [isAuthenticated])

	const handleChange = (event: ChangeEvent<any>, newValue: number) => {
		setValue(newValue)
	}

	const closeAlert = () => setShow(false)
	const showAlert = (isSuccess: boolean, message: string) => {
		setValues({
			...values,
			alertMessage: message,
			successAlert: isSuccess
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
				<Grid
					item
					xs={10}
					className={classNames(classes.title, classes.textCenter)}
				>
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

				<Grid
					item
					xs={10}
					className={classNames(classes.gridItem, classes.textCenter)}
				>
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
									{/* <Tab
										label="Personil Manggala Agni"
										wrapped
										{...a11yProps(0)}
									/> */}
									<Tab label="Daops" {...a11yProps(0)} />
									<Tab
										label="Balai/Pusat"
										{...a11yProps(1)}
									/>
									{/* <Tab
										label="Patroli Non Login"
										{...a11yProps(3)}
									/> */}
								</Tabs>
							</AppBar>
							{/* <TabPanel value={value} index={0}>
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
							</TabPanel> */}
							<TabPanel value={value} index={0}>
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
										header: { actions: 'Aksi' },
										pagination: {
											labelRowsSelect: 'Baris',
											labelDisplayedRows:
												'{from}-{to} dari {count}'
										},
										toolbar: {
											searchPlaceholder: 'Pencarian'
										}
									}}
									editable={{
										onRowUpdate: (newData, oldData) =>
											new Promise<void>(
												(resolve, reject) => {
													updateNonPatroliUser(
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
																result.message as string
															)
															reject()
														}
													})
												}
											),
										onRowDelete: (oldData) =>
											new Promise<void>(
												(resolve, reject) => {
													deleteNonPatroliUser(
														oldData
													).then((result) => {
														if (result.success) {
															const dataDelete = [
																...daopsState
															]
															const accessRightRowData: any = oldData
															const index =
																accessRightRowData
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
																result.message as string
															)
															reject()
														}
													})
												}
											)
									}}
								/>
							</TabPanel>
							<TabPanel value={value} index={1}>
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
										header: { actions: 'Aksi' },
										pagination: {
											labelRowsSelect: 'Baris',
											labelDisplayedRows:
												'{from}-{to} dari {count}'
										},
										toolbar: {
											searchPlaceholder: 'Pencarian'
										}
									}}
									editable={{
										onRowUpdate: (newData, oldData) =>
											new Promise<void>(
												(resolve, reject) => {
													updateNonPatroliUser(
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
																result.message as string
															)
															reject()
														}
													})
												}
											),
										onRowDelete: (oldData) =>
											new Promise<void>(
												(resolve, reject) => {
													deleteNonPatroliUser(
														oldData
													).then((result) => {
														if (result.success) {
															const dataDelete = [
																...balaiState
															]
															const accessRightRowData: any = oldData
															const index =
																accessRightRowData
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
																result.message as string
															)
															reject()
														}
													})
												}
											)
									}}
								/>
							</TabPanel>
							{/* <TabPanel value={value} index={3}>
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
											new Promise<void>(
												(resolve, reject) => {
													addPatroliNonLoginUser(
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
																result.message as string
															)
															reject()
														}
													})
												}
											),
										onRowUpdate: (newData, oldData) =>
											new Promise<void>(
												(resolve, reject) => {
													updatePatroliNonLoginUser(
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
																result.message as string
															)
															reject()
														}
													})
												}
											),
										onRowDelete: (oldData) =>
											new Promise<void>(
												(resolve, reject) => {
													deletePatroliNonLoginUser(
														oldData
													).then((result) => {
														if (result.success) {
															const dataDelete = [
																...patroliNonLogin
															]
															const accessRightRowData: any = oldData
															const index =
																accessRightRowData
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
																result.message as string
															)
															reject()
														}
													})
												}
											)
									}}
								/>
							</TabPanel> */}
						</>
					)}
				</Grid>
			</Grid>
		</SiteLayout>
	)
}

export default ProtectRoute(HakAksesPage, false, true)
