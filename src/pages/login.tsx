import styles from '@asset/jss/nextjs-material-kit/pages/login.page.style'
import Card from '@component/Card/Card'
import CardBody from '@component/Card/CardBody'
import CardFooter from '@component/Card/CardFooter'
import CardHeader from '@component/Card/CardHeader'
import GridContainer from '@component/Grid/GridContainer'
import GridItem from '@component/Grid/GridItem'
import AuthLayout from '@component/Layout/AuthLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import {
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
	Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Alert from '@material-ui/lab/Alert'
import { loginValidator } from '@validator'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { resetUser } from '@service'

const useStyles = makeStyles(styles)

function LoginPage() {
	const router = useRouter()
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
	const handleMouseDownPassword = (event: MouseEvent) =>
		event.preventDefault()
	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
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
					alertMessage: result.message as string,
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

	const [cardAnimaton, setCardAnimation] = useState('cardHidden' as const)
	setTimeout(function () {
		setCardAnimation('' as 'cardHidden')
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
								<CardBody className={''}>
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
									<Grid
										container
										justify="center"
										spacing={2}
									>
										<Grid item xs={10} md={12}>
											{loading ? (
												<CircularProgress />
											) : (
												<Button
													variant="contained"
													color="primary"
													size="large"
													onClick={handleSubmit}
													fullWidth
												>
													Login
												</Button>
											)}
										</Grid>
										<Grid item xs={10} md={12}>
											<Button
												fullWidth
												onClick={(event) => {
													event.preventDefault()
													router.push(
														'/forgot_password'
													)
												}}
											>
												Lupa kata sandi?
											</Button>
										</Grid>
									</Grid>
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
