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
	TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Alert from '@material-ui/lab/Alert'
import { loginValidator } from '@validator'
import { ChangeEvent, MouseEvent, useState } from 'react'

const useStyles = makeStyles(styles)

function ResetPage() {
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
	}

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
								<CardBody className={''}>
									{values.showAlert ? (
										<Alert severity="error">
											{values.alertMessage}
										</Alert>
									) : null}

									<TextField
										id="password"
										label="New Password"
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

									<TextField
										id="password"
										label="Re-enter New Password"
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
											variant="contained"
											color="primary"
											size="large"
											onClick={handleSubmit}
											fullWidth
										>
											Ubah
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

export default ProtectRoute(ResetPage)
