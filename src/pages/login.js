import { makeStyles } from '@material-ui/core/styles'
import { InputAdornment, Icon, CircularProgress } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Email from '@material-ui/icons/Email'
import { useState } from 'react'
import styles from '../assets/jss/nextjs-material-kit/pages/login.page.style'
import AuthLayout from '../components/Layout/AuthLayout'
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import Button from '../components/CustomButtons/Button'
import Card from '../components/Card/Card'
import CardBody from '../components/Card/CardBody'
import CardHeader from '../components/Card/CardHeader'
import CardFooter from '../components/Card/CardFooter'
import CustomInput from '../components/CustomInput/CustomInput'
import Loader from '../components/Loader/Loader'
import useAuth, { ProtectRoute } from '../context/auth'
import AuthValidator from '../validators/auth.validator'

const useStyles = makeStyles(styles)

function LoginPage() {
	const { login, isAuthenticated } = useAuth()
	const [loading, setLoading] = React.useState(false)
	const [values, setValues] = React.useState({
		email: '',
		password: '',
		alertMessage: '',
		emailError: false,
		passwordError: false,
		showAlert: false
	})
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleSubmit = async () => {
		const validate = AuthValidator.login(values)
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
									<h4>Login ke SIMADU2</h4>
								</CardHeader>
								<CardBody>
									{values.showAlert ? (
										<Alert severity="error">
											{values.alertMessage}
										</Alert>
									) : null}
									<CustomInput
										labelText="Email"
										id="email"
										formControlProps={{
											fullWidth: true
										}}
										error={values.emailError}
										inputProps={{
											type: 'email',
											endAdornment: (
												<InputAdornment position="end">
													<Email
														className={
															classes.inputIconsColor
														}
													/>
												</InputAdornment>
											)
										}}
										onChangeFunction={handleChange('email')}
									/>
									<CustomInput
										labelText="Password"
										id="pass"
										formControlProps={{
											fullWidth: true
										}}
										error={values.passwordError}
										inputProps={{
											type: 'password',
											endAdornment: (
												<InputAdornment position="end">
													<Icon
														className={
															classes.inputIconsColor
														}
													>
														lock_outline
													</Icon>
												</InputAdornment>
											),
											autoComplete: 'off'
										}}
										onChangeFunction={handleChange(
											'password'
										)}
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
