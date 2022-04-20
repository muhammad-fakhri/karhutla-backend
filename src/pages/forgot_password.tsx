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
import Alert from '@material-ui/lab/Alert'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { sendEmail } from '@service'
import { sendEmailValidator } from '@validator'
import { useRouter } from 'next/router'

const useStyles = makeStyles(styles)

function ForgotPage() {
	const router = useRouter()
	const [alertSuccess, setAlertSuccess] = useState(true)
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState({
		email: '',
		alertMessage: '',
		emailError: false,
		passwordError: false,
		showAlert: false,
		showPassword: false
	})

	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleSubmit = async () => {
		const validate = sendEmailValidator(values)
		if (validate.pass) {
			setLoading(true)
			const result = await sendEmail(values)
			console.log(result)

			if (result.success) {
				setValues({
					...values,
					showAlert: true,
					alertMessage: result.message as string
				})
				setAlertSuccess(true)
				setLoading(false)
			} else {
				setValues({
					...values,
					showAlert: true,
					alertMessage: result.message as string
				})
				setAlertSuccess(false)
				setLoading(false)
			}
		} else {
			setValues({
				...values,
				emailError: validate.emailError,
				passwordError: validate.passwordError,
				alertMessage: validate.message,
				showAlert: true
			})
			setAlertSuccess(false)
		}
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
									<h4>Lupa Kata Sandi</h4>
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
										id="email"
										error={values.emailError}
										label="Email"
										fullWidth
										margin="normal"
										onChange={handleChange('email')}
										value={values.email}
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
													Kirim Email
												</Button>
											)}
										</Grid>
										<Grid item xs={10} md={12}>
											<Button
												fullWidth
												onClick={(event) => {
													event.preventDefault()
													router.push('/login')
												}}
											>
												Kembali
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

export default ProtectRoute(ForgotPage)
