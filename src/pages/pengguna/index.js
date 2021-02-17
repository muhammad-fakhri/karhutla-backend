import {
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
import AddBoxIcon from '@material-ui/icons/AddBox'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import Close from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useRouter } from 'next/router'
import { forwardRef, useEffect, useState } from 'react'
import modalStyle from '../../assets/jss/nextjs-material-kit/modalStyle'
import styles from '../../assets/jss/nextjs-material-kit/pages/pengguna.page.style'
import Button from '../../components/CustomButtons/Button'
import SiteLayout from '../../components/Layout/SiteLayout'
import Loader from '../../components/Loader/Loader'
import useAuth, { ProtectRoute } from '../../context/auth'
import BalaiService from '../../services/balai.service'
import DaopsService from '../../services/daops.service'
import UserService from '../../services/user.service'
import { isBalaiRole, isDaopsRole, isPusatRole } from '../../utils/role.util'

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />
})

const column = [
	{ title: 'Nama', field: 'name' },
	{ title: 'No Registrasi/NIP', field: 'registrationNumber' },
	{ title: 'Email', field: 'email' },
	{ title: 'Nomor HP', field: 'phone' }
]

function PenggunaPage() {
	const { isAuthenticated, user } = useAuth()
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
	const [daops, setDaops] = useState([])
	const [balai, setBalai] = useState([])
	const [roles, setRoles] = useState([])
	const [users, setUsers] = useState([])
	const [showAlert, setShowAlert] = useState(false)
	const [loading, setLoading] = useState(true)
	const [alertType, setAlertType] = useState('success')
	const [alertMessage, setAlertMessage] = useState()
	const handleRoleChange = (event) => {
		if (isPusatRole(event.target.value)) {
			setRoleType('pusat')
			setModalUser({
				...modalUser,
				role: event.target.value,
				organization: 'KLHK'
			})
		} else {
			if (isBalaiRole(event.target.value)) {
				setRoleType('balai')
			} else if (isDaopsRole(event.target.value)) {
				setRoleType('daops')
			}
			setModalUser({
				...modalUser,
				role: event.target.value,
				organization: ''
			})
		}
	}
	const handleChange = (prop) => (event) => {
		setModalUser({ ...modalUser, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		const result = await UserService.addNonPatroliUser(modalUser)
		if (result.success) {
			// Show success alert
			setAlertType('success')
			setAlertMessage('Tambah hak akses pengguna berhasil')
			setShowAlert(true)
		} else {
			// Show fail alert
			setAlertType('error')
			setAlertMessage(result.message[0])
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
			const roles = await UserService.getNonPatroliRoles()
			const daops = await DaopsService.getAllDaops()
			const balai = await BalaiService.getAllBalai()
			setRoles(roles)
			setDaops(daops)
			setBalai(balai)

			const data = await UserService.getAllUsers()
			setUsers(data)
			setLoading(false)
		}
		if (alertQuery) {
			setAlertMessage(alertQuery)
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
									router.push(`/pengguna/ubah/${rowData.id}`)
								}
							},
							{
								icon: AssignmentIndIcon,
								tooltip: 'Tambah Hak Akses Pengguna',
								onClick: (event, rowData) => {
									setModalUser({
										...modalUser,
										id: rowData.id,
										name: rowData.name,
										email: rowData.email
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
							header: { actions: 'Aksi' }
						}}
						editable={{
							onRowDelete: (oldData) =>
								new Promise((resolve, reject) => {
									UserService.deleteUser(oldData).then(
										(result) => {
											if (result.success) {
												const dataDelete = [...users]
												const index =
													oldData.tableData.id
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
												setAlertMessage(result.message)
												setShowAlert(true)
												reject()
											}
										}
									)
								})
						}}
					/>
				)}
				<Dialog
					classes={{
						root: modalClasses.center,
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
							className={classes.textAlignLeft}
							value={modalUser.name}
						/>
						<TextField
							id="email"
							label="Email"
							disabled
							fullWidth
							margin="normal"
							className={classes.textAlignLeft}
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
							className={classes.textAlignLeft}
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
								values={modalUser.organization}
								onChange={handleChange('organization')}
								className={classes.textAlignLeft}
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
								values={modalUser.organization}
								onChange={handleChange('organization')}
								className={classes.textAlignLeft}
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
						<Button onClick={() => setOpenModal(false)}>
							Batal
						</Button>
						<Button onClick={handleFormSubmit} color="info">
							Tambah Hak Akses
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PenggunaPage, false, true)
