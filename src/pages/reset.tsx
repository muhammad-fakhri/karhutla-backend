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
import { loginValidator, ResetValidator } from '@validator'
import { ChangeEvent, MouseEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { resetUser } from '@service'

const useStyles = makeStyles(styles)

function ResetPage() {
	const router = useRouter()
	const [alertSuccess, setAlertSuccess] = useState(true)
	const [loading, setLoading] = useState(false)
	const [token, setToken] = useState('')
	const [values, setValues] = useState({
		signature: '',
		password: '',
		retype_password: '',
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
		const validate = ResetValidator(values)
		// console.log(router.query.token)
		if (router.query.token) {
			// setValues({ ...values, signature: router.query.token.toString() })
			if (validate.pass) {
				console.log(values)
				setLoading(true)
				const result = await resetUser(values)
				if (result.success) {
					setValues({
						...values,
						showAlert: true,
						alertMessage: result.message as string
					})
					setLoading(false)
					setAlertSuccess(true)
				} else {
					setValues({
						...values,
						showAlert: true,
						alertMessage: result.message as string
					})
					setLoading(false)
					setAlertSuccess(false)
				}
			} else {
				setValues({
					...values,
					alertMessage: validate.message,
					showAlert: true
				})
				setAlertSuccess(false)
				setLoading(false)
			}
		} else {
			setValues({
				...values,
				alertMessage: 'Token tidak ditemukan.',
				showAlert: true
			})
			setAlertSuccess(false)
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!router.isReady) return
		setToken(router.query.token.toString())
		setValues({ ...values, signature: router.query.token.toString() })
	}, [router.isReady])

	const [cardAnimaton, setCardAnimation] = useState('cardHidden' as const)
	setTimeout(function () {
		setCardAnimation('' as 'cardHidden')
	}, 700)
	const classes = useStyles()

	return (
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
									<h4>Ubah Kata Sandi</h4>
								</CardHeader>
								<Grid container justify="center" spacing={2}>
									<Grid item xs={6} md={11}>
										{values.showAlert ? (
											<Alert
												style={{ margin: '0 0 40px 0' }}
												severity={
													alertSuccess
														? 'success'
														: 'warning'
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
									</Grid>
								</Grid>
								<CardBody className={''}>
									<TextField
										id="password"
										label="Password"
										variant="outlined"
										value={values.password}
										type={
											values.showPassword
												? 'text'
												: 'password'
										}
										fullWidth
										margin="normal"
										required
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
										label="Konfirmasi Password"
										variant="outlined"
										value={values.retype_password}
										type={
											values.showPassword
												? 'text'
												: 'password'
										}
										fullWidth
										margin="normal"
										required
										onChange={handleChange(
											'retype_password'
										)}
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
													Ubah
												</Button>
											)}
										</Grid>
										<Grid item xs={10} md={12}>
											<Button
												color="primary"
												fullWidth
												onClick={(event) => {
													event.preventDefault()
													router.push('/login')
												}}
											>
												Login
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

export default ProtectRoute(ResetPage)
