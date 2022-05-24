import styles from '@asset/jss/nextjs-material-kit/pages/hotspot.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import Map from '@component/Map/MapHotspot'
import useAuth, { ProtectRoute } from '@context/auth'
import { HotspotItem } from '@interface'
import {
	CircularProgress,
	Grid,
	Icon,
	TextField,
	MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getHotspot } from '@service'
import classNames from 'classnames'
import moment from 'moment'
import { ChangeEvent, useState } from 'react'
import { useEffect } from 'react'
import useSWR from 'swr'

const useStyles = makeStyles(styles)

function HotspotPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [hotspot, setHotspot] = useState<HotspotItem[]>([])
	const [date, setDate] = useState(moment())
	const [isValidating, setValidating] = useState(true)
	const [sateliteType, setSateliteType] = useState('NASA')
	// useEffect(() => {
	// 	console.log(data)
	// 	console.log(hotspot)
	// 	if (data) {
	// 		data.length > 0 ? setHotspot(data) : setHotspot([])
	// 		setDate(moment())
	// 	}
	// }, [data])

	useEffect(() => {
		setValidating(true)
		const fetchData = async () => {
			const data = await getHotspot('/forward')
			const new_data = data.filter((val) => {
				if (sateliteType != 'SEMUA') {
					return val?.sat?.includes(sateliteType)
				} else {
					return val
				}
			})
			setHotspot(new_data)
			setValidating(false)
		}

		if (isAuthenticated) fetchData()
	}, [isAuthenticated, sateliteType])

	const handleSateliteTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSateliteType(event.target.value)
	}

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
						<Icon color={'error'}>fiber_manual_record</Icon>
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
						<Grid item sm={12} md={4}>
							<TextField
								id="outlined-number"
								select
								margin="normal"
								label="Satelit"
								InputLabelProps={{
									shrink: true
								}}
								variant="outlined"
								fullWidth
								name="type"
								onChange={handleSateliteTypeChange}
								value={sateliteType}
							>
								<MenuItem key="SEMUA" value="SEMUA">
									SEMUA SATELIT
								</MenuItem>
								<MenuItem key="NASA" value="NASA">
									NASA
								</MenuItem>
								<MenuItem key="LAPAN" value="LAPAN">
									LAPAN
								</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12} md={4}>
							<h2>Rentang Data</h2>
							<h3>24h</h3>
						</Grid>
						{/* <Grid item xs={12} md={4}>
							<h2>Confidence Level</h2>
							<h3>80%</h3>
						</Grid> */}
					</Grid>
					{isValidating ? (
						<CircularProgress />
					) : (
						<Map
							center={{
								lat: -1.5,
								lng: 117.384
							}}
							zoom={5.1}
							hotspots={hotspot}
						/>
					)}
				</div>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(HotspotPage)
