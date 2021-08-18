import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import logoIPB from '../../assets/img/logo-ipb.png'
import logoKLHK from '../../assets/img/logo-klhk.png'
import logoLPDP from '../../assets/img/logo-lpdp.png'
import logoITTO from '../../assets/img/itto_logo_web_light_sm.gif'
import logoManggalaAgni from '../../assets/img/logo-manggala.png'
import styles from '../../assets/jss/nextjs-material-kit/components/footerStyle'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'

const useStyles = makeStyles(styles)

export default function Footer(props) {
	const classes = useStyles()
	const { whiteFont } = props
	const footerClasses = classNames({
		[classes.footer]: true,
		[classes.footerWhiteFont]: whiteFont
	})
	return (
		<footer className={footerClasses}>
			<div className={classes.container} style={{ margin: 'auto 20%' }}>
				<GridContainer className={classes.footerWrapper}>
					<GridItem
						md={12}
						lg={1}
						className={classes.logoWrapper}
					></GridItem>
					<GridItem md={12} lg={2} className={classes.logoWrapper}>
						<img
							alt="Logo IPB"
							src={logoIPB}
							className={classes.logo}
						/>
					</GridItem>
					<GridItem md={12} lg={2} className={classes.logoWrapper}>
						<img
							alt="Logo KLHK"
							src={logoKLHK}
							className={classes.logo}
						/>
					</GridItem>
					<GridItem md={12} lg={2} className={classes.logoWrapper}>
						<img
							alt="Logo Manggala Agni"
							src={logoManggalaAgni}
							className={classes.logo}
						/>
					</GridItem>
					<GridItem md={12} lg={3} className={classes.logoWrapper}>
						<img
							alt="Logo LPDP"
							src={logoLPDP}
							className={classes.logo}
						/>
					</GridItem>
					<GridItem md={12} lg={2} className={classes.logoWrapper}>
						<img
							alt="Logo ITTO"
							src={logoITTO}
							className={classes.logo}
						/>
					</GridItem>

					{/* <GridItem md={12} lg={5}>
						<Typography
							variant="body1"
							gutterBottom
							align="justify"
						>
							dikembangkan oleh Departemen Ilmu Komputer FMIPA
							IPB, bekerja sama dengan Balai Pengendalian
							Perubahan Iklim dan Kebakaran Hutan dan Lahan
							(PPIKHL) Wilayah Sumatra, Direktorat Jenderal
							Pengendalian Perubahan Iklim, Kementerian Lingkungan
							Hidup dan Kehutanan, didanai oleh Lembaga Pengelola
							Dana Pendidikan, Kementerian Keuangan Republik
							Indonesia
						</Typography>
					</GridItem> */}
				</GridContainer>
			</div>
		</footer>
	)
}

Footer.propTypes = {
	whiteFont: PropTypes.bool
}
