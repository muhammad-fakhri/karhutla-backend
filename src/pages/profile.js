import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import {
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	CircularProgress
} from '@material-ui/core'
// core components
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Alert from '@material-ui/lab/Alert'
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import Button from '../components/CustomButtons/Button'
import Loader from '../components/Loader/Loader'
import Parallax from '../components/Parallax/Parallax'
import profile from '../assets/img/user.jpg'
import styles from '../assets/jss/nextjs-material-kit/pages/profile.page.style'
import profileBgImage from '../assets/img/profile-bg.jpg'
import SiteLayout from '../components/Layout/SiteLayout'
import useAuth, { ProtectRoute } from '../context/auth'
import UserService from '../services/user.service'
import CookieService from '../services/cookies.service'

const useStyles = makeStyles(styles)

function ProfilePage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const imageClasses = classNames(
		classes.imgRaised,
		classes.imgRoundedCircle,
		classes.imgFluid
	)

	const [loading, setLoading] = React.useState(false)
	const [values, setValues] = React.useState({
		id: 0,
		registrationNumber: '',
		oldRegistrationNumber: '',
		name: '',
		email: '',
		oldEmail: '',
		phone: '',
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
				phoneNumber: values.phone,
				instantion: values.instantion,
				photo: values.photo
			}
			CookieService.setUser(updatedUser)
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

	React.useEffect(() => {
		const user = JSON.parse(CookieService.getUser())
		setValues({
			...values,
			id: user.id,
			registrationNumber: user.registrationNumber,
			oldRegistrationNumber: user.registrationNumber,
			name: user.name,
			email: user.email,
			oldEmail: user.email,
			phone: user.phoneNumber,
			photo: user.photo,
			instantion: user.instantion
		})
	}, [])

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
											helperText="Format nomor HP: +628xxxxxxxxxx"
											required
											onChange={handleChange('phone')}
											value={values.phone}
											margin="normal"
											gutterBottom
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
