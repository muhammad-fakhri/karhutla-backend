import {
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Alert from '@material-ui/lab/Alert'
import { useState } from 'react'
import styles from '../assets/jss/nextjs-material-kit/pages/login.page.style'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import CardFooter from '../components/Card/CardFooter'
import CardHeader from '../components/Card/CardHeader'
import Button from '../components/CustomButtons/Button'
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import AuthLayout from '../components/Layout/AuthLayout'
import Loader from '../components/Loader/Loader'
import useAuth, { ProtectRoute } from '../context/auth'
import { loginValidator } from '../validators'

const useStyles = makeStyles(styles)

function LoginPage() {
	const { login, isAuthenticated } = useAuth()
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState({
		email: '',
		password: '',
		alertMessage: '',
		emailError: false,
		passwordError: false,
		showAlert: false,
		showPassword: false
	})
	const handleClickShowPassword = () =>
		setValues({ ...values, showPassword: !values.showPassword })
	const handleMouseDownPassword = (event) => event.preventDefault()
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleSubmit = async () => {
		const validate = loginValidator(values)
		if (validate.pass) {
			setLoading(true)
			const result = await login(
				values.email.trim(),
				values.password.trim()
			)
			if (!result.success) {
				setValues({
					...values,
					alertMessage: result.message,
					showAlert: true
				})
			}
			setLoading(false)
		} else {
			setValues({
				...values,
				emailError: validate.emailError,
				passwordError: validate.passwordError,
				alertMessage: validate.message,
				showAlert: true
			})
		}
	}

	const [cardAnimaton, setCardAnimation] = useState('cardHidden')
	setTimeout(function () {
		setCardAnimation('')
	}, 700)
	const classes = useStyles()

	return isAuthenticated ? (
		<Loader />
	) : (
		<AuthLayout>
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem xs={12} sm={6} md={4}>
						<Card className={classes[cardAnimaton]}>
							<form className={classes.form}>
								<CardHeader
									color="primary"
									className={classes.cardHeader}
								>
									<h4>Login ke SIPP Karhutla</h4>
								</CardHeader>
								<CardBody>
									{values.showAlert ? (
										<Alert severity="error">
											{values.alertMessage}
										</Alert>
									) : null}
									<TextField
										id="email"
										error={values.emailError}
										label="Email"
										fullWidth
										margin="normal"
										onChange={handleChange('email')}
										value={values.email}
									/>
									<TextField
										id="password"
										label="Password"
										error={values.passwordError}
										value={values.password}
										type={
											values.showPassword
												? 'text'
												: 'password'
										}
										fullWidth
										margin="normal"
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
								</CardBody>
								<CardFooter className={classes.cardFooter}>
									{loading ? (
										<CircularProgress />
									) : (
										<Button
											simple
											color="primary"
											size="lg"
											onClick={handleSubmit}
										>
											Login
										</Button>
									)}
								</CardFooter>
							</form>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		</AuthLayout>
	)
}

export default ProtectRoute(LoginPage, true)
