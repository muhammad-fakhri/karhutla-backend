import styles from '@asset/jss/nextjs-material-kit/pages/about.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import moment from 'moment'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const useStyles = makeStyles(styles)

function AboutPage() {
	const classes = useStyles()
	const { isAuthenticated } = useAuth()
	const [date, setDate] = useState(moment())

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
					<div
						className="container"
						style={{
							margin: '30px 18% 50px',
							border: '1px solid #eee',
							padding: '30px'
						}}
					>
						<GridContainer className="footerWrapper">
							<GridItem md={12} lg={12} className="logoWrapper">
								<Typography
									variant="h3"
									gutterBottom
									align="center"
								>
									Tentang Sistem
								</Typography>
								<p>
									<br />
								</p>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
									paragraph
								>
									Sistem Informasi Patroli Pencegahan
									Kebakaran Hutan dan Lahan (SIPP Karhutla)
									adalah alat bantu dalam kegiatan patroli
									pencegahan karhutla di Indonesia. Fungsi
									utama SIPP Karhutla mencakup:
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
									paragraph
								>
									1. Pengelolaan data pengguna aplikasi mobile
									patroli pencegahan karhutla
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
									paragraph
								>
									2. Monitoring dan analisis data patroli
									pencegahan karhutla
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
									paragraph
								>
									SIPP Karhutla dibangun oleh Departemen Ilmu
									Komputer, Fakultas Matematika dan Ilmu
									Pengetahuan Alam, Institut Pertanian Bogor
									(IPB) bekerja sama dengan Balai Pengendalian
									Perubahan Iklim dan Kebakaran Hutan dan
									Lahan (PPIKHL) Wilayah Sumatra dan
									Kalimantan, Direktorat Jenderal Pengendalian
									Perubahan Iklim, Kementerian Lingkungan
									Hidup dan Kehutanan (KLHK), dan Direktorat
									Pengendalian Kebakaran Hutan dan Lahan KLHK.{' '}
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
									paragraph
								>
									Pembangunan dan penerapan SIPP Karhutla di
									Wilayah Sumatera didanai oleh Lembaga
									Pengelola Dana Pendidikan (LPDP),
									Kementerian Keuangan Republik Indonesia.
									Sedangkan pengembangan dan penerapan SIPP
									Karhutla di Kalimantan serta pengadaan
									infrastruktur di KLHK didanai oleh
									International Tropical Timber Organization
									(ITTO).
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
									paragraph
								>
									Penggunaan SIPP Karhutla diatur oleh
									Peraturan Direktur Jenderal Pengendalian
									Perubahan Iklim No.
									P.10/PPI/SET/KUM.1/12/2020 tentang Tata Cara
									Penggunaan Sistem Informasi Patroli
									Pencegahan Kebakaran Hutan dan Lahan (SIPP
									Karhutla) sebagai acuan dalam pencegahan
									kebakaran hutan dan lahan.
								</Typography>
								<p>
									<br />
									<br />
								</p>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
								>
									Kontak
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
								>
									Departemen Ilmu Komputer, FMIPA IPB
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
								>
									Jl. Meranti Wing 20 Level V, Bogor,
									Indonesia 16680
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
								>
									E-mail: karhutla.ipb@apps.ipb.ac.id
								</Typography>
								<Typography
									variant="body1"
									gutterBottom
									align="justify"
								>
									Telp./Fax: 0251- 8625584
								</Typography>
							</GridItem>
						</GridContainer>
					</div>
				</div>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(AboutPage)
