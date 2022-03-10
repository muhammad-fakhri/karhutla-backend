import forestFireImage from '@asset/img/forest-fire.jpg'
import styles from '@asset/jss/nextjs-material-kit/pages/front.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import MapContainer from '@component/Map/MapPatroli'
import Parallax from '@component/Parallax/Parallax'
import useAuth from '@context/auth'
import { PatrolData } from '@interface'
import { CircularProgress, FormControl, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getPatroli } from '@service'
import classNames from 'classnames'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Datetime from 'react-datetime'

const useStyles = makeStyles(styles)

export default function FrontPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [date, setDate] = useState(moment())
	const [loading, setLoading] = useState(true)
	const [mandiri, setMandiri] = useState(0)
	const [rutin, setRutin] = useState(0)
	const [terpadu, setTerpadu] = useState(0)
	const [spots, setSpots] = useState<PatrolData[]>([])

	useEffect(() => {
		const updatePatroli = async () => {
			const patroliData = await getPatroli(date.format('D-M-YYYY'))
			setSpots(patroliData.patroliSpots)
			setMandiri(patroliData.counter.mandiri)
			setRutin(patroliData.counter.rutin)
			setTerpadu(patroliData.counter.terpadu)
			setLoading(false)
		}
		updatePatroli()
	}, [date])

	return (
		<SiteLayout scrollChange={true}>
			<div>
				<Parallax image={forestFireImage}>
					<div className={classes.container}>
						<Grid container>
							<Grid item>
								<div className={classes.brand}>
									<h1 className={classes.title}>
										SIPP Karhutla
									</h1>
									<h3 className={classes.subtitle}>
										Sistem Informasi Patroli Pencegahan
										Kebakaran Hutan dan Lahan
									</h3>
								</div>
							</Grid>
						</Grid>
					</div>
				</Parallax>
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
								Tanggal:{' '}
								{moment(date)
									.locale('id')
									.format('D MMMM YYYY')}
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
											console.log(moment(date))
											setDate(moment(date))
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
								<h3>{mandiri}</h3>
							)}
						</Grid>
						<Grid item xs={12} md={4}>
							<h2 className={classes.pencegahanBg}>
								Patroli Rutin
							</h2>
							{loading ? <CircularProgress /> : <h3>{rutin}</h3>}
						</Grid>
						<Grid item xs={12} md={4}>
							<h2 className={classes.terpaduBg}>
								Patroli Terpadu
							</h2>
							{loading ? (
								<CircularProgress />
							) : (
								<h3>{terpadu}</h3>
							)}
						</Grid>
						<Grid item xs={12} md={12}>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
							<br></br>
						</Grid>
					</Grid>
				</div>
			</div>
		</SiteLayout>
	)
}
