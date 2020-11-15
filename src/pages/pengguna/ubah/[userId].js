import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import {
	CircularProgress,
	IconButton,
	TextField,
	InputAdornment,
	Grid
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import SiteLayout from '../../../components/Layout/SiteLayout'
import Button from '../../../components/CustomButtons/Button'
import Loader from '../../../components/Loader/Loader'
import classNames from 'classnames'
import styles from '../../../assets/jss/nextjs-material-kit/pages/updatePenggunaPage'
import { makeStyles } from '@material-ui/core/styles'
import useAuth, { ProtectRoute } from '../../../context/auth'
import UserService from '../../../services/user.service'
const useStyles = makeStyles(styles)

function UbahPenggunaPage(props) {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { userId } = router.query
	const [loading, setLoading] = React.useState(false)
	const [values, setValues] = React.useState({
		id: '',
		registrationNumber: '',
		oldRegistrationNumber: '',
		name: '',
		email: '',
		oldEmail: '',
		phone: '',
		password: '',
		cPassword: '',
		errorMessage: '',
		showPassword: false,
		notFound: false,
		showAlert: false,
		alertMessage: ''
	})
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		let result = await UserService.updateUser(values)
		if (result.success) {
			// Redirect to user management page
			router.push('/pengguna?alert=Ubah data pengguna berhasil')
		} else {
			setValues({
				...values,
				showAlert: true,
				alertMessage: result.message
			})
		}
		setLoading(false)
	}
	const handleClickShowPassword = () =>
		setValues({ ...values, showPassword: !values.showPassword })
	const handleMouseDownPassword = (event) => event.preventDefault()
	React.useEffect(() => {
		const getUserData = async () => {
			const result = await UserService.getUserDetail(userId)
			if (result.success) {
				const user = result.user
				setValues({
					...values,
					id: user.id,
					registrationNumber: user.registrationNumber,
					oldRegistrationNumber: user.registrationNumber,
					name: user.name,
					email: user.email,
					oldEmail: user.email,
					phone: user.phone
				})
			} else {
				setValues({
					...values,
					notFound: true
				})
			}
		}
		if (isAuthenticated) getUserData()
	}, [isAuthenticated])

	return !isAuthenticated ? (
		<Loader />
	) : values.notFound ? (
		<ErrorPage statusCode={404} />
	) : (
		<SiteLayout headerColor="info">
			<div
				className={classNames(
					classes.main,
					classes.mainRaised,
					classes.textCenter
				)}
			>
				<h2>Ubah Data Pengguna</h2>
				<form noValidate autoComplete="off">
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={8}>
							{values.showAlert ? (
								<Alert
									severity="warning"
									onClose={() => {
										setValues({
											...values,
											alertMessage: '',
											showAlert: false
										})
									}}
								>
									{values.alertMessage}
								</Alert>
							) : null}
						</Grid>
					</Grid>
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
								label="Nomor HP"
								variant="outlined"
								helperText="Format nomor HP: 08xxxxxxxxxx / +62xxxxxxxxxxx"
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('phone')}
								value={values.phone}
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
								helperText="Silakan isi untuk mengubah kata sandi"
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
									fullWidth
								>
									Ubah Data Pengguna
								</Button>
							)}
						</Grid>
					</Grid>
				</form>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(UbahPenggunaPage)
