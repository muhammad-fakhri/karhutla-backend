import { makeStyles } from '@material-ui/core/styles'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from '../../assets/jss/nextjs-material-kit/pages/login.page.style'
import image from '../../assets/img/login-bg.jpg'

const useStyles = makeStyles(styles)

export default function AuthLayout(props) {
	const classes = useStyles()
	// TODO: remove burger button when in md breakpoint
	return (
		<div>
			<Header fixed color="transparent" brand="SIMADU2" />
			<div
				className={classes.pageHeader}
				style={{
					backgroundImage: `url(${image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'top center'
				}}
			>
				{props.children}
				<Footer whiteFont />
			</div>
		</div>
	)
}
