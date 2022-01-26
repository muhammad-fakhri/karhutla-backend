import styles from '@asset/jss/nextjs-material-kit/pages/groundcheck/create-user-groundcheck.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import {
	addUserGroundCheck,
	getAllProvinsi,
	getAllKabupaten,
	getAllKecamatanGc,
	getDaops
} from '@service'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ChangeEvent, MouseEvent, useState, ReactNode } from 'react'
import { useEffect } from 'react'

const useStyles = makeStyles(styles)

type DialogTitlePropType = {
	children: ReactNode
	classes: Record<any, string>
	onClose: () => void
	id: string
}

const toTitleCase = (phrase) => {
	return phrase
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

const DialogTitle = (props: DialogTitlePropType) => {
	const { children, classes, onClose, ...other } = props
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6" className={classes.dialogTitle}>
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					color="default"
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	)
}

function TambahPenggunaGroundcheckPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [daopsList, setDaopsList] = useState<any[]>([])
	const [daops, setDaops] = useState('')
	const [provinceList, setProvinceList] = useState<any[]>([])
	const [province, setProvince] = useState('')
	const [kabupatenList, setKabupatenList] = useState<any[]>([])
	const [kabupaten, setKabupaten] = useState('')
	const [kecamatanList, setKecamatanList] = useState<any[]>([])
	const [kecamatan, setKecamatan] = useState('')
	const [anggota, setAnggota] = useState('')
	const [startDate, setStartDate] = useState(new Date())
	const [tblHead, setTblHead] = useState([
		{
			label: 'Nama Anggota',
			id: 'name'
		},
		{
			label: 'Aksi',
			id: 'action'
		}
	])
	const [stateAnggota, setStateAnggota] = useState('')
	const [tblData, setTblData] = useState([])
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		cPassword: '',
		provinsi: '',
		kabupaten: '',
		patroli: '',
		daops: '',
		startDate: '',
		anggota: '',
		errorMessage: '',
		showDialog: false,
		showPassword: false,
		successDialog: true
	})
	const dataAnggota = []
	let joinAnggota = ''

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllProvinsi()
			setProvinceList(data)
			const dataDaops = await getDaops()
			setDaopsList(dataDaops)
		}
		if (isAuthenticated) fetchData()
	}, [isAuthenticated])

	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleStartDateChange = (date: Date | null) => {
		if (date) {
			setValues({
				...values,
				startDate: new Date(date).toISOString().slice(0, 10)
			})
			setStartDate(date)
		}
	}
	const handleProvinceChange = async (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const data = await getAllKabupaten(event.target.value)

		setValues({ ...values, provinsi: event.target.value })
		setKabupatenList(data)
		setProvince(event.target.value)
	}

	const handleKabutenChange = async (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const data = await getAllKecamatanGc(event.target.value)

		setValues({ ...values, kabupaten: event.target.value })
		setKecamatanList(data)
		setKabupaten(event.target.value)
	}

	const handleKecamatanChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, patroli: event.target.value })
		setKecamatan(event.target.value)
	}

	const handleDaopsChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, daops: event.target.value })
		setDaops(event.target.value)
	}

	const handleFormSubmit = async () => {
		setLoading(true)
		console.log(values)
		const result = await addUserGroundCheck(values)
		if (result.success)
			setValues({ ...values, successDialog: true, showDialog: true })
		else {
			setValues({
				...values,
				successDialog: false,
				errorMessage: result.message as string,
				showDialog: true
			})
		}
		setLoading(false)
	}
	const resetForm = () => {
		setValues({
			...values,
			name: '',
			email: '',
			password: '',
			cPassword: '',
			provinsi: '',
			kabupaten: '',
			patroli: '',
			daops: '',
			startDate: '',
			anggota: '',
			errorMessage: '',
			showDialog: false,
			showPassword: false,
			successDialog: true
		})
	}
	const moreAnggota = () => {
		const newAnggota = tblData
		newAnggota.push({ name: stateAnggota, action: '' })
		setTblData(newAnggota)
		setStateAnggota('')
		if (tblData) {
			tblData.map((a) => {
				dataAnggota.push(a.name)
			})

			joinAnggota = dataAnggota.join()
			setValues({ ...values, anggota: joinAnggota })
		}
		console.log(joinAnggota)
	}
	const deleteCurrent = (i) => {
		const tblDel = tblData.filter((val, index) => {
			if (i === index) {
				tblData.map((a) => {
					if (val.name !== a.name) {
						dataAnggota.push(a.name)
					}
				})
				joinAnggota = dataAnggota.join()
				setValues({ ...values, anggota: joinAnggota })
			}
			return i !== index
		})
		setTblData(tblDel)

		console.log(joinAnggota)
	}
	const closeDialog = () => {
		if (values.successDialog) resetForm()
		else setValues({ ...values, showDialog: false })
	}
	const handleClickShowPassword = () =>
		setValues({ ...values, showPassword: !values.showPassword })
	const handleMouseDownPassword = (event: MouseEvent) =>
		event.preventDefault()

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
				<h2>Tambah Pengguna Ground Check</h2>
				<form noValidate autoComplete="off">
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							<TextField
								id="name"
								label="Nama Ketua"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('name')}
								value={values.name}
								name="name"
							/>
						</Grid>
						<Grid item xs={10} md={4}>
							<TextField
								id="email"
								label="Email Ketua"
								variant="outlined"
								fullWidth
								margin="normal"
								required
								className={classes.textAlignLeft}
								onChange={handleChange('email')}
								value={values.email}
								name="email"
							/>
						</Grid>
					</Grid>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							<TextField
								id="password"
								label="Password"
								variant="outlined"
								value={values.password}
								type={values.showPassword ? 'text' : 'password'}
								fullWidth
								margin="normal"
								required
								name="password"
								className={classes.textAlignLeft}
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
						</Grid>
						<Grid item xs={10} md={4}>
							<TextField
								id="confirmation-password"
								label="Konfirmasi Password"
								variant="outlined"
								value={values.cPassword}
								type={values.showPassword ? 'text' : 'password'}
								fullWidth
								margin="normal"
								required
								name="cPassword"
								className={classes.textAlignLeft}
								onChange={handleChange('cPassword')}
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
						</Grid>
					</Grid>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
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
								name="provinsi"
								onChange={handleProvinceChange}
								value={province}
								className={classes.textAlignLeft}
							>
								{provinceList.map((option) => (
									<MenuItem
										key={option.kode_wilayah}
										value={option.kode_wilayah}
									>
										{toTitleCase(option.nama_wilayah)}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={10} md={4}>
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
								name="kabupaten"
								onChange={handleKabutenChange}
								value={kabupaten}
								className={classes.textAlignLeft}
							>
								{kabupatenList.map((option) => (
									<MenuItem
										key={option.kode_wilayah}
										value={option.kode_wilayah}
									>
										{toTitleCase(option.nama_wilayah)}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							<TextField
								id="outlined-number"
								select
								margin="normal"
								label="Daops"
								InputLabelProps={{
									shrink: true
								}}
								variant="outlined"
								required
								onChange={handleDaopsChange}
								fullWidth
								name="daops"
								value={daops}
								className={classes.textAlignLeft}
							>
								{daopsList.map((option) => (
									<MenuItem
										key={option.nama_daops}
										value={option.nama_daops}
									>
										{option.nama_daops}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={10} md={4}>
							<TextField
								id="outlined-number"
								select
								margin="normal"
								label="Daerah Patroli"
								InputLabelProps={{
									shrink: true
								}}
								variant="outlined"
								required
								fullWidth
								onChange={handleKecamatanChange}
								name="patroli"
								value={kecamatan}
								className={classes.textAlignLeft}
							>
								{kecamatanList.map((option) => (
									<MenuItem
										key={option.kode_wilayah}
										value={option.kode_wilayah}
									>
										{toTitleCase(option.nama_wilayah)}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={10} md={4}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									id="startDate"
									margin="normal"
									label="Tanggal"
									name="startDate"
									format="dd-MM-yyyy"
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
						<Grid item xs={10} md={4}>
							<TextField
								id="anggota"
								label="Anggota"
								type="input"
								InputLabelProps={{
									shrink: true
								}}
								value={stateAnggota}
								onChange={(e) => {
									setStateAnggota(e.target.value)
								}}
								variant="outlined"
								fullWidth
								margin="normal"
								name="anggota"
								required
							/>
							<Button
								variant="contained"
								size="large"
								fullWidth
								onClick={(_) => {
									moreAnggota()
								}}
							>
								Tambah Anggota
							</Button>
							<Table>
								<TableHead>
									<TableRow>
										{tblHead.map((val, index) => {
											return (
												<TableCell key={index}>
													{val.label}
												</TableCell>
											)
										})}
									</TableRow>
								</TableHead>
								<TableBody>
									{tblData.map((val, index) => {
										return (
											<TableRow key={index}>
												{tblHead.map((val2, index2) => {
													return (
														<TableCell key={index2}>
															{val2.id !==
															'action' ? (
																val[val2.id]
															) : (
																<IconButton
																	onClick={(
																		_
																	) => {
																		deleteCurrent(
																			index
																		)
																	}}
																>
																	<DeleteIcon />
																</IconButton>
															)}
														</TableCell>
													)
												})}
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</Grid>
					</Grid>
					<Grid
						container
						justify="center"
						spacing={2}
						style={{
							margin: '140px 0px 0px'
						}}
					>
						<Grid item xs={10} md={4}>
							{loading ? (
								<CircularProgress />
							) : (
								<Button
									variant="contained"
									color="primary"
									onClick={handleFormSubmit}
									size="large"
									fullWidth
								>
									Tambah Pengguna
								</Button>
							)}
						</Grid>
					</Grid>
				</form>
				<Dialog
					onClose={closeDialog}
					aria-labelledby="customized-dialog-title"
					open={values.showDialog}
				>
					<DialogTitle
						id="customized-dialog-title"
						onClose={closeDialog}
						classes={classes}
					>
						{values.successDialog
							? 'Tambah Pengguna Berhasil'
							: 'Tambah Pengguna Gagal'}
					</DialogTitle>
					<MuiDialogContent dividers>
						<Box component="div" textAlign="center">
							{values.successDialog ? (
								<>
									<Button
										variant="contained"
										color="primary"
										onClick={(event) => {
											event.preventDefault()
											router.push('/groundcheck')
										}}
										size="large"
									>
										Kembali ke Halaman Manajemen Data
										Pengguna Ground Check
									</Button>
								</>
							) : (
								<Typography>{values.errorMessage}</Typography>
							)}
						</Box>
					</MuiDialogContent>
				</Dialog>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(TambahPenggunaGroundcheckPage, false, true)
