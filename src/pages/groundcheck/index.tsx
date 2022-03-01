import styles from '@asset/jss/nextjs-material-kit/pages/groundcheck/groundcheck.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import GridItem from '@component/Grid/GridItem'
import { SuratTugasData, UserGroundcheckData } from '@interface'
import { Button, CircularProgress, Paper, Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import LaunchIcon from '@material-ui/icons/Launch'
import { deleteUserGroundcheck, getUserGroundcheck } from '@service'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useStyles = makeStyles(styles)

const columns = [
	{ title: 'Nama', field: 'nama' },
	{ title: 'Email', field: 'email' },
	{ title: 'Tanggal', field: 'tanggal' },
	{ title: 'Daerah Operasi', field: 'daops' }
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

function GroundCheckPage() {
	const classes = useStyles()
	const router = useRouter()
	const { isAuthenticated, user } = useAuth()
	const [groundcheck, setGroundcheck] = useState<UserGroundcheckData[]>([])
	const [showAlert, setShowAlert] = useState(false)
	const [show, setShow] = useState(false)
	const [showCheck, setShowCheck] = useState(false)
	const [alertSuccess, setAlertSuccess] = useState(true)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchData = async () => {
			const data = await getUserGroundcheck()
			setGroundcheck(data)
			setLoading(false)
		}
		if (isAuthenticated) fetchData()
	}, [isAuthenticated])

	const [alertType, setAlertType] = useState<
		'success' | 'info' | 'warning' | 'error'
	>('success')
	const [alertMessage, setAlertMessage] = useState('')
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
				<h2>Daftar Pengguna Modul Ground Check Titik Panas</h2>

				<Grid container justify="center">
					<GridItem sm={6} xs={10}>
						{showCheck ? (
							<Alert
								severity={alertSuccess ? 'success' : 'error'}
								style={{ margin: '0 0 40px 0' }}
								variant="filled"
								onClose={() => {
									setShowCheck(false)
								}}
								hidden={true}
							>
								{alertMessage}
							</Alert>
						) : null}
					</GridItem>
				</Grid>

				<>
					<Link href="groundcheck/tambah">
						<Button
							variant="contained"
							color="primary"
							size="large"
							className={classes.addButton}
							startIcon={<AddBoxIcon />}
						>
							Tambah Pengguna
						</Button>
					</Link>
					<br />
				</>
				{loading ? (
					<CircularProgress />
				) : (
					<MaterialTable
						title=""
						columns={columns}
						data={groundcheck}
						options={{
							search: true,
							actionsColumnIndex: -1
						}}
						components={{
							Container: (props) => (
								<Paper {...props} elevation={0} />
							)
						}}
						actions={[
							{
								icon: LaunchIcon,
								tooltip: 'Buka Detail User Ground Check',
								onClick: (event, rowData) => {
									event.preventDefault()
									const groundcheckRowData = rowData as UserGroundcheckData
									router.push(
										`/groundcheck/ubah/${groundcheckRowData.id}`
									)
								}
							}
						]}
						localization={{
							header: { actions: 'Aksi' },
							body: {
								editRow: {
									deleteText:
										'Apakah Anda yakin ingin menghapus user tersebut?'
								}
							}
						}}
						editable={{
							onRowDelete: (oldData) =>
								new Promise<void>((resolve, reject) => {
									deleteUserGroundcheck(oldData).then(
										(result) => {
											if (result.success) {
												const dataDelete = [
													...groundcheck
												]
												const userRowData: any = oldData
												const index =
													userRowData.tableData.id
												dataDelete.splice(index, 1)
												setGroundcheck(dataDelete)
												setAlertSuccess(true)
												setAlertMessage(
													'Hapus data user ground check berhasil'
												)
												setShowCheck(true)
												resolve()
											} else {
												setAlertType('error')
												setAlertSuccess(false)
												setAlertMessage(
													result.message as string
												)
												setShowCheck(true)
												resolve()
											}
										}
									)
								})
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(GroundCheckPage)
