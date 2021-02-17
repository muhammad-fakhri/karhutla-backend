// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

// core components
import { infoColor } from '../../assets/jss/nextjs-material-kit.js'

const useStyles = makeStyles({
	progress: {
		color: infoColor,
		width: '6rem !important',
		height: '6rem !important'
	},
	center: {
		display: ' flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh'
	}
})

export default function Loader(props) {
	const classes = useStyles()
	return (
		<div className={classes.center}>
			<CircularProgress className={classes.progress} />
		</div>
	)
}
