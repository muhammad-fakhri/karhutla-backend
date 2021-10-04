import styles from '@asset/jss/nextjs-material-kit/pages/penugasan/create-penugasan.page.style'
import GridItem from '@component/Grid/GridItem'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import {
	Button,
	CircularProgress,
	Grid,
	Link,
	MenuItem,
	TextField,
	Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CheckIcon from '@material-ui/icons/Check'
import { Alert } from '@material-ui/lab'
import {
	uploadPenugasan,
	getAllProvinsi,
	getAllKabupaten,
	checkSkNumber
} from '@service'
import classNames from 'classnames'
import 'date-fns'
import { useEffect } from 'react'
import { ChangeEvent, useState } from 'react'

const useStyles = makeStyles(styles)

const workTypes = [
	{
		value: 'mandiri',
		label: 'Mandiri'
	},
	{
		value: 'rutin',
		label: 'Rutin'
	},
	{
		value: 'terpadu',
		label: 'Terpadu'
	}
]

type AlertElemenPropType = {
	text: string[]
}

const AlertElement = (props: AlertElemenPropType) => {
	return (
		<>
			{props.text.map((str, index) => (
				<p key={index}>{str}</p>
			))}
		</>
	)
}

function BerkasPenugasanPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [workFile, setWorkFile] = useState<File | null>(null)
	const [workType, setWorkType] = useState('')
	const [provinceList, setProvinceList] = useState<any[]>([])
	const [province, setProvince] = useState('')
	const [kabupatenList, setKabupatenList] = useState<any[]>([])
	const [kabupaten, setKabupaten] = useState('')
	const [alertMessage, setAlertMessage] = useState<string[]>([])
	const [show, setShow] = useState(false)
	const [showCheck, setShowCheck] = useState(false)
	const [alertSuccess, setAlertSuccess] = useState(true)
	const [alertCheck, setAlertCheck] = useState(false)
	const [loading, setLoading] = useState(false)
	const [skNumber, setSkNumber] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllProvinsi()
			console.log(data)
			setProvinceList(data)
		}
		if (isAuthenticated) fetchData()
	}, [isAuthenticated])

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) setWorkFile(event.target.files[0])
	}

	const handleSkChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSkNumber(event.target.value)
	}

	const handleWorkTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setWorkType(event.target.value)
	}

	const handleProvinceChange = async (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const data = await getAllKabupaten(event.target.value)
		console.log(data)
		setKabupatenList(data)
		setProvince(event.target.value)
	}

	const handleKabutenChange = (event: ChangeEvent<HTMLInputElement>) => {
		setKabupaten(event.target.value)
	}

	const handleClick = async () => {
		setLoading(true)
		const result = await uploadPenugasan(
			workFile as File,
			workType,
			skNumber,
			province,
			kabupaten
		)
		setLoading(false)

		if (!result.success) setAlertSuccess(false)
		else {
			setAlertSuccess(true)
			setWorkFile(null)
			setWorkType('')
			setShowCheck(false)
		}
		setAlertMessage(result.message as string[])
		setShow(true)
	}

	const handleClickCheck = async () => {
		if (skNumber !== '') {
			const result = await checkSkNumber(skNumber)
			if (!result.success) setAlertSuccess(false)
			else {
				setAlertSuccess(true)
				setWorkFile(null)
				setWorkType('')
				setShow(false)
				setAlertCheck(true)
				console.log(alertCheck)
			}
			setAlertMessage(result.message as string[])
			setWorkFile(null)
			setWorkType('')
			setShow(false)
			setShowCheck(true)

			console.log(alertCheck)
		} else {
			handleSkChange
			console.log(skNumber)
		}
	}
	console.log(alertSuccess)
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
					<Grid container justify="center">
						<GridItem sm={6} xs={10}>
							{show ? (
								<Alert
									severity={
										alertSuccess ? 'success' : 'error'
									}
									variant="filled"
									onClose={() => {
										setShow(false)
									}}
									hidden={true}
									className={classes.alert}
								>
									<AlertElement text={alertMessage} />
								</Alert>
							) : null}

							{showCheck && !show ? (
								<Alert
									severity={
										alertSuccess ? 'success' : 'error'
									}
									variant="filled"
									onClose={() => {
										setShowCheck(false)
									}}
									hidden={true}
									className={classes.alert}
								>
									{alertMessage}
								</Alert>
							) : null}
						</GridItem>
					</Grid>
					<Grid container justify="center">
						<Grid item sm={10} xs={10}>
							<Typography variant="body1" gutterBottom>
								Gunakan File EXCEL dengan format yang dapat
								diunduh{' '}
								<Link
									href="/file/contoh_template.xlsx"
									className={classes.downloadButton}
								>
									disini
								</Link>
								<br></br>
								pastikan SEMUA kolom TERISI dan format penulisan
								telah sesuai
							</Typography>
						</Grid>
					</Grid>
					<Grid container justify="center">
						<Grid item lg={5} md={4} sm={10}>
							<Grid item sm={12}>
								<TextField
									id="outlined-number"
									margin="normal"
									label="Nomor SK"
									type="text"
									InputLabelProps={{
										shrink: true
									}}
									variant="outlined"
									required
									fullWidth
									name="skNumber"
									onChange={handleSkChange}
									className={classes.textAlignLeft}
									style={{
										width: '80%'
									}}
								/>
								<Button
									variant="contained"
									color="primary"
									size="large"
									fullWidth
									onClick={handleClickCheck}
									// startIcon={<CheckIcon />}
									style={{
										width: '20%',
										margin: '16px 0 8px 0',
										height: '56px'
									}}
								>
									Cek
								</Button>
							</Grid>
							<Grid item sm={12}>
								{showCheck && alertCheck ? (
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
								) : (
									<TextField
										id="outlined-number"
										margin="normal"
										label="Berkas Excel"
										disabled
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
								)}
							</Grid>

							<Grid item sm={2}></Grid>
							<Grid item sm={12}>
								<TextField
									id="outlined-number"
									select
									margin="normal"
									label="Kategori Penugasan"
									InputLabelProps={{
										shrink: true
									}}
									variant="outlined"
									required
									fullWidth
									name="type"
									onChange={handleWorkTypeChange}
									value={workType}
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
							</Grid>

							<Grid item sm={12}>
								{showCheck && alertCheck ? (
									<TextField
										id="outlined-number"
										select
										margin="normal"
										label="Provinsi"
										InputLabelProps={{
											shrink: true
										}}
										variant="outlined"
										required
										fullWidth
										name="type"
										onChange={handleProvinceChange}
										value={province}
										className={classes.textAlignLeft}
									>
										{workType === 'terpadu' ? (
											<MenuItem key="semua" value="0">
												Semua
											</MenuItem>
										) : null}

										{provinceList.map((option) => (
											<MenuItem
												key={option.kode_wilayah}
												value={option.kode_wilayah}
											>
												{option.nama_wilayah}
											</MenuItem>
										))}
									</TextField>
								) : (
									<TextField
										id="outlined-number"
										select
										disabled
										margin="normal"
										label="Provinsi"
										InputLabelProps={{
											shrink: true
										}}
										variant="outlined"
										required
										fullWidth
										name="type"
										onChange={handleProvinceChange}
										value={province}
										className={classes.textAlignLeft}
									></TextField>
								)}
							</Grid>
							<Grid item sm={12}>
								{showCheck && alertCheck ? (
									<TextField
										id="outlined-number"
										select
										margin="normal"
										label="Kabupaten"
										InputLabelProps={{
											shrink: true
										}}
										variant="outlined"
										required
										fullWidth
										name="type"
										onChange={handleKabutenChange}
										value={kabupaten}
										className={classes.textAlignLeft}
									>
										{workType === 'terpadu' ? (
											<MenuItem key="semua" value="0">
												Semua
											</MenuItem>
										) : null}

										{kabupatenList.map((option) => (
											<MenuItem
												key={option.kode_wilayah}
												value={option.kode_wilayah}
											>
												{option.nama_wilayah}
											</MenuItem>
										))}
									</TextField>
								) : (
									<TextField
										id="outlined-number"
										select
										disabled
										margin="normal"
										label="Kabupaten"
										InputLabelProps={{
											shrink: true
										}}
										variant="outlined"
										required
										fullWidth
										name="type"
										onChange={handleKabutenChange}
										value={kabupaten}
										className={classes.textAlignLeft}
									></TextField>
								)}
							</Grid>
						</Grid>
					</Grid>
					<Grid container justify="center">
						<Grid item lg={3} md={4} sm={10} xs={8}>
							{loading ? (
								<CircularProgress />
							) : (
								<Button
									variant="contained"
									color="primary"
									size="large"
									startIcon={<CloudUploadIcon />}
									onClick={handleClick}
									fullWidth
								>
									Upload
								</Button>
							)}
						</Grid>
					</Grid>
				</form>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(BerkasPenugasanPage)
