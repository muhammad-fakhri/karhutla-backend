import styles from '@asset/jss/nextjs-material-kit/pages/wilayah-kerja.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import NavBtnGroup from '@component/NavBtnGroup'
import useAuth, { ProtectRoute } from '@context/auth'
import { RegionData } from '@interface'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getAllWilayah } from '@service'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react'

const column = [
	{ title: 'Wilayah', field: 'name' },
	{ title: 'Kode Wilayah', field: 'code' },
	{
		title: 'Unit Wilayah',
		field: 'type',
		lookup: {
			Pulau: 'Pulau',
			Provinsi: 'Provinsi',
			Kabupaten: 'Kabupaten',
			Kecamatan: 'Kecamatan',
			Kelurahan: 'Kelurahan',
			Desa: 'Desa'
		}
	}
]

function WilayahPage() {
	const { isAuthenticated } = useAuth()
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	const [loading, setLoading] = useState(true)
	const [region, setRegion] = useState<RegionData[]>([])
	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllWilayah()
			setRegion(data)
			setLoading(false)
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
				<h2>Data Wilayah</h2>
				<NavBtnGroup page="wilayah" />
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
						data={region}
						options={{
							search: true
						}}
						localization={{
							pagination: {
								labelRowsSelect: 'Baris',
								labelDisplayedRows: '{from}-{to} dari {count}'
							},
							toolbar: {
								searchPlaceholder: 'Pencarian'
							}
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(WilayahPage)
