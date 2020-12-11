import { ButtonGroup, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const styles = {
	navBtnGroup: {
		marginBottom: '18px'
	}
}

export default function NavBtnGroup() {
	const useStyles = makeStyles(styles)
	const classes = useStyles()

	return (
		<ButtonGroup
			fullWidth={true}
			color="primary"
			className={classes.navBtnGroup}
		>
			<Button href="/wilayah">Wilayah</Button>
			<Button href="/wilayah/balai">Balai</Button>
			<Button href="/wilayah/daops">Daerah Operasi</Button>
			<Button href="/wilayah/posko">Posko</Button>
		</ButtonGroup>
	)
}
