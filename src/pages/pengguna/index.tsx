import modalStyle from '@asset/jss/nextjs-material-kit/modalStyle'
import styles from '@asset/jss/nextjs-material-kit/pages/pengguna.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { BalaiData, DaopsData, RoleData, UserData } from '@interface'
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Paper,
	Slide,
	TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TransitionProps } from '@material-ui/core/transitions'
import AddBoxIcon from '@material-ui/icons/AddBox'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import Close from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import {
	addNonPatroliUser,
	deleteUser,
	getAllBalai,
	getAllDaops,
	getAllUsers,
	getNonPatroliRoles
} from '@service'
import { isBalaiRole, isDaopsRole, isPusatRole } from '@util'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useRouter } from 'next/router'
import { ChangeEvent, forwardRef, Ref, useEffect, useState } from 'react'

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />
})

const column = [
	{ title: 'Nama', field: 'name' },
	{ title: 'No Registrasi/NIP', field: 'registrationNumber' },
	{ title: 'Email', field: 'email' },
	{ title: 'Nomor HP', field: 'phoneNumber' }
]

function PenggunaPage() {
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { alert: alertQuery } = router.query
	const useStyles = makeStyles(styles)
	const useModalStyles = makeStyles(modalStyle)
	const classes = useStyles()
	const modalClasses = useModalStyles()
	const [roleType, setRoleType] = useState('pusat')
	const [openModal, setOpenModal] = useState(false)
	const [modalUser, setModalUser] = useState({
		id: '',
		name: '',
		email: '',
		role: '',
		organization: ''
	})
	const [daops, setDaops] = useState<DaopsData[]>([])
	const [balai, setBalai] = useState<BalaiData[]>([])
	const [roles, setRoles] = useState<RoleData[]>([])
	const [users, setUsers] = useState<UserData[]>([])
	const [showAlert, setShowAlert] = useState(false)
	const [loading, setLoading] = useState(true)
	const [alertType, setAlertType] = useState<
		'success' | 'info' | 'warning' | 'error'
	>('success')
	const [alertMessage, setAlertMessage] = useState('')
	const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (isPusatRole(parseInt(event.target.value, 10))) {
			setRoleType('pusat')
			setModalUser({
				...modalUser,
				role: event.target.value,
				organization: 'KLHK'
			})
		} else {
			if (isBalaiRole(parseInt(event.target.value, 10))) {
				setRoleType('balai')
			} else if (isDaopsRole(parseInt(event.target.value, 10))) {
				setRoleType('daops')
			}
			setModalUser({
				...modalUser,
				role: event.target.value,
				organization: ''
			})
		}
	}
	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setModalUser({ ...modalUser, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		const result = await addNonPatroliUser(modalUser)
		if (result.success) {
			// Show success alert
			setAlertType('success')
			setAlertMessage('Tambah hak akses pengguna berhasil')
			setShowAlert(true)
		} else {
			// Show fail alert
			setAlertType('error')
			setAlertMessage(result.message as string)
			setShowAlert(true)
		}
		setOpenModal(false)
		setModalUser({
			id: '',
			name: '',
			email: '',
			role: '',
			organization: ''
		})
		setRoleType('pusat')
	}
	useEffect(() => {
		const fetchData = async () => {
			const roles = await getNonPatroliRoles()
			const daops = await getAllDaops()
			const balai = await getAllBalai()
			setRoles(roles)
			setDaops(daops)
			setBalai(balai)

			console.log(roles)

			const data = await getAllUsers()
			setUsers(data)
			setLoading(false)
		}
		if (alertQuery) {
			setAlertMessage(alertQuery as string)
			setShowAlert(true)
			setAlertType('success')
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
				<h2>Manajemen Data Pengguna</h2>
				{showAlert ? (
					<Alert
						severity={alertType}
						onClose={() => {
							setShowAlert(false)
							setAlertMessage('')
						}}
					>
						{alertMessage}
					</Alert>
				) : null}
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
						data={users}
						actions={[
							{
								icon: AddBoxIcon,
								tooltip: 'Tambah Pengguna',
								isFreeAction: true,
								onClick: (event) => {
									event.preventDefault()
									router.push('/pengguna/tambah')
								}
							},
							{
								icon: 'edit',
								tooltip: 'Ubah Data Pengguna',
								onClick: (event, rowData) => {
									{
										const userData = rowData as UserData
										router.push(
											`/pengguna/ubah/${userData.id}`
										)
									}
								}
							},
							{
								icon: AssignmentIndIcon,
								tooltip: 'Tambah Hak Akses Pengguna',
								onClick: (event, rowData) => {
									const userData = rowData as UserData
									setModalUser({
										...modalUser,
										id: userData.id.toString(),
										name: userData.name,
										email: userData.email
									})
									setOpenModal(true)
								}
							}
						]}
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
							onRowDelete: (oldData) =>
								new Promise<void>((resolve, reject) => {
									deleteUser(oldData).then((result) => {
										if (result.success) {
											const dataDelete = [...users]
											const userRowData: any = oldData
											const index =
												userRowData.tableData.id
											dataDelete.splice(index, 1)
											setUsers(dataDelete)
											setAlertType('success')
											setAlertMessage(
												'Hapus data pengguna berhasil'
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
						}}
					/>
				)}
				<Dialog
					classes={{
						paper: modalClasses.modal
					}}
					open={openModal}
					TransitionComponent={Transition}
					keepMounted
					onClose={() => setOpenModal(false)}
					aria-labelledby="modal-slide-title"
					aria-describedby="modal-slide-description"
				>
					<DialogTitle
						id="classic-modal-slide-title"
						disableTypography
						className={modalClasses.modalHeader}
					>
						<IconButton
							className={modalClasses.modalCloseButton}
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={() => setOpenModal(false)}
						>
							<Close className={modalClasses.modalClose} />
						</IconButton>
						<h4 className={modalClasses.modalTitle}>
							Tambah Hak Akses
						</h4>
					</DialogTitle>
					<DialogContent
						id="modal-slide-description"
						className={modalClasses.modalBody}
					>
						<TextField
							id="name"
							label="Nama"
							disabled
							fullWidth
							margin="normal"
							className={classes.textLeft}
							value={modalUser.name}
						/>
						<TextField
							id="email"
							label="Email"
							disabled
							fullWidth
							margin="normal"
							className={classes.textLeft}
							value={modalUser.email}
						/>
						<TextField
							id="role"
							select
							label="Hak Akses"
							fullWidth
							margin="normal"
							required
							onChange={handleRoleChange}
							value={modalUser.role}
							className={classes.textLeft}
						>
							{roles.map((role) => (
								<MenuItem key={role.level} value={role.id}>
									{role.name}
								</MenuItem>
							))}
						</TextField>
						{roleType === 'pusat' ? null : roleType === 'balai' ? (
							<TextField
								id="balai"
								select
								label="Balai"
								fullWidth
								margin="normal"
								required
								disabled
								value={modalUser.organization}
								onChange={handleChange('organization')}
								className={classes.textLeft}
							>
								{balai.map((balai) => (
									<MenuItem key={balai.id} value={balai.code}>
										{balai.name}
									</MenuItem>
								))}
							</TextField>
						) : (
							<TextField
								id="daops"
								select
								label="Daerah Operasi"
								fullWidth
								margin="normal"
								required
								disabled
								value={modalUser.organization}
								onChange={handleChange('organization')}
								className={classes.textLeft}
							>
								{daops.map((daops) => (
									<MenuItem key={daops.id} value={daops.code}>
										{daops.name}
									</MenuItem>
								))}
							</TextField>
						)}
					</DialogContent>
					<DialogActions
						className={`${modalClasses.modalFooter} ${modalClasses.modalFooterCenter}`}
					>
						<Button
							variant="contained"
							onClick={() => setOpenModal(false)}
						>
							Batal
						</Button>
						<Button
							variant="contained"
							onClick={handleFormSubmit}
							color="primary"
						>
							Tambah Hak Akses
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PenggunaPage, false, true)
