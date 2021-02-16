import { useRouter } from 'next/router'
import {
	CircularProgress,
	IconButton,
	TextField,
	Grid,
	Dialog,
	Typography,
	MenuItem,
	Button,
	Box,
	Divider,
	Paper
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import MaterialTable from 'material-table'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import SiteLayout from '../../../components/Layout/SiteLayout'
import CustomButton from '../../../components/CustomButtons/Button'
import Loader from '../../../components/Loader/Loader'
import styles from '../../../assets/jss/nextjs-material-kit/pages/create-posko.page.style'
import useAuth, { ProtectRoute } from '../../../context/auth'
import PoskoService from '../../../services/posko.service'
import DaopsService from '../../../services/daops.service'
import WilayahService from '../../../services/wilayah.service'

const useStyles = makeStyles(styles)

const DialogTitle = (props) => {
	const { children, classes, onClose, ...other } = props
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6" className={classes.dialogTitle}>
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					color="default"
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	)
}

const column = [
	{
		title: 'Kecamatan',
		field: 'name'
	}
]

function TambahPoskoPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const [loading, setLoading] = React.useState(false)
	const [daopsOptionData, setDaopsOptionData] = React.useState([])
	const [kecamatan, setKecamatan] = React.useState([])
	const [values, setValues] = React.useState({
		name: '',
		daops: '',
		kecamatan: '',
		errorMessage: '',
		showTextfield: false,
		textfieldValue: '',
		showDialog: false,
		successDialog: true
	})
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		const result = await PoskoService.addPosko(values)
		if (result.success)
			setValues({ ...values, successDialog: true, showDialog: true })
		else {
			setValues({
				...values,
				successDialog: false,
				errorMessage: result.message,
				showDialog: true
			})
		}
		setLoading(false)
	}
	const resetForm = () => {
		setValues({
			...values,
			name: '',
			daops: '',
			kecamatan: '',
			showDialog: false,
			errorMessage: '',
			showTextfield: false,
			textfieldValue: ''
		})
	}
	const closeDialog = () => {
		if (values.successDialog) resetForm()
		else setValues({ ...values, showDialog: false })
	}
	React.useEffect(() => {
		const setOptionData = async () => {
			const daops = await DaopsService.getAllDaops()
			const kecamatan = await WilayahService.getAllKecamatan()
			setDaopsOptionData(daops)
			setKecamatan(kecamatan)
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
				<h2>Tambah Posko</h2>
				<form noValidate autoComplete="off">
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							<TextField
								id="name"
								label="Nama"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('name')}
								value={values.name}
							/>
						</Grid>
						<Grid item xs={10} md={4}>
							<TextField
								id="daops"
								label="Daops"
								variant="outlined"
								fullWidth
								margin="normal"
								select
								required
								className={classes.textAlignLeft}
								onChange={handleChange('daops')}
								value={values.daops}
							>
								{daopsOptionData.map((option) => (
									<MenuItem
										key={option.code}
										value={option.id}
									>
										{option.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid container justify="center" spacing={2}>
						{values.showTextfield ? (
							<Grid item xs={10} md={4}>
								<TextField
									id="kecamatan"
									label="Kecamatan"
									variant="outlined"
									fullWidth
									disabled
									margin="normal"
									required
									className={classes.textAlignLeft}
									value={values.textfieldValue}
								/>
								<Button
									size="small"
									variant="contained"
									onClick={() => {
										setValues({
											...values,
											kecamatan: '',
											textfieldValue: '',
											showTextfield: false
										})
									}}
								>
									Ganti Kecamatan
								</Button>
							</Grid>
						) : (
							<Grid item xs={10} md={8}>
								<Divider />
								<h3>Pilih Kecamatan</h3>
								<MaterialTable
									title=""
									columns={column}
									components={{
										Container: (props) => (
											<Paper {...props} elevation={0} />
										)
									}}
									data={kecamatan}
									options={{
										search: true,
										actionsColumnIndex: -1
									}}
									localization={{
										header: { actions: 'Aksi' }
									}}
									actions={[
										{
											icon: AddBoxIcon,
											tooltip: 'Pilih kecamatan',
											onClick: (event, rowData) => {
												setValues({
													...values,
													kecamatan: rowData.id,
													textfieldValue:
														rowData.name,
													showTextfield: true
												})
											}
										}
									]}
								/>
							</Grid>
						)}
					</Grid>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							{loading ? (
								<CircularProgress />
							) : (
								<CustomButton
									variant="contained"
									color="primary"
									onClick={handleFormSubmit}
									fullWidth
								>
									Tambah Posko
								</CustomButton>
							)}
						</Grid>
					</Grid>
				</form>
				<Dialog
					onClose={closeDialog}
					aria-labelledby="customized-dialog-title"
					open={values.showDialog}
				>
					<DialogTitle
						id="customized-dialog-title"
						onClose={closeDialog}
						classes={classes}
					>
						{values.successDialog
							? 'Tambah Posko Berhasil'
							: 'Tambah Posko Gagal'}
					</DialogTitle>
					<MuiDialogContent dividers>
						<Box component="div" textAlign="center">
							{values.successDialog ? (
								<>
									<CustomButton
										variant="contained"
										color="primary"
										onClick={resetForm}
									>
										Tambah Posko Lagi
									</CustomButton>
									<CustomButton
										variant="contained"
										color="primary"
										onClick={(event) => {
											event.preventDefault()
											router.push('/wilayah/posko')
										}}
									>
										Kembali ke Halaman Data Posko
									</CustomButton>
								</>
							) : (
								values.errorMessage.map((error, index) => (
									<Typography key={index}>{error}</Typography>
								))
							)}
						</Box>
					</MuiDialogContent>
				</Dialog>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(TambahPoskoPage, false, true)
