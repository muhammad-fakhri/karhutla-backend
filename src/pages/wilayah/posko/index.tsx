import styles from '@asset/jss/nextjs-material-kit/pages/posko.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import NavBtnGroup from '@component/NavBtnGroup'
import useAuth, { ProtectRoute } from '@context/auth'
import { PoskoData } from '@interface'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { Alert } from '@material-ui/lab'
import { deletePosko, getAllPosko } from '@service'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useStyles = makeStyles(styles)
const column = [
	{ title: 'Posko', field: 'name' },
	{ title: 'Daops', field: 'daops' },
	{
		title: 'Kecamatan',
		field: 'kecamatan'
	}
]

function PoskoPage() {
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { message } = router.query
	const classes = useStyles()
	const [posko, setPosko] = useState<PoskoData[]>([])
	const [loading, setLoading] = useState(true)
	const [showAlert, setShowAlert] = useState(false)
	const [alertType, setAlertType] = useState<
		'info' | 'success' | 'error' | 'warning' | undefined
	>('success')
	const [alertMessage, setAlertMessage] = useState('')
	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllPosko()
			setPosko(data)
			setLoading(false)
		}
		if (message) {
			setAlertMessage(message as string)
			setAlertType('success')
			setShowAlert(true)
		}
		if (isAuthenticated) fetchData()
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
				<h2>Data Posko</h2>
				{showAlert ? (
					<Alert
						severity={alertType}
						onClose={() => setShowAlert(false)}
						className={classes.alert}
					>
						{alertMessage}
					</Alert>
				) : null}
				<NavBtnGroup page="posko" />
				{loading ? (
					<CircularProgress />
				) : (
					<MaterialTable
						title=""
						columns={column}
						components={{
							Container: (props) => (
								<Paper {...props} elevation={0} />
							)
						}}
						data={posko}
						options={{
							search: true,
							actionsColumnIndex: -1,
							addRowPosition: 'first'
						}}
						localization={{
							body: {
								editRow: {
									deleteText: 'Yakin hapus data ini ?'
								},
								deleteTooltip: 'Hapus data posko'
							},
							header: { actions: 'Aksi' }
						}}
						actions={[
							{
								icon: AddBoxIcon,
								tooltip: 'Tambah data posko',
								isFreeAction: true,
								onClick: () =>
									router.push('/wilayah/posko/tambah')
							},
							{
								icon: 'edit',
								tooltip: 'Ubah data posko',
								onClick: (event, rowData) => {
									const singleRowData = rowData as PoskoData
									router.push(
										`/wilayah/posko/ubah/${singleRowData.id}`
									)
								}
							}
						]}
						editable={{
							onRowDelete: (oldData) =>
								new Promise<void>((resolve, reject) => {
									deletePosko(oldData).then((result) => {
										if (result.success) {
											const dataDelete = [...posko]
											const oldRowData: any = oldData
											const index =
												oldRowData.tableData.id
											dataDelete.splice(index, 1)
											setPosko(dataDelete)
											setAlertType('success')
											setAlertMessage(
												'Hapus data posko berhasil'
											)
											setShowAlert(true)
											resolve()
										} else {
											setAlertType('error')
											setAlertMessage(
												result.message as string
											)
											setShowAlert(true)
											reject()
										}
									})
								})
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PoskoPage, false, true)
