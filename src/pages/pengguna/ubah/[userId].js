import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { CircularProgress, TextField, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import SiteLayout from '../../../components/Layout/SiteLayout'
import Button from '../../../components/CustomButtons/Button'
import Loader from '../../../components/Loader/Loader'
import styles from '../../../assets/jss/nextjs-material-kit/pages/update-pengguna.page.style'
import useAuth, { ProtectRoute } from '../../../context/auth'
import UserService from '../../../services/user.service'

const useStyles = makeStyles(styles)

function UbahPenggunaPage() {
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
		phoneNumber: '',
		errorMessage: '',
		notFound: false,
		showAlert: false,
		alertMessage: ''
	})
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		const result = await UserService.updateUser(values)
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
	React.useEffect(() => {
		const getUserData = async () => {
			const result = await UserService.getUserDetail(userId)
			if (result.success) {
				const { data: user } = result
				setValues({
					...values,
					id: user.id,
					registrationNumber: user.registrationNumber,
					oldRegistrationNumber: user.registrationNumber,
					name: user.name,
					email: user.email,
					oldEmail: user.email,
					phoneNumber: user.phoneNumber
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
							<TextField
								id="phone-number"
								label="Nomor Telepon"
								variant="outlined"
								helperText="Format nomor telepon: +628xxxxxxxxxx"
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

export default ProtectRoute(UbahPenggunaPage, false, true)
