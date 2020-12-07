import { container, primaryColor } from '../../nextjs-material-kit'

const footerStyle = {
	block: {
		color: 'inherit',
		padding: '0.9375rem',
		fontWeight: '500',
		fontSize: '12px',
		textTransform: 'uppercase',
		borderRadius: '3px',
		textDecoration: 'none',
		position: 'relative',
		display: 'block'
	},
	center: {
		padding: '15px 0',
		textAlign: 'center'
	},
	footer: {
		padding: '0.9375rem 0',
		textAlign: 'center',
		display: 'flex',
		zIndex: '2',
		position: 'relative'
	},
	a: {
		color: primaryColor,
		textDecoration: 'none',
		backgroundColor: 'transparent'
	},
	footerWhiteFont: {
		'&,&:hover,&:focus': {
			color: '#FFFFFF'
		}
	},
	container,
	list: {
		marginBottom: '0',
		padding: '0',
		marginTop: '0'
	},
	inlineBlock: {
		display: 'inline-block',
		padding: '0px',
		width: 'auto'
	},
	icon: {
		width: '18px',
		height: '18px',
		position: 'relative',
		top: '3px'
	},
	footerDescription: {
		padding: '0 12vw'
	},
	logo: {
		height: '64px',
		width: 'auto',
		margin: '16px 8px',
		position: 'relative'
	}
}
export default footerStyle
