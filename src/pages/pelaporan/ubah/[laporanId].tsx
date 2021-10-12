import styles from '@asset/jss/nextjs-material-kit/pages/update-pengguna.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import {
	Button,
	CircularProgress,
	Grid,
	TextField,
	MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { getLaporanDetail, getDetailList, updateLaporan } from '@service'
import classNames from 'classnames'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import * as React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles(styles)

function UbahLaporanPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { laporanId } = router.query
	const [laporan_id, setLaporanId] = useState('')
	const [laporan_darat_id, setLaporanDaratId] = useState('')
	const [tanggal_laporan, setTanggalLaporan] = useState('')
	const [daerah_patroli, setDaerah] = useState('')
	const [regu, setRegu] = useState([])
	const [workType, setWorkType] = useState('')
	const [workTypeList, setWorkTypeList] = useState([])
	const [daily_activity, setDailyActivity] = useState<any[]>([])
	const [satelite, setSatelite] = useState([])
	const [inventory, setInventory] = useState([])
	const [latitude, setLatitude] = useState('')
	const [longitude, setLongitude] = useState('')
	const [desa, setDesa] = useState('')
	const [kecamatan, setKecamatan] = useState('')
	const [kabupaten, setKabupaten] = useState('')
	const [provinsi, setProvinsi] = useState('')
	const [aksesibilitas, setAksesibilitas] = useState([])
	const [cuaca, setCuaca] = useState('')
	const [cuaca_pagi, setCuacaPagi] = useState('')
	const [cuaca_siang, setCuacaSiang] = useState('')
	const [cuaca_sore, setCuacaSore] = useState('')
	const [curah_hujan, setCurahHujan] = useState('')
	const [suhu, setSuhu] = useState('')
	const [kelembaban, setKelembaban] = useState('')
	const [kecepatan_angin, setKecepatanAngin] = useState('')
	const [ffmc, setFfmc] = useState('')
	const [fwi, setFwi] = useState('')
	const [dc, setDc] = useState('')

	const [cuacaList, setCuacaList] = useState([])
	const [kondisiKarhutla, setKondisiKarhutla] = useState('')
	const [kondisiKarhutlaList, setKondisiKarhutlaList] = useState([])
	const [potensiKarhutla, setPotensiKarhutla] = useState('')
	const [potensiKarhutlaList, setPotensiKarhutlaList] = useState([])
	const [aktivitasMasyarakat, setAktivitas] = useState('')
	const [aktivitasMasyarakatList, setAktivitasList] = useState([])
	console.log(laporanId)
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState({
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
	const [alertSuccess, setAlertSuccess] = useState(true)

	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const [value, setValue] = React.useState('1')

	const handleChangeTab = (event, newValue) => {
		setValue(newValue)
	}

	const handleWorkTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setWorkType(event.target.value)
	}

	const handleCuacaChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCuaca(event.target.value)
	}

	const handleCuacaPagiChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCuacaPagi(event.target.value)
	}

	const handleCuacaSiangChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCuacaSiang(event.target.value)
	}

	const handleCuacaSoreChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCuacaSore(event.target.value)
	}

	const handleKondisiKarhutlaChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setKondisiKarhutla(event.target.value)
	}

	const handlePotensiKarhutlaChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setPotensiKarhutla(event.target.value)
	}

	const handleFfcmChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFfmc(event.target.value)
	}

	const handleFwiChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFwi(event.target.value)
	}

	const handleDcChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDc(event.target.value)
	}

	const handleAktivitasKarhutlaChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setAktivitas(event.target.value)
	}

	const HandleInputChange = (type: string) => (event) => {
		switch (type) {
			case 'latitude':
				setLatitude(event.target.value)
				break
			case 'longitude':
				setLongitude(event.target.value)
				break
			case 'desa':
				setDesa(event.target.value)
				break
			case 'kecamatan':
				setKecamatan(event.target.value)
				break
			case 'kabupaten':
				setKabupaten(event.target.value)
				break
			case 'provinsi':
				setProvinsi(event.target.value)
				break
			case 'curah_hujan':
				setCurahHujan(event.target.value)
				break
			case 'suhu':
				setSuhu(event.target.value)
				break
			case 'kelembaban':
				setKelembaban(event.target.value)
				break
			case 'kecepatan_angin':
				setKecepatanAngin(event.target.value)
				break
		}
	}

	function changeCheck(type, index: number) {
		const newArray = []

		let arrayLast = [
			{
				checked: Boolean
			}
		]
		let checked2: boolean

		switch (type) {
			case 'satelite_hotspot':
				arrayLast = satelite
				break
			case 'inventory':
				arrayLast = inventory
				break
			case 'activity':
				arrayLast = daily_activity
				break
			case 'aksesibilitas':
				arrayLast = aksesibilitas
		}
		for (const dd in arrayLast) {
			if (parseInt(dd) === index) {
				checked2 = !arrayLast[dd].checked
				newArray.push({
					...arrayLast[dd],
					checked: checked2
				})
			} else {
				newArray.push({
					...arrayLast[dd],
					checked: arrayLast[dd].checked
				})
			}
		}

		return newArray
	}
	const handleClickCheckbox = async (type: string, index: number) => {
		const result = await changeCheck(type, index)
		console.log(result)
		switch (type) {
			case 'satelite_hotspot':
				setSatelite(result)
				break
			case 'inventory':
				setInventory(result)
				break
			case 'activity':
				setDailyActivity(result)
				break
			case 'aksesibilitas':
				setAksesibilitas(result)
		}
	}

	const handleFormSubmit = async () => {
		console.log(daily_activity)
		setLoading(true)
		const newDaily = []
		const newSatelite = []
		const newInventory = []
		const newAksebilitas = []
		if (daily_activity) {
			// daily_n = daily_activity.filter((val:Array<Object>,index) => {
			// 	return val.checked === true
			// })

			for (const dd in daily_activity) {
				if (daily_activity[dd].checked === true)
					newDaily.push(daily_activity[dd].id)
			}
		}

		if (inventory) {
			for (const dd in inventory) {
				if (inventory[dd].checked) newInventory.push(inventory[dd].id)
			}
		}

		if (satelite) {
			for (const dd in satelite) {
				if (satelite[dd].checked) newSatelite.push(satelite[dd].id)
			}
		}

		if (aksesibilitas) {
			for (const dd in aksesibilitas) {
				if (aksesibilitas[dd].checked)
					newAksebilitas.push(aksesibilitas[dd].id)
			}
		}

		const formLaporan = {
			id_laporan_header: laporan_id,
			id_daerah_patroli: daerah_patroli,
			id_aktivitas_harian: newDaily,
			id_regu_tim_patroli: regu,
			id_inventori_patroli: newInventory,
			kategori_patroli: workType,
			satelit_hotspot: newSatelite,
			tanggal_patroli: tanggal_laporan,
			laporanDarat: [
				{
					id_laporan_darat: laporan_darat_id,
					latitude: latitude,
					longitude: longitude,
					desa_kelurahan: desa,
					kecamatan: kecamatan,
					kabupaten: kabupaten,
					provinsi: provinsi,
					cuaca_pagi: cuaca_pagi,
					cuaca_siang: cuaca_siang,
					cuaca_sore: cuaca_sore,
					curah_hujan: curah_hujan,
					suhu: suhu,
					kelembaban: kelembaban,
					kecepatan_angin: kecepatan_angin,
					kondisi_lapangan: kondisiKarhutla,
					potensi_karhutla: potensiKarhutla,
					FFMC_KKAS: ffmc,
					FWI_ICK: fwi,
					DC_KK: dc,
					aktivitas_masyarakat: aktivitasMasyarakat,
					aksebilitas: newAksebilitas,
					dokumen: []
				}
			],
			observasiGroup: [],
			dokumen: []
		}

		// if(laporan_darat_id) formLaporan["laporanDarat"]["id_laporan_darat"] = laporan_darat_id
		// if(latitude) formLaporan["laporanDarat"]["latitude"] = latitude
		// if(longitude) formLaporan["laporanDarat"]["longitude"] = longitude
		// if(desa) formLaporan["laporanDarat"]["desa_kelurahan"] = desa
		// if(kecamatan) formLaporan["laporanDarat"]["kecamatan"] = kecamatan
		// if(kabupaten) formLaporan["laporanDarat"]["kabupaten"] = kabupaten
		// if(provinsi) formLaporan["laporanDarat"]["provinsi"] = provinsi
		// if(cuaca_pagi) formLaporan["laporanDarat"]["cuaca_pagi"] = cuaca_pagi
		// if(cuaca_siang) formLaporan["laporanDarat"]["cuaca_siang"] = cuaca_siang
		// if(cuaca_sore) formLaporan["laporanDarat"]["cuaca_sore"] = cuaca_sore

		console.log(formLaporan)

		const result = await updateLaporan(formLaporan)
		if (result.success) {
			// // Redirect to laporan management page
			// router.push('/pelaporan/ubah/' + laporan_id)
			setValues({
				...values,
				showAlert: true,
				alertMessage: result.message as string
			})
			window.scrollTo(0, 0)
			setAlertSuccess(true)
		} else {
			setValues({
				...values,
				showAlert: true,
				alertMessage: result.message as string
			})
			setAlertSuccess(false)
			window.scrollTo(0, 0)
		}
		setLoading(false)
	}

	useEffect(() => {
		const getLaporanData = async () => {
			console.log('test')
			if (laporanId) {
				const detailList = await getDetailList()
				const result = await getLaporanDetail(laporanId as string)
				console.log(result)
				if (result.success && detailList.success) {
					console.log(detailList.data.KategoriPatroli)

					setWorkType(result.data[0].kategori_patroli)
					setLaporanId(result.data[0].id_laporan_header)
					setTanggalLaporan(result.data[0].tanggal_patroli)
					setDaerah(result.data[0].id_daerah_patroli)
					setRegu(result.data[0].id_regu_tim_patroli)
					if (result.data[0].laporanDarat[0]) {
						setLaporanDaratId(
							result.data[0].laporanDarat[0].id_laporan_darat
						)
						setLatitude(result.data[0].laporanDarat[0].latitude)
						setLongitude(result.data[0].laporanDarat[0].longitude)
						setDesa(result.data[0].laporanDarat[0].desa_kelurahan)
						setKecamatan(result.data[0].laporanDarat[0].kecamatan)
						setKabupaten(result.data[0].laporanDarat[0].kabupaten)
						setProvinsi(result.data[0].laporanDarat[0].provinsi)
						setCuacaPagi(result.data[0].laporanDarat[0].cuaca_pagi)
						setCuacaSiang(
							result.data[0].laporanDarat[0].cuaca_siang
						)
						setCuacaSore(result.data[0].laporanDarat[0].cuaca_sore)
						setCurahHujan(
							result.data[0].laporanDarat[0].curah_hujan
						)
						setSuhu(result.data[0].laporanDarat[0].suhu)
						setKelembaban(result.data[0].laporanDarat[0].kelembaban)
						setKecepatanAngin(
							result.data[0].laporanDarat[0].kecepatan_angin
						)
						setKondisiKarhutla(
							result.data[0].laporanDarat[0].kondisi_lapangan
						)
						setPotensiKarhutla(
							result.data[0].laporanDarat[0].potensi_karhutla
						)
						setAktivitas(
							result.data[0].laporanDarat[0].aktivitas_masyarakat
						)
						setFfmc(result.data[0].laporanDarat[0].FFMC_KKAS)
						setFwi(result.data[0].laporanDarat[0].FWI_ICK)
						setDc(result.data[0].laporanDarat[0].DC_KK)
					}
					let checked = false
					const newAksebilitas = detailList.data.Aksebilitas
					for (const dd in newAksebilitas) {
						checked = false
						if (result.data[0].laporanDarat[0]) {
							newAksebilitas[dd] = {
								...newAksebilitas[dd],
								checked: result.data[0].laporanDarat[0].aksebilitas.includes(
									newAksebilitas[dd].id
								)
							}
						}
					}
					setAksesibilitas(newAksebilitas)

					setWorkTypeList(detailList.data.KategoriPatroli)
					setCuacaList(detailList.data.Cuaca)
					setKondisiKarhutlaList(detailList.data.KondisiKarhutla)
					setPotensiKarhutlaList(detailList.data.PotensiKarhutla)
					setAktivitasList(detailList.data.AktivitasMasyarakat)

					const newSatelite = detailList.data.Satelit
					for (const dd in newSatelite) {
						checked = false
						if (
							result.data[0].satelit_hotspot.includes(
								newSatelite[dd].id
							)
						) {
							checked = true
						}
						newSatelite[dd] = {
							...newSatelite[dd],
							checked: checked
						}
					}
					setSatelite(newSatelite)

					const newInventory = detailList.data.Inventori
					for (const dd in newInventory) {
						checked = false
						newInventory[dd] = {
							...newInventory[dd],
							checked: result.data[0].id_inventori_patroli.includes(
								newInventory[dd].id
							)
						}
					}
					setInventory(newInventory)

					const newDaily = detailList.data.AktivitasHarian
					for (const dd in newDaily) {
						checked = false
						newDaily[dd] = {
							...newDaily[dd],
							checked: result.data[0].id_aktivitas_harian.includes(
								newDaily[dd].id
							)
						}
					}
					setDailyActivity(newDaily)
				} else {
					// console.log('error')
					// setValues({
					// 	...values,
					// 	notFound: true
					// })
				}
			}
		}

		if (isAuthenticated) getLaporanData()
	}, [isAuthenticated, laporanId])

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
				<h2>Ubah Data Laporan</h2>
				<form noValidate autoComplete="off" style={{ margin: '60px' }}>
					<Grid container justify="center" spacing={2}>
						<Grid item xs={12} md={12}>
							{values.showAlert ? (
								<Alert
									severity={
										alertSuccess ? 'success' : 'warning'
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
					<Grid container justify="center" spacing={2}>
						<Grid item xs={12}>
							<Box style={{ width: '100%' }}>
								<TabContext value={value}>
									<Box
										style={{
											borderBottom: 1,
											borderColor: 'divider'
										}}
									>
										<TabList
											onChange={handleChangeTab}
											aria-label="lab API tabs example"
										>
											<Tab label="Data Umum" value="1" />
											<Tab label="Data Darat" value="2" />
											<Tab label="Observasi" value="3" />
										</TabList>
									</Box>
									<TabPanel value="1">
										<Grid
											container
											justify="center"
											spacing={2}
										>
											<Grid
												item
												xs={6}
												style={{
													margin: '25px 0',
													border: '1px solid #eee',
													padding: '20px'
												}}
											>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="Kategori Penugasan"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														fullWidth
														name="typework"
														defaultValue=""
														value={workType}
														className={
															classes.textAlignLeft
														}
														onChange={
															handleWorkTypeChange
														}
													>
														{workTypeList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>
												<Grid
													item
													xs={12}
													style={{
														margin: '25px 0',
														border:
															'1px solid #eee',
														padding: '20px'
													}}
												>
													<FormLabel component="legend">
														Satelit Hotspot *
													</FormLabel>
													<FormGroup>
														{satelite.map(
															(option, index) => {
																return (
																	<FormControlLabel
																		key={
																			index
																		}
																		control={
																			<Checkbox
																				key={
																					index
																				}
																				onChange={() => {
																					console.log(
																						option
																					)
																					handleClickCheckbox(
																						'satelite_hotspot',
																						index
																					)
																				}}
																				checked={
																					option.checked
																				}
																			/>
																		}
																		value={
																			option.id
																		}
																		label={
																			option.text
																		}
																	/>
																)
															}
														)}
													</FormGroup>
												</Grid>
												<Grid
													item
													xs={12}
													style={{
														margin: '25px 0',
														border:
															'1px solid #eee',
														padding: '20px'
													}}
												>
													<FormLabel component="legend">
														Inventory Patroli *
													</FormLabel>
													<FormGroup>
														{inventory.map(
															(option, index) => {
																return (
																	<FormControlLabel
																		key={
																			index
																		}
																		control={
																			<Checkbox
																				key={
																					index
																				}
																				onChange={() => {
																					console.log(
																						option
																					)
																					handleClickCheckbox(
																						'inventory',
																						index
																					)
																				}}
																				checked={
																					option.checked
																				}
																			/>
																		}
																		value={
																			option.id
																		}
																		label={
																			option.text
																		}
																	/>
																)
															}
														)}
													</FormGroup>
												</Grid>
											</Grid>

											<Grid
												item
												xs={6}
												style={{
													margin: '25px 0',
													border: '1px solid #eee',
													padding: '20px'
												}}
											>
												{/* <Grid
													item
													xs={12}
													style={{
														margin: '25px 0',
														border:
															'1px solid #eee',
														padding: '20px'
													}}
												>
													<FormLabel component="legend">
														Anggota Patroli *
													</FormLabel>
													<FormGroup>
														<FormControlLabel
															control={
																<Checkbox />
															}
															label="Imas Sukesih Sitanggang (Ketua Manggal Agni)"
														/>
														<FormControlLabel
															control={
																<Checkbox
																	defaultChecked
																/>
															}
															label="Lailan Syaufina (MPA)"
														/>
													</FormGroup>
												</Grid> */}

												<Grid
													item
													xs={12}
													style={{
														margin: '25px 0',
														border:
															'1px solid #eee',
														padding: '20px'
													}}
												>
													<FormLabel component="legend">
														Aktivitas Harian *
													</FormLabel>
													<FormGroup>
														{daily_activity.map(
															(option, index) => {
																return (
																	<FormControlLabel
																		key={
																			index
																		}
																		control={
																			<Checkbox
																				key={
																					index
																				}
																				onChange={() => {
																					console.log(
																						option
																					)
																					handleClickCheckbox(
																						'activity',
																						index
																					)
																				}}
																				checked={
																					option.checked
																				}
																			/>
																		}
																		value={
																			option.id
																		}
																		label={
																			option.text
																		}
																	/>
																)
															}
														)}
													</FormGroup>
												</Grid>
											</Grid>
										</Grid>
									</TabPanel>
									<TabPanel value="2">
										<Grid
											container
											justify="center"
											spacing={2}
										>
											<Grid
												item
												xs={6}
												style={{
													margin: '25px 0',
													border: '1px solid #eee',
													padding: '20px'
												}}
											>
												<Grid
													item
													sm={12}
													style={{ margin: '30px 0' }}
												>
													<FormLabel component="legend">
														Kondisi Umum Lokasi
														Patroli
													</FormLabel>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="
													Latitude (dalam format desimal)"
														type="text"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														fullWidth
														name="latitude"
														className={
															classes.textAlignLeft
														}
														value={latitude}
														onChange={HandleInputChange(
															'latitude'
														)}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="
													Longitude (dalam format desimal)"
														type="text"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="longitude"
														className={
															classes.textAlignLeft
														}
														value={longitude}
														onChange={HandleInputChange(
															'longitude'
														)}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="Desa/Kelurahan"
														type="text"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="desa"
														className={
															classes.textAlignLeft
														}
														value={desa}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="Kecamatan"
														type="text"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="kecamatan"
														className={
															classes.textAlignLeft
														}
														value={kecamatan}
														onChange={HandleInputChange(
															'desa'
														)}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="Kabupaten/Kota"
														type="text"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="kabupaten"
														className={
															classes.textAlignLeft
														}
														value={kabupaten}
														onChange={HandleInputChange(
															'kabupaten'
														)}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="Provinsi"
														type="text"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="Provinsi"
														className={
															classes.textAlignLeft
														}
														value={provinsi}
														onChange={HandleInputChange(
															'provinsi'
														)}
													/>
												</Grid>
												<Grid
													item
													sm={12}
													style={{ margin: '30px 0' }}
												>
													<FormLabel component="legend">
														Data Patroli lainnya
													</FormLabel>
												</Grid>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="Kondisi Lapangan"
														InputLabelProps={{
															shrink: true
														}}
														defaultValue=""
														variant="outlined"
														required
														fullWidth
														name="kondisi"
														value={kondisiKarhutla}
														className={
															classes.textAlignLeft
														}
														onChange={
															handleKondisiKarhutlaChange
														}
													>
														{kondisiKarhutlaList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="Potensi Karhutla"
														InputLabelProps={{
															shrink: true
														}}
														defaultValue=""
														variant="outlined"
														required
														fullWidth
														name="potensi"
														value={potensiKarhutla}
														className={
															classes.textAlignLeft
														}
														onChange={
															handlePotensiKarhutlaChange
														}
													>
														{potensiKarhutlaList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="FFCM KKAS"
														InputLabelProps={{
															shrink: true
														}}
														defaultValue=""
														variant="outlined"
														required
														fullWidth
														name="ffcm"
														value={ffmc}
														className={
															classes.textAlignLeft
														}
														onChange={
															handlePotensiKarhutlaChange
														}
													>
														{potensiKarhutlaList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="FWI ICK"
														InputLabelProps={{
															shrink: true
														}}
														defaultValue=""
														variant="outlined"
														required
														fullWidth
														name="fwi"
														value={fwi}
														className={
															classes.textAlignLeft
														}
														onChange={
															handlePotensiKarhutlaChange
														}
													>
														{potensiKarhutlaList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="DC KK"
														InputLabelProps={{
															shrink: true
														}}
														defaultValue=""
														variant="outlined"
														required
														fullWidth
														name="dc"
														value={dc}
														className={
															classes.textAlignLeft
														}
														onChange={
															handlePotensiKarhutlaChange
														}
													>
														{potensiKarhutlaList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="Aktivitas Masyarakat"
														InputLabelProps={{
															shrink: true
														}}
														defaultValue=""
														variant="outlined"
														required
														fullWidth
														name="masyarakat"
														value={
															aktivitasMasyarakat
														}
														className={
															classes.textAlignLeft
														}
														onChange={
															handleAktivitasKarhutlaChange
														}
													>
														{aktivitasMasyarakatList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>
											</Grid>
											<Grid
												item
												xs={6}
												style={{
													margin: '25px 0',
													border: '1px solid #eee',
													padding: '20px'
												}}
											>
												<Grid
													item
													sm={12}
													style={{ margin: '30px 0' }}
												>
													<FormLabel component="legend">
														Kondisi Cuaca
													</FormLabel>
												</Grid>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="Cuaca Pagi"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="cuaca_pagi"
														value={cuaca_pagi}
														className={
															classes.textAlignLeft
														}
														onChange={
															handleCuacaPagiChange
														}
													>
														{cuacaList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>

												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="Cuaca Siang"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="cuaca_siang"
														value={cuaca_siang}
														className={
															classes.textAlignLeft
														}
														onChange={
															handleCuacaSiangChange
														}
													>
														{cuacaList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>
												<Grid item xs={12}>
													<TextField
														id="outlined-number"
														select
														margin="normal"
														label="Cuaca Sore"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="cuaca_sore"
														value={cuaca_sore}
														className={
															classes.textAlignLeft
														}
														onChange={
															handleCuacaSoreChange
														}
													>
														{cuacaList.map(
															(option, index) => (
																<MenuItem
																	key={index}
																	value={
																		option.id
																	}
																>
																	{
																		option.text
																	}
																</MenuItem>
															)
														)}
													</TextField>
												</Grid>

												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="Curah Hujan (mm)"
														type="number"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="curah_hujan"
														className={
															classes.textAlignLeft
														}
														value={curah_hujan}
														onChange={HandleInputChange(
															'curah_hujan'
														)}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="Suhu (Celcius)"
														type="number"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="suhu"
														className={
															classes.textAlignLeft
														}
														value={suhu}
														onChange={HandleInputChange(
															'suhu'
														)}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="Kelembaban (0%-100% RH)"
														type="number"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="kelembaban"
														className={
															classes.textAlignLeft
														}
														value={kelembaban}
														onChange={HandleInputChange(
															'kelembaban'
														)}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														id="outlined-number"
														margin="normal"
														label="Kecepatan Angin (Km/jam)"
														type="number"
														InputLabelProps={{
															shrink: true
														}}
														variant="outlined"
														required
														fullWidth
														name="angin"
														className={
															classes.textAlignLeft
														}
														value={kecepatan_angin}
														onChange={HandleInputChange(
															'kecepatan_angin'
														)}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														type="hidden"
														name="laporan_id"
														value={laporan_id}
													/>
												</Grid>
												<Grid item sm={12}>
													<TextField
														type="hidden"
														name="tanggal_laporan"
														value={tanggal_laporan}
													/>
												</Grid>
												<Grid
													item
													sm={12}
													style={{ margin: '30px 0' }}
												>
													<FormLabel component="legend">
														Aksesibilitas *
													</FormLabel>
												</Grid>
												<Grid
													item
													xs={12}
													style={{
														margin: '25px 0',
														border:
															'1px solid #eee',
														padding: '20px'
													}}
												>
													<FormGroup>
														{aksesibilitas.map(
															(option, index) => {
																return (
																	<FormControlLabel
																		key={
																			index
																		}
																		control={
																			<Checkbox
																				key={
																					index
																				}
																				onChange={() => {
																					console.log(
																						option
																					)
																					handleClickCheckbox(
																						'aksesibilitas',
																						index
																					)
																				}}
																				checked={
																					option.checked
																				}
																			/>
																		}
																		value={
																			option.id
																		}
																		label={
																			option.text
																		}
																	/>
																)
															}
														)}
													</FormGroup>
												</Grid>
											</Grid>
										</Grid>
									</TabPanel>
									<TabPanel value="3"></TabPanel>
								</TabContext>
							</Box>
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
									fullWidth
									onClick={handleFormSubmit}
								>
									Ubah Data Laporan
								</Button>
							)}
						</Grid>
					</Grid>
				</form>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(UbahLaporanPage)
