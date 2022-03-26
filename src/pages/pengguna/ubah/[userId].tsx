import styles from '@asset/jss/nextjs-material-kit/pages/update-pengguna.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { getUserDetail, updateUser } from '@service'
import classNames from 'classnames'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'

const useStyles = makeStyles(styles)

function UbahPenggunaPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { userId } = router.query
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState({
		id: '',
		registrationNumber: '',
		oldRegistrationNumber: '',
		name: '',
		email: '',
		oldEmail: '',
		phoneNumber: '',
		r_role_id: '',
		errorMessage: '',
		notFound: false,
		showAlert: false,
		alertMessage: ''
	})
	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		const result = await updateUser(values)
		if (result.success) {
			// Redirect to user management page
			router.push('/pengguna?alert=Ubah data pengguna berhasil')
		} else {
			setValues({
				...values,
				showAlert: true,
				alertMessage: result.message as string
			})
		}
		setLoading(false)
	}
	useEffect(() => {
		const getUserData = async () => {
			console.log(userId)
			if (userId) {
				const result = await getUserDetail(userId as string)
				if (result.success) {
					const { data: user } = result
					if (user) {
						setValues({
							...values,
							id: user.id.toString(),
							registrationNumber: user.registrationNumber,
							oldRegistrationNumber: user.registrationNumber,
							name: user.name,
							email: user.email,
							oldEmail: user.email,
							phoneNumber: user.phoneNumber,
							r_role_id: user.role.toString()
						})
					}
				} else {
					setValues({
						...values,
						notFound: true
					})
				}
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
								helperText="Format nomor telepon: +62xxxxxxxxxxx"
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
								<Grid item xs={10} md={12}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleFormSubmit}
										fullWidth
									>
										Ubah Data Pengguna
									</Button>
								</Grid>
							)}
							<br></br>
							<Grid item xs={10} md={12}>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									onClick={(event) => {
										event.preventDefault()
										router.push('/pengguna')
									}}
								>
									Batal
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(UbahPenggunaPage, false, true)
