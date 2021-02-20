import { container } from '@asset/jss/nextjs-material-kit'
import basePage from './base.page.style'

const frontPageStyle = {
	...basePage,
	container,
	brand: {
		color: '#FFFFFF',
		textAlign: 'left' as const
	},
	title: {
		fontSize: '4.2rem',
		fontWeight: 600,
		display: 'inline-block',
		position: 'relative' as const
	},
	subtitle: {
		fontSize: '1.313rem',
		maxWidth: '510px',
		margin: '10px 0 0'
	},
	mainRaised: {
		margin: '-60px 30px 0px',
		padding: '16px 0',
		borderRadius: '6px',
		boxShadow:
			'0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
		'@media (max-width: 830px)': {
			marginLeft: '10px',
			marginRight: '10px'
		}
	},
	icons: {
		width: '20px',
		height: '20px',
		marginRight: '3px'
	},
	formChooseDate: {
		marginTop: '8px'
	},
	terpaduBg: {
		textDecoration: 'underline #fdf569 solid'
	},
	mandiriBg: {
		textDecoration: 'underline #6991fd solid'
	},
	pencegahanBg: {
		textDecoration: 'underline #00e64d solid'
	}
}

export default frontPageStyle
