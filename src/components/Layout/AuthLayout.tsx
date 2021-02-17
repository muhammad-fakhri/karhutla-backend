import { makeStyles } from '@material-ui/core/styles'
import image from '../../assets/img/login-bg.jpg'
import styles from '../../assets/jss/nextjs-material-kit/pages/login.page.style'
import Header from '../Header/Header'

const useStyles = makeStyles(styles)

export default function AuthLayout(props: { children: JSX.Element }) {
	const classes = useStyles()

	return (
		<div>
			<Header fixed color="transparent" brand="SIPP Karhutla" />
			<div
				className={classes.pageHeader}
				style={{
					backgroundImage: `url(${image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'top center'
				}}
			>
				{props.children}
			</div>
		</div>
	)
}
