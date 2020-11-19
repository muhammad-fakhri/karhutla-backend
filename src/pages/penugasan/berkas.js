import 'date-fns'
// import DateFnsUtils from '@date-io/date-fns'
import {
	TextField,
	// MenuItem,
	Typography,
	Link,
	CircularProgress
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
// import {
// 	MuiPickersUtilsProvider,
// 	KeyboardDatePicker
// } from '@material-ui/pickers'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import SiteLayout from '../../components/Layout/SiteLayout'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import Button from '../../components/CustomButtons/Button'
import Loader from '../../components/Loader/Loader'
import PenugasanService from '../../services/penugasan.service'
import styles from '../../assets/jss/nextjs-material-kit/pages/penugasan/create-penugasan.page.style'
import useAuth, { ProtectRoute } from '../../context/auth'

const useStyles = makeStyles(styles)

// const workTypes = [
// 	{
// 		value: 'mandiri',
// 		label: 'Mandiri'
// 	},
// 	{
// 		value: 'rutin',
// 		label: 'Rutin'
// 	},
// 	{
// 		value: 'terpadu',
// 		label: 'Terpadu'
// 	}
// ]

function BerkasPenugasanPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	// const [workType, setWorkType] = React.useState('terpadu')
	// const [startDate, setStartDate] = React.useState(new Date())
	// const [finishDate, setFinishDate] = React.useState(new Date())
	// const [workNumber, setWorkNumber] = React.useState()
	const [workFile, setWorkFile] = React.useState()
	const [alertMessage, setAlertMessage] = React.useState()
	const [show, setShow] = React.useState(false)
	const [loading, setLoading] = React.useState(false)

	// const handleStartDateChange = (date) => {
	// 	setStartDate(date)
	// }

	// const handleFinishDateChange = (date) => {
	// 	setFinishDate(date)
	// }

	// const handleWorkNumberChange = (number) => {
	// 	setWorkNumber(number)
	// }

	// const handleWorkTypeChange = (event) => {
	// 	setWorkType(event.target.value)
	// }

	const handleFileChange = (event) => {
		setWorkFile(event.target.files[0])
	}

	const handleClick = async () => {
		setLoading(true)
		const result = await PenugasanService.uploadPenugasan(workFile)
		setLoading(false)
		setAlertMessage(result.message)
		setShow(true)
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
				<h2>Upload Berkas Excel Penugasan</h2>
				<form noValidate autoComplete="off" className={classes.form}>
					{/* <GridContainer justify="center">
						<GridItem sm={3} xs={10}>
							<TextField
								id="work-paper-type"
								select
								label="Jenis Surat Tugas"
								value={workType}
								onChange={handleWorkTypeChange}
								variant="outlined"
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
							>
								{workTypes.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</GridItem>
						<GridItem sm={5} xs={10}>
							<TextField
								id="work-paper-number"
								label="Nomor Surat Tugas"
								variant="outlined"
								margin="normal"
								value={workNumber}
								required
								fullWidth
								onChange={handleWorkNumberChange}
								className={classes.textAlignLeft}
							/>
						</GridItem>
					</GridContainer> */}
					{/* <GridContainer justify="center" alignItems="center">
						<GridItem sm={3} xs={10}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									id="start-date-picker"
									margin="normal"
									label="Tanggal Mulai"
									format="dd/MM/yyyy"
									value={startDate}
									required
									onChange={handleStartDateChange}
									fullWidth
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
									className={classes.textAlignLeft}
								/>
							</MuiPickersUtilsProvider>
						</GridItem>
						<GridItem sm={3} xs={10}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									id="finish-date-picker"
									margin="normal"
									label="Tanggal Selesai"
									format="dd/MM/yyyy"
									value={finishDate}
									required
									fullWidth
									onChange={handleFinishDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
									className={classes.textAlignLeft}
								/>
							</MuiPickersUtilsProvider>
						</GridItem>
					</GridContainer> */}
					<GridContainer justify="center">
						<GridItem sm={10} xs={10}>
							{show ? (
								<Alert
									severity="info"
									color="info"
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
							<Typography variant="body1" gutterBottom>
								Gunakan File EXCEL dengan format yang dapat
								diunduh{' '}
								<Link
									href="http://103.129.223.216/simadu2/app/contoh_template.xlsx"
									className={classes.downloadButton}
								>
									disini
								</Link>
								<br></br>
								pastikan SEMUA kolom TERISI dan format penulisan
								telah sesuai
							</Typography>
						</GridItem>
					</GridContainer>
					<GridContainer justify="center">
						<GridItem sm={6} md={4} xs={10}>
							<TextField
								id="outlined-number"
								margin="normal"
								label="Berkas Excel"
								type="file"
								InputLabelProps={{
									shrink: true
								}}
								variant="outlined"
								required
								fullWidth
								name="file"
								onChange={handleFileChange}
								className={classes.textAlignLeft}
							/>
						</GridItem>
					</GridContainer>
					<GridContainer justify="center">
						<GridItem sm={3} xs={10}>
							{loading ? (
								<CircularProgress />
							) : (
								<Button
									variant="contained"
									color="primary"
									startIcon={<CloudUploadIcon />}
									onClick={handleClick}
									fullWidth
								>
									Upload
								</Button>
							)}
						</GridItem>
					</GridContainer>
				</form>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(BerkasPenugasanPage)
