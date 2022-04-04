import basePage from './base.page.style'

const patrolPageStyle = {
	...basePage,
	terpaduBg: {
		textDecoration: 'underline #04F512 solid'
	},
	mandiriBg: {
		textDecoration: 'underline #6991fd solid'
	},
	pencegahanBg: {
		textDecoration: 'underline #E853C4 solid'
	},
	formChooseDate: {
		marginTop: '8px'
	},
	divider: {
		padding: '8px 0'
	},
	table: {
		padding: '0 16px 8px 16px',
		textTransform: 'capitalize' as const
	}
}

export default patrolPageStyle
