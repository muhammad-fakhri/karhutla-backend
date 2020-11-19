import { useRouter } from 'next/router'
import {
	Paper,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	IconButton,
	TextField,
	MenuItem,
	Slide
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import useSWR from 'swr'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Close from '@material-ui/icons/Close'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import styles from '../../assets/jss/nextjs-material-kit/pages/pengguna.page.style'
import SiteLayout from '../../components/Layout/SiteLayout'
import Button from '../../components/CustomButtons/Button'
import UserService from '../../services/user.service'
import DaopsService from '../../services/daops.service'
import BalaiService from '../../services/balai.service'
import useAuth, { ProtectRoute } from '../../context/auth'
import Loader from '../../components/Loader/Loader'
import modalStyle from '../../assets/jss/nextjs-material-kit/modalStyle'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />
})

const column = [
	{ title: 'Nama', field: 'name' },
	{ title: 'No Registrasi/NIP', field: 'registrationNumber' },
	{ title: 'Email', field: 'email' },
	{ title: 'Nomor HP', field: 'phone' }
]

function PenggunaPage() {
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { alert } = router.query
	const useStyles = makeStyles(styles)
	const useModalStyles = makeStyles(modalStyle)
	const classes = useStyles()
	const modalClasses = useModalStyles()
	const [roleType, setRoleType] = React.useState('pusat')
	const [openModal, setOpenModal] = React.useState(false)
	const [modalUser, setModalUser] = React.useState({
		id: '',
		name: '',
		email: '',
		role: '',
		organization: ''
	})
	const [daops, setDaops] = React.useState([])
	const [balai, setBalai] = React.useState([])
	const [roles, setRoles] = React.useState([])
	const [users, setUsers] = React.useState([])
	const [showAlert, setShowAlert] = React.useState(false)
	const [alertType, setAlertType] = React.useState('success')
	const [alertMessage, setAlertMessage] = React.useState()
	const { data: dataUsers, isValidating } = useSWR(
		isAuthenticated ? '/user/list' : null,
		UserService.getAllUsers
	)
	const handleRoleChange = (event) => {
		if (event.target.value === 4 || event.target.value === 5) {
			setRoleType('pusat')
			setModalUser({
				...modalUser,
				role: event.target.value,
				organization: 'KLHK'
			})
		} else {
			if (event.target.value === 6 || event.target.value === 7) {
				setRoleType('balai')
			} else if (event.target.value === 8 || event.target.value === 9) {
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
	React.useEffect(() => {
		setUsers(dataUsers)
	}, [dataUsers])
	React.useEffect(() => {
		if (alert) {
			setAlertMessage(alert)
			setShowAlert(true)
			setAlertType('success')
		}
	}, [])
	React.useEffect(() => {
		const setOptionData = async () => {
			const roles = await UserService.getNonPatroliRoles()
			const daops = await DaopsService.getAllDaops()
			const balai = await BalaiService.getAllBalai()
			setRoles(roles)
			setDaops(daops)
			setBalai(balai)
		}
		if (isAuthenticated) setOptionData()
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
								<MenuItem key={role.id} value={role.id}>
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

export default ProtectRoute(PenggunaPage)
