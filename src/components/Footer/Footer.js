import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import styles from '../../assets/jss/nextjs-material-kit/components/footerStyle'
import logoIPB from '../../assets/img/logo-ipb.png'
import logoLPDP from '../../assets/img/lpdp.png'
import logoKLHK from '../../assets/img/klhk.png'

const useStyles = makeStyles(styles)

export default function Footer(props) {
	const classes = useStyles()
	const { whiteFont } = props
	const footerClasses = classNames({
		[classes.footer]: true,
		[classes.footerWhiteFont]: whiteFont
	})
	const aClasses = classNames({
		[classes.a]: true,
		[classes.footerWhiteFont]: whiteFont
	})
	return (
		<footer className={footerClasses}>
			<div className={classes.container}>
				<div className={classes.center}>
					<div>
						<img
							alt="Logo LPDP"
							src={logoLPDP}
							className={classes.logo}
						/>
						<img
							alt="Logo IPB"
							src={logoIPB}
							className={classes.logo}
						/>
						<img
							alt="Logo KLHK"
							src={logoKLHK}
							className={classes.logo}
						/>
					</div>
					<Typography
						variant="body1"
						gutterBottom
						className={classes.footerDescription}
					>
						Kerjasama Balai Pengendalian Perubahan Iklim dan
						Kebakaran Hutan dan Lahan (PPIKHL) Wilayah Sumatra,
						Direktorat Jenderal Pengendalian Perubahan Iklim,
						Kementerian Lingkungan Hidup dan Kehutanan Republik
						Indonesia, Departemen Ilmu Komputer IPB University
					</Typography>
					<Typography variant="body1" gutterBottom>
						didanai oleh{' '}
						<a
							href="https://www.lpdp.kemenkeu.go.id/in/home"
							className={aClasses}
							target="_blank"
							rel="noreferrer"
						>
							Lembaga Pengelola Dana Pendidikan
						</a>
					</Typography>
				</div>
			</div>
		</footer>
	)
}

Footer.propTypes = {
	whiteFont: PropTypes.bool
}
