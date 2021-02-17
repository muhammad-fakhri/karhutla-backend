import DateFnsUtils from '@date-io/date-fns'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { Alert } from '@material-ui/lab'
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers'
import classNames from 'classnames'
import 'date-fns'
import { useState } from 'react'
import styles from '../../assets/jss/nextjs-material-kit/pages/pelaporan/rentang-tanggal.page.style'
import Button from '../../components/CustomButtons/Button'
import SiteLayout from '../../components/Layout/SiteLayout'
import Loader from '../../components/Loader/Loader'
import useAuth, { ProtectRoute } from '../../context/auth'
import PelaporanService from '../../services/pelaporan.service'

const useStyles = makeStyles(styles)

function PelaporanRentangTanggalPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [show, setShow] = useState(false)
	const [alertMessage, setAlertMessage] = useState('')
	const handleStartDateChange = (date) => setStartDate(date)

	const handleEndDateChange = (date) => setEndDate(date)

	const handleClick = () => {
		const result = PelaporanService.downloadLaporanRentangTanggal(
			startDate,
			endDate
		)
		if (!result.success) {
			setAlertMessage(result.message)
			setShow(true)
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
				<h2>Rekapitulasi Laporan Per Rentang Tanggal</h2>
				<form noValidate autoComplete="off" className={classes.form}>
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
								Silakan pilih rentang tanggal rekapitulasi
								laporan
								<br></br>
								dengan memilih <b>Tanggal Mulai</b> dan{' '}
								<b>Tanggal Selesai</b>
								<br></br>
								*maksimal rentang tanggal adalah 7 hari
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
										className={classes.textAlignLeft}
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
										className={classes.textAlignLeft}
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

export default ProtectRoute(PelaporanRentangTanggalPage)
