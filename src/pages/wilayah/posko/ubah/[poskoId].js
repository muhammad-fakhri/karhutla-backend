import { useRouter } from 'next/router'
import {
	CircularProgress,
	IconButton,
	TextField,
	Grid,
	Dialog,
	Typography,
	MenuItem,
	Box,
	Divider,
	Button,
	Paper
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import AddBoxIcon from '@material-ui/icons/AddBox'
import MaterialTable from 'material-table'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import SiteLayout from '../../../../components/Layout/SiteLayout'
import CustomButton from '../../../../components/CustomButtons/Button'
import Loader from '../../../../components/Loader/Loader'
import classNames from 'classnames'
import styles from '../../../../assets/jss/nextjs-material-kit/pages/createPoskoPage'
import { makeStyles } from '@material-ui/core/styles'
import useAuth, { ProtectRoute } from '../../../../context/auth'
import PoskoService from '../../../../services/posko.service'
import DaopsService from '../../../../services/daops.service'
import WilayahService from '../../../../services/wilayah.service'
const useStyles = makeStyles(styles)

const DialogTitle = (props) => {
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

const column = [
	{
		title: 'Kecamatan',
		field: 'name'
	}
]

function UbahPoskoPage(props) {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { poskoId } = router.query
	const [loading, setLoading] = React.useState(false)
	const [daopsOptionData, setDaopsOptionData] = React.useState([])
	const [kecamatan, setKecamatan] = React.useState([])
	const [values, setValues] = React.useState({
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
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		let result = await PoskoService.updatePosko(values, values.oldName)
		if (result.success)
			router.push(`/wilayah/posko?message=Data posko berhasil diubah`)
		else {
			setValues({
				...values,
				showAlert: true,
				alertMessage: result.message[0]
			})
		}
		setLoading(false)
	}
	React.useEffect(() => {
		const setOptionData = async () => {
			const daops = await DaopsService.getAllDaops()
			const kecamatan = await WilayahService.getAllKecamatan()
			const posko = await PoskoService.getDetailPosko(poskoId)
			setDaopsOptionData(daops)
			setKecamatan(kecamatan)
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
														setValues({
															...values,
															kecamatan:
																rowData.id,
															textfieldValue:
																rowData.name,
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
										<CustomButton
											variant="contained"
											color="primary"
											onClick={handleFormSubmit}
											fullWidth
										>
											Ubah Posko
										</CustomButton>
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

export default ProtectRoute(UbahPoskoPage)
