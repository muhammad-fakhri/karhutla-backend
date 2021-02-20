import styles from '@asset/jss/nextjs-material-kit/pages/create-update-posko.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { DaopsData, RegionData } from '@interface'
import {
	Button,
	CircularProgress,
	Divider,
	Grid,
	MenuItem,
	Paper,
	TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Alert from '@material-ui/lab/Alert'
import {
	getAllDaops,
	getAllKecamatan,
	getDetailPosko,
	updatePosko
} from '@service'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'

const useStyles = makeStyles(styles)

const column = [
	{
		title: 'Kecamatan',
		field: 'name'
	}
]

function UbahPoskoPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { poskoId } = router.query
	const [loading, setLoading] = useState(false)
	const [daopsOptionData, setDaopsOptionData] = useState<DaopsData[]>([])
	const [kecamatan, setKecamatan] = useState<RegionData[]>([])
	const [values, setValues] = useState({
		id: '',
		oldName: '',
		name: '',
		daops: '',
		loading: true,
		kecamatan: '',
		alertMessage: '',
		showTextfield: false,
		textfieldValue: '',
		showAlert: false
	})
	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		const result = await updatePosko(values, values.oldName)
		if (result.success)
			router.push('/wilayah/posko?message=Data posko berhasil diubah')
		else {
			setValues({
				...values,
				showAlert: true,
				alertMessage: result.message as string
			})
		}
		setLoading(false)
	}
	useEffect(() => {
		const setOptionData = async () => {
			const daops = await getAllDaops()
			const kecamatan = await getAllKecamatan()
			setDaopsOptionData(daops)
			setKecamatan(kecamatan)
			if (poskoId) {
				const posko = await getDetailPosko(poskoId as string)
				if (posko) {
					setValues({
						...values,
						id: posko.id,
						oldName: posko.name,
						name: posko.name,
						daops: posko.daopsId,
						loading: false,
						kecamatan: posko.kecamatanId,
						showTextfield: true,
						textfieldValue: posko.kecamatan
					})
				}
			}
		}
		if (isAuthenticated) setOptionData()
	}, [isAuthenticated])

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
				<h2>Ubah Posko</h2>
				<form noValidate autoComplete="off">
					{values.showAlert ? (
						<Grid container justify="center" spacing={2}>
							<Grid item xs={10} md={8}>
								<Alert
									severity="warning"
									onClose={() =>
										setValues({
											...values,
											showAlert: false
										})
									}
								>
									{values.alertMessage}
								</Alert>
							</Grid>
						</Grid>
					) : null}
					{values.loading ? (
						<CircularProgress />
					) : (
						<>
							<Grid container justify="center" spacing={2}>
								<Grid item xs={10} md={4}>
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
								</Grid>
								<Grid item xs={10} md={4}>
									<TextField
										id="daops"
										label="Daops"
										variant="outlined"
										fullWidth
										margin="normal"
										select
										required
										className={classes.textAlignLeft}
										onChange={handleChange('daops')}
										value={values.daops}
									>
										{daopsOptionData.map((option) => (
											<MenuItem
												key={option.code}
												value={option.id}
											>
												{option.name}
											</MenuItem>
										))}
									</TextField>
								</Grid>
							</Grid>
							<Grid container justify="center" spacing={2}>
								{values.showTextfield ? (
									<Grid item xs={10} md={4}>
										<TextField
											id="kecamatan"
											label="Kecamatan"
											variant="outlined"
											fullWidth
											disabled
											margin="normal"
											required
											className={classes.textAlignLeft}
											value={values.textfieldValue}
										/>
										<Button
											size="small"
											variant="contained"
											onClick={() => {
												setValues({
													...values,
													kecamatan: '',
													textfieldValue: '',
													showTextfield: false
												})
											}}
										>
											Ganti Kecamatan
										</Button>
									</Grid>
								) : (
									<Grid item xs={10} md={8}>
										<Divider />
										<h3>Pilih Kecamatan</h3>
										<MaterialTable
											title=""
											columns={column}
											components={{
												Container: (props) => (
													<Paper
														{...props}
														elevation={0}
													/>
												)
											}}
											data={kecamatan}
											options={{
												search: true,
												actionsColumnIndex: -1
											}}
											localization={{
												header: { actions: 'Aksi' }
											}}
											actions={[
												{
													icon: AddBoxIcon,
													tooltip: 'Pilih kecamatan',
													onClick: (
														event,
														rowData
													) => {
														const singleRowData = rowData as RegionData
														setValues({
															...values,
															kecamatan:
																singleRowData.id,
															textfieldValue:
																singleRowData.name,
															showTextfield: true
														})
													}
												}
											]}
										/>
									</Grid>
								)}
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
											Ubah Posko
										</Button>
									)}
								</Grid>
							</Grid>
						</>
					)}
				</form>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(UbahPoskoPage, false, true)
