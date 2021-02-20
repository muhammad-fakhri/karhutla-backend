import styles from '@asset/jss/nextjs-material-kit/pages/create-pengguna.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography
} from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { addUser } from '@service'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ChangeEvent, MouseEvent, useState, ReactNode } from 'react'

const useStyles = makeStyles(styles)

type DialogTitlePropType = {
	children: ReactNode
	classes: Record<any, string>
	onClose: () => void
	id: string
}

const DialogTitle = (props: DialogTitlePropType) => {
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

function TambahPenggunaPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState({
		registrationNumber: '',
		name: '',
		email: '',
		phoneNumber: '',
		password: '',
		cPassword: '',
		errorMessage: '',
		showDialog: false,
		showPassword: false,
		successDialog: true
	})
	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		const result = await addUser(values)
		if (result.success)
			setValues({ ...values, successDialog: true, showDialog: true })
		else {
			setValues({
				...values,
				successDialog: false,
				errorMessage: result.message as string,
				showDialog: true
			})
		}
		setLoading(false)
	}
	const resetForm = () => {
		setValues({
			...values,
			registrationNumber: '',
			name: '',
			email: '',
			phoneNumber: '',
			password: '',
			cPassword: '',
			errorMessage: '',
			showDialog: false,
			showPassword: false,
			successDialog: true
		})
	}
	const closeDialog = () => {
		if (values.successDialog) resetForm()
		else setValues({ ...values, showDialog: false })
	}
	const handleClickShowPassword = () =>
		setValues({ ...values, showPassword: !values.showPassword })
	const handleMouseDownPassword = (event: MouseEvent) =>
		event.preventDefault()

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
				<h2>Tambah Pengguna</h2>
				<form noValidate autoComplete="off">
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							<TextField
								id="registration-number"
								label="Nomor Registrasi/NIP"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('registrationNumber')}
								value={values.registrationNumber}
							/>
						</Grid>
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
					</Grid>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							<TextField
								id="email"
								label="Email"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('email')}
								value={values.email}
							/>
						</Grid>
						<Grid item xs={10} md={4}>
							<TextField
								id="phone-number"
								label="Nomor Telepon"
								variant="outlined"
								helperText="Format nomor telepon: +62xxxxxxxxxxx"
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('phoneNumber')}
								value={values.phoneNumber}
							/>
						</Grid>
					</Grid>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							<TextField
								id="password"
								label="Password"
								variant="outlined"
								value={values.password}
								type={values.showPassword ? 'text' : 'password'}
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('password')}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
												onMouseDown={
													handleMouseDownPassword
												}
												edge="end"
											>
												{values.showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item xs={10} md={4}>
							<TextField
								id="confirmation-password"
								label="Konfirmasi Password"
								variant="outlined"
								value={values.cPassword}
								type={values.showPassword ? 'text' : 'password'}
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('cPassword')}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
												onMouseDown={
													handleMouseDownPassword
												}
												edge="end"
											>
												{values.showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</Grid>
					</Grid>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							{loading ? (
								<CircularProgress />
							) : (
								<Button
									variant="contained"
									color="primary"
									onClick={handleFormSubmit}
									size="large"
									fullWidth
								>
									Tambah Pengguna
								</Button>
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
							? 'Tambah Pengguna Berhasil'
							: 'Tambah Pengguna Gagal'}
					</DialogTitle>
					<MuiDialogContent dividers>
						<Box component="div" textAlign="center">
							{values.successDialog ? (
								<>
									<Button
										variant="contained"
										color="primary"
										onClick={resetForm}
										size="large"
										className={classes.dialogButton}
									>
										Tambah Pengguna Lagi
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={(event) => {
											event.preventDefault()
											router.push('/pengguna')
										}}
										size="large"
									>
										Kembali ke Halaman Manajemen Data
										Pengguna
									</Button>
								</>
							) : (
								<Typography>{values.errorMessage}</Typography>
							)}
						</Box>
					</MuiDialogContent>
				</Dialog>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(TambahPenggunaPage, false, true)
