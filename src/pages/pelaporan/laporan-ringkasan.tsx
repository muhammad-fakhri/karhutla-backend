import styles from '@asset/jss/nextjs-material-kit/pages/pelaporan/rentang-tanggal.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import DateFnsUtils from '@date-io/date-fns'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { Alert } from '@material-ui/lab'
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { downloadLaporanRingkasan } from '@service'
import classNames from 'classnames'
import 'date-fns'
import { useState } from 'react'

const useStyles = makeStyles(styles)

function PelaporanRingkasanPage() {
	const classes = useStyles()
	const { isAuthenticated, user } = useAuth()
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [organization, setOrganization] = useState('')
	const [show, setShow] = useState(false)
	const [alertMessage, setAlertMessage] = useState('')
	const handleStartDateChange = (date: Date | null) => {
		if (date) setStartDate(date)
	}

	const handleEndDateChange = (date: Date | null) => {
		if (date) setEndDate(date)
	}

	const handleClick = () => {
		if (user.organization) {
			const result = downloadLaporanRingkasan(
				startDate,
				endDate,
				btoa(user.organization)
			)
			if (!result.success) {
				setAlertMessage(result.message as string)
				setShow(true)
			}
		} else {
			const result = downloadLaporanRingkasan(startDate, endDate, '')
			if (!result.success) {
				setAlertMessage(result.message as string)
				setShow(true)
			}
		}
		setStartDate(new Date())
		setEndDate(new Date())
	}

	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout headerColor="info">
			<div
				className={classNames(
					classes.main,
					classes.mainRaised,
					classes.textCenter
				)}
			>
				<h2>Rekapitulasi Laporan Ringkasan Per Rentang Tanggal</h2>
				<form noValidate autoComplete="off">
					<Grid container justify="center">
						<Grid item xs={10} sm={6}>
							{show ? (
								<Alert
									severity="error"
									variant="filled"
									onClose={() => {
										setShow(false)
									}}
									hidden={true}
									className={classes.alert}
								>
									{alertMessage}
								</Alert>
							) : null}
						</Grid>
						<Grid item xs={10}>
							<Typography variant="body1" gutterBottom>
								Silakan pilih rentang tanggal Laporan Ringkasan
								<br></br>
								dengan memilih <b>Tanggal Mulai</b> dan{' '}
								<b>Tanggal Selesai</b>
								<br></br>
							</Typography>
						</Grid>
					</Grid>
					<Grid container justify="center">
						<Grid item lg={3} md={4} sm={10}>
							<Grid item sm={12}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										id="start-date-picker"
										margin="normal"
										label="Tanggal Mulai"
										format="dd/MM/yyyy"
										value={startDate}
										inputVariant="outlined"
										required
										onChange={handleStartDateChange}
										fullWidth
										KeyboardButtonProps={{
											'aria-label': 'change date'
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>
							<Grid item sm={12}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										id="finish-date-picker"
										margin="normal"
										label="Tanggal Selesai"
										format="dd/MM/yyyy"
										inputVariant="outlined"
										value={endDate}
										required
										fullWidth
										onChange={handleEndDateChange}
										KeyboardButtonProps={{
											'aria-label': 'change date'
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>
						</Grid>
					</Grid>
					<Grid container justify="center">
						<Grid item lg={3} md={4} sm={10}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								className={classes.formButton}
								startIcon={<CloudDownloadIcon />}
								onClick={handleClick}
								fullWidth
							>
								Download Laporan
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PelaporanRingkasanPage)
