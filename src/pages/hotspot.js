import { CircularProgress, Grid, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import moment from 'moment'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import styles from '../assets/jss/nextjs-material-kit/pages/hotspot.page.style'
import SiteLayout from '../components/Layout/SiteLayout'
import Loader from '../components/Loader/Loader'
import Map from '../components/Map/MapHotspot'
import useAuth, { ProtectRoute } from '../context/auth'
import HotspotService from '../services/hotspot.service'

const useStyles = makeStyles(styles)

function HotspotPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [hotspot, setHotspot] = useState([])
	const [date, setDate] = useState(moment())
	const { data, isValidating } = useSWR(
		isAuthenticated
			? `/public/api/hotspot-sipongi/date-range?start_date=
			${date.format('D-MM-YYYY')}
			&end_date=${date.format('D-MM-YYYY')}&provinsi=a`
			: null,
		HotspotService.getHotspot
	)
	useEffect(() => {
		if (data) {
			setHotspot(data)
			setDate(moment())
		}
	}, [data])

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
					<h2>
						<Icon className={classes.icon} color={'error'}>
							fiber_manual_record
						</Icon>
						SIPONGI Live Update
					</h2>
					<Grid container>
						<Grid item xs={12}>
							<h3>
								Tanggal: {date.format('D MMMM YYYY')}
								<br />
								Pukul: {date.format('HH:mm')}
							</h3>
						</Grid>
						<Grid item xs={12} md={4}>
							<h2>Titik Panas</h2>
							{isValidating ? (
								<CircularProgress />
							) : (
								<h3>{hotspot.length}</h3>
							)}
						</Grid>
						<Grid item xs={12} md={4}>
							<h2>Rentang Data</h2>
							<h3>24h</h3>
						</Grid>
						<Grid item xs={12} md={4}>
							<h2>Confidence Level</h2>
							<h3>80%</h3>
						</Grid>
					</Grid>
					<Map
						center={{
							lat: -1.5,
							lng: 117.384
						}}
						zoom={5.1}
						hotspots={hotspot}
					/>
				</div>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(HotspotPage)
