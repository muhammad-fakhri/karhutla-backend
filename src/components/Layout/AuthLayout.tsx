import image from '@asset/img/login-bg.jpg'
import styles from '@asset/jss/nextjs-material-kit/pages/login.page.style'
import Header from '@component/Header/Header'
import { makeStyles } from '@material-ui/core/styles'

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
