import { ButtonGroup, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const styles = {
	navBtnGroup: {
		marginBottom: '18px'
	}
}

export default function NavBtnGroup(props) {
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	const { page } = props

	return (
		<ButtonGroup
			fullWidth={true}
			color="primary"
			className={classes.navBtnGroup}
		>
			<Button
				href="/wilayah/balai"
				variant={page === 'balai' ? 'contained' : 'outlined'}
			>
				Balai
			</Button>
			<Button
				href="/wilayah/daops"
				variant={page === 'daops' ? 'contained' : 'outlined'}
			>
				Daerah Operasi
			</Button>
			<Button
				href="/wilayah/posko"
				variant={page === 'posko' ? 'contained' : 'outlined'}
			>
				Posko
			</Button>
			<Button
				href="/wilayah"
				variant={page === 'wilayah' ? 'contained' : 'outlined'}
			>
				Wilayah
			</Button>
		</ButtonGroup>
	)
}
