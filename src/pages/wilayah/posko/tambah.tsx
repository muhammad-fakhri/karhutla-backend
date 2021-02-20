import styles from '@asset/jss/nextjs-material-kit/pages/create-update-posko.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { DaopsData, RegionData } from '@interface'
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	Divider,
	Grid,
	IconButton,
	MenuItem,
	Paper,
	TextField,
	Typography
} from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import CloseIcon from '@material-ui/icons/Close'
import { addPosko, getAllDaops, getAllKecamatan } from '@service'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

const useStyles = makeStyles(styles)

type DialogTitlePropType = {
	children: ReactNode
	classes: Record<any, string>
	onClose: () => void
	id: string
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

const column = [
	{
		title: 'Kecamatan',
		field: 'name'
	}
]

function TambahPoskoPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [daopsOptionData, setDaopsOptionData] = useState<DaopsData[]>([])
	const [kecamatan, setKecamatan] = useState<RegionData[]>([])
	const [values, setValues] = useState({
		name: '',
		daops: '',
		kecamatan: '',
		errorMessage: '',
		showTextfield: false,
		textfieldValue: '',
		showDialog: false,
		successDialog: true
	})
	const handleChange = (prop: string) => (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setValues({ ...values, [prop]: event.target.value })
	}
	const handleFormSubmit = async () => {
		setLoading(true)
		const result = await addPosko(values)
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
			daops: '',
			kecamatan: '',
			showDialog: false,
			errorMessage: '',
			showTextfield: false,
			textfieldValue: ''
		})
	}
	const closeDialog = () => {
		if (values.successDialog) resetForm()
		else setValues({ ...values, showDialog: false })
	}
	useEffect(() => {
		const setOptionData = async () => {
			const daops = await getAllDaops()
			const kecamatan = await getAllKecamatan()
			setDaopsOptionData(daops)
			setKecamatan(kecamatan)
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
				<h2>Tambah Posko</h2>
				<form noValidate autoComplete="off">
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
											<Paper {...props} elevation={0} />
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
											onClick: (event, rowData) => {
												const singleRowData = rowData as RegionData
												setValues({
													...values,
													kecamatan: singleRowData.id,
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
									size="large"
								>
									Tambah Posko
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
							? 'Tambah Posko Berhasil'
							: 'Tambah Posko Gagal'}
					</DialogTitle>
					<MuiDialogContent dividers>
						<Box component="div" textAlign="center">
							{values.successDialog ? (
								<>
									<Button
										variant="contained"
										color="primary"
										onClick={resetForm}
										size="large"
										className={classes.dialogButton}
									>
										Tambah Posko Lagi
									</Button>
									<br />
									<Button
										variant="contained"
										color="primary"
										onClick={(event) => {
											event.preventDefault()
											router.push('/wilayah/posko')
										}}
										size="large"
									>
										Kembali ke Halaman Data Posko
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

export default ProtectRoute(TambahPoskoPage, false, true)
