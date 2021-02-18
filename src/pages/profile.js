import {
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
	Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Alert from '@material-ui/lab/Alert'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import profileBgImage from '../assets/img/profile-bg.jpg'
import profile from '../assets/img/user.jpg'
import styles from '../assets/jss/nextjs-material-kit/pages/profile.page.style'
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import SiteLayout from '../components/Layout/SiteLayout'
import Loader from '../components/Loader/Loader'
import Parallax from '../components/Parallax/Parallax'
import useAuth, { ProtectRoute } from '../context/auth'
import { getUserCookie, setUserCookie } from '../services/cookies.service'
import UserService from '../services/user.service'

const useStyles = makeStyles(styles)

function ProfilePage() {
	const classes = useStyles()
	const { isAuthenticated, user } = useAuth()
	const imageClasses = classNames(
		classes.imgRaised,
		classes.imgRoundedCircle,
		classes.imgFluid
	)

	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState({
		id: 0,
		registrationNumber: '',
		oldRegistrationNumber: '',
		name: '',
		email: '',
		oldEmail: '',
		phoneNumber: '',
		photo: '',
		instantion: '',
		password: '',
		cPassword: '',
		errorMessage: '',
		showPassword: false,
		showAlert: false,
		alertMessage: '',
		alertSuccess: true
	})
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		const result = await UserService.updateUser(values)
		if (result.success) {
			setValues({
				...values,
				showAlert: true,
				alertMessage: result.message,
				alertSuccess: result.success
			})
			const updatedUser = {
				id: values.id,
				name: values.name,
				email: values.email,
				registrationNumber: values.registrationNumber,
				phoneNumber: values.phoneNumber,
				instantion: values.instantion,
				photo: values.photo
			}
			setUserCookie(updatedUser)
		} else {
			setValues({
				...values,
				showAlert: true,
				alertMessage: result.message,
				alertSuccess: result.success
			})
		}
		setLoading(false)
	}
	const handleClickShowPassword = () =>
		setValues({ ...values, showPassword: !values.showPassword })
	const handleMouseDownPassword = (event) => event.preventDefault()

	useEffect(() => {
		if (isAuthenticated) {
			const user = JSON.parse(getUserCookie())
			setValues({
				...values,
				id: user.id,
				registrationNumber: user.registrationNumber,
				oldRegistrationNumber: user.registrationNumber,
				name: user.name,
				email: user.email,
				oldEmail: user.email,
				phoneNumber: user.phoneNumber,
				photo: user.photo,
				instantion: user.instantion
			})
		}
	}, [isAuthenticated])

	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout scrollChange={true}>
			<div>
				<Parallax small filter image={profileBgImage} />
				<div className={classNames(classes.main, classes.mainRaised)}>
					<div>
						<div className={classes.container}>
							<GridContainer justify="center">
								<GridItem xs={12} sm={12} md={6}>
									<div className={classes.profile}>
										<div>
											<img
												src={values.photo || profile}
												alt="Foto Profile"
												className={imageClasses}
											/>
										</div>
									</div>
								</GridItem>
							</GridContainer>
							<GridContainer justify="center">
								<GridItem xs={12} sm={12} md={6}>
									<div className={classes.description}>
										{values.showAlert ? (
											<Alert
												severity={
													values.alertSuccess
														? 'success'
														: 'error'
												}
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
										<Typography
											variant="h6"
											gutterBottom
											align="center"
											className={classes.descriptionTitle}
										>
											Data Pengguna
										</Typography>
										<TextField
											id="role"
											className={classes.descriptionItem}
											label="Hak Akses"
											fullWidth
											variant="outlined"
											value={user.roleName}
											disabled
											margin="normal"
										/>
										<TextField
											id="registration-number"
											className={classes.descriptionItem}
											label="Nomor Registrasi/NIP"
											fullWidth
											variant="outlined"
											onChange={handleChange(
												'registrationNumber'
											)}
											value={values.registrationNumber}
											margin="normal"
										/>
										<TextField
											className={classes.descriptionItem}
											id="name"
											label="Nama"
											fullWidth
											variant="outlined"
											required
											onChange={handleChange('name')}
											value={values.name}
											margin="normal"
										/>
										<TextField
											className={classes.descriptionItem}
											id="email"
											label="Email"
											fullWidth
											variant="outlined"
											onChange={handleChange('email')}
											value={values.email}
											margin="normal"
										/>
										<TextField
											className={classes.descriptionItem}
											id="phone-number"
											label="Nomor Telepon"
											fullWidth
											variant="outlined"
											helperText="Format nomor telepon: +628xxxxxxxxxx"
											required
											onChange={handleChange(
												'phoneNumber'
											)}
											value={values.phoneNumber}
											margin="normal"
										/>
										<Typography
											variant="h6"
											gutterBottom
											align="center"
											className={classes.descriptionTitle}
										>
											Kata Sandi
										</Typography>
										<TextField
											id="password"
											label="Kata Sandi Baru"
											variant="outlined"
											value={values.password}
											type={
												values.showPassword
													? 'text'
													: 'password'
											}
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
										<TextField
											id="confirmation-password"
											label="Konfirmasi Kata Sandi"
											variant="outlined"
											value={values.cPassword}
											type={
												values.showPassword
													? 'text'
													: 'password'
											}
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
										{loading ? (
											<CircularProgress />
										) : (
											<Button
												variant="contained"
												color="primary"
												onClick={handleFormSubmit}
												fullWidth
												size="large"
												className={
													classes.descriptionTitle
												}
											>
												Simpan
											</Button>
										)}
									</div>
								</GridItem>
							</GridContainer>
						</div>
					</div>
				</div>
			</div>
		</SiteLayout>
	)
}
export default ProtectRoute(ProfilePage)
