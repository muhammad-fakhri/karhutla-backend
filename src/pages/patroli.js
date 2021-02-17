import {
	CircularProgress,
	Divider,
	FormControl,
	Grid,
	Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Datetime from 'react-datetime'
import styles from '../assets/jss/nextjs-material-kit/pages/patrol.page.style'
import SiteLayout from '../components/Layout/SiteLayout'
import Loader from '../components/Loader/Loader'
import MapContainer from '../components/Map/MapPatroli'
import useAuth, { ProtectRoute } from '../context/auth'
import PatroliService from '../services/patroli.service'

const useStyles = makeStyles(styles)

const column = [
	{ title: 'Tanggal', field: 'patrolDate' },
	{ title: 'Daerah Operasi', field: 'operationRegion' },
	{ title: 'Daerah Patroli', field: 'patrolRegion' }
]

function PatroliPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [loading, setLoading] = useState(true)
	const [date, setDate] = useState(moment())
	const [mandiriCounter, setMandiriCounter] = useState(0)
	const [rutinCounter, setRutinCounter] = useState(0)
	const [terpaduCounter, setTerpaduCounter] = useState(0)
	const [terpadu, setTerpadu] = useState()
	const [mandiri, setMandiri] = useState()
	const [rutin, setRutin] = useState()
	const [spots, setSpots] = useState()
	useEffect(() => {
		const updatePatroli = async () => {
			const patroliData = await PatroliService.getPatroli(
				date.format('D-M-YYYY')
			)
			setSpots(patroliData.patroliSpots)
			setMandiriCounter(patroliData.counter.mandiri)
			setRutinCounter(patroliData.counter.rutin)
			setTerpaduCounter(patroliData.counter.terpadu)
			setTerpadu(patroliData.patroliTerpadu)
			setMandiri(patroliData.patroliMandiri)
			setRutin(patroliData.patroliRutin)
			setLoading(false)
		}
		if (isAuthenticated) updatePatroli()
	}, [date, isAuthenticated])

	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout headerColor="info">
			<div>
				<div
					className={classNames(
						classes.main,
						classes.mainRaised,
						classes.textCenter
					)}
				>
					<h2>Sebaran Data Patroli Karhutla</h2>
					<MapContainer
						center={{
							lat: -1.5,
							lng: 117.384
						}}
						zoom={5.1}
						spots={spots}
						isLoggedin={isAuthenticated}
					/>
					<Grid container justify="center">
						<Grid item xs={12}>
							<h3>
								Tanggal: {date.format('D MMMM YYYY')}
								<br />
								<FormControl
									className={classNames(
										classes.formChooseDate,
										classes.textCenter
									)}
								>
									<Datetime
										timeFormat={false}
										inputProps={{
											placeholder:
												'Pilih tanggal patroli ...'
										}}
										onChange={(date) => {
											setDate(date)
											setLoading(true)
										}}
										closeOnSelect={true}
										locale="id"
									/>
								</FormControl>
							</h3>
						</Grid>
						<Grid item xs={12} md={4}>
							<h2 className={classes.mandiriBg}>
								Patroli Mandiri
							</h2>
							{loading ? (
								<CircularProgress />
							) : (
								<h3>{mandiriCounter}</h3>
							)}
						</Grid>
						<Grid item xs={12} md={4}>
							<h2 className={classes.pencegahanBg}>
								Patroli Rutin
							</h2>
							{loading ? (
								<CircularProgress />
							) : (
								<h3>{rutinCounter}</h3>
							)}
						</Grid>
						<Grid item xs={12} md={4}>
							<h2 className={classes.terpaduBg}>
								Patroli Terpadu
							</h2>
							{loading ? (
								<CircularProgress />
							) : (
								<h3>{terpaduCounter}</h3>
							)}
						</Grid>
						<Grid item xs={12} className={classes.divider}>
							<Divider variant="middle" />
						</Grid>
						<Grid item xs={12} className={classes.table}>
							<h3>Data Patroli Mandiri</h3>
							<MaterialTable
								title=""
								components={{
									Container: (props) => (
										<Paper {...props} elevation={0} />
									)
								}}
								columns={column}
								data={mandiri}
								options={{
									search: true,
									actionsColumnIndex: -1
								}}
								style={{
									textTransform: 'capitalize'
								}}
								localization={{
									header: { actions: 'Aksi' }
								}}
								actions={[
									{
										icon: CloudDownloadIcon,
										tooltip: 'Download Laporan',
										onClick: (e, rowData) =>
											window.open(rowData.reportLink)
									}
								]}
							/>
						</Grid>
						<Grid item xs={12} className={classes.table}>
							<h3>Data Patroli Rutin</h3>
							<MaterialTable
								title=""
								components={{
									Container: (props) => (
										<Paper {...props} elevation={0} />
									)
								}}
								columns={column}
								data={rutin}
								options={{
									search: true,
									actionsColumnIndex: -1
								}}
								localization={{
									header: { actions: 'Aksi' }
								}}
								actions={[
									{
										icon: CloudDownloadIcon,
										tooltip: 'Download Laporan',
										onClick: (e, rowData) =>
											window.open(rowData.reportLink)
									}
								]}
							/>
						</Grid>
						<Grid item xs={12} className={classes.table}>
							<h3>Data Patroli Terpadu</h3>
							<MaterialTable
								title=""
								components={{
									Container: (props) => (
										<Paper {...props} elevation={0} />
									)
								}}
								columns={column}
								data={terpadu}
								options={{
									search: true,
									actionsColumnIndex: -1
								}}
								localization={{
									header: { actions: 'Aksi' }
								}}
								actions={[
									{
										icon: CloudDownloadIcon,
										tooltip: 'Download Laporan',
										onClick: (e, rowData) =>
											window.open(rowData.reportLink)
									}
								]}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PatroliPage)
