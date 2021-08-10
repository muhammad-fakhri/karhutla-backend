import styles from '@asset/jss/nextjs-material-kit/pages/about.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import useAuth, { ProtectRoute } from '@context/auth'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import moment from 'moment'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
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
					<Container fixed>
						<h2>Tentang Sistem</h2>
						<p>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sistem
							Informasi Patroli Pencegahan Kebakaran Hutan dan
							Lahan (SIPP Karhutla) adalah alat bantu dalam
							kegiatan patroli pencegahan karhutla di Indonesia.
							Fungsi utama SIPP Karhutla mencakup:
						</p>
						<p>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.
							Pengelolaan data pengguna aplikasi mobile patroli
							pencegahan karhutla
						</p>
						<p>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.
							Monitoring dan analisis data patroli pencegahan
							karhutla
						</p>
						<p>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIPP
							Karhutla dibangun oleh oleh Departemen Ilmu
							Komputer, Fakultas Matematika dan Ilmu Pengetahuan
							Alam, Institut Pertanian Bogor (IPB) bekerja sama
							dengan Balai Pengendalian Perubahan Iklim dan
							Kebakaran Hutan dan Lahan (PPIKHL) Wilayah Sumatra
							dan Kalimantan, Direktorat Jenderal Pengendalian
							Perubahan Iklim, Kementerian Lingkungan Hidup dan
							Kehutanan (KLHK), dan Direktorat Pengendalian
							Kebakaran Hutan dan Lahan KLHK.{' '}
						</p>
						<p>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pembangunan
							dan penerapan SIPP Karhutla di Wilayah Sumatera
							didanai oleh Lembaga Pengelola Dana Pendidikan
							(LPDP), Kementerian Keuangan Republik Indonesia.
							Sedangkan pengembangan dan penerapan SIPP Karhutla
							di Kalimantan serta pengadaan infrastruktur di KLHK
							didanai oleh International Tropical Timber
							Organization (ITTO).
						</p>
						<p className="kontak">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Penggunaan
							SIPP Karhutla diatur oleh Peraturan Direktur
							Jenderal Pengendalian Perubahan Iklim No.
							P.10/PPI/SET/KUM.1/12/2020 tentang Tata Cara
							Penggunaan Sistem Informasi Patroli Pencegahan
							Kebakaran Hutan dan Lahan (SIPP Karhutla) sebagai
							acuan dalam pencegahan kebakaran hutan dan lahan.
						</p>
						<p>
							<br />
							<br />
						</p>
						<p>Kontak</p>
						<p>Departemen Ilmu Komputer, FMIPA IPB</p>
						<p>
							Jl. Meranti Wing 20 Level V, Bogor, Indonesia 16680
						</p>
						<p>E-mail: karhutla.ipb@apps.ipb.ac.id</p>
						<p className="kontak">Telp./Fax: 0251- 8625584</p>
						<p>
							<br />
							<br />
						</p>

						<style jsx>{`
							h2 {
								margin-bottom: 40px;
							}

							p {
								font-size: 18px;
								text-align: left;
								width: 70%;
								margin: 20px auto;
							}

							p .kontak {
								margin-bottom: 50px;
							}
						`}</style>
					</Container>
				</div>
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(AboutPage)
