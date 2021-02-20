import { container } from '@asset/jss/nextjs-material-kit'
import imagesStyle from '@asset/jss/nextjs-material-kit/imagesStyles'

const profilePageStyle = {
	container,
	profile: {
		textAlign: 'center' as const,
		'& img': {
			maxWidth: '160px',
			width: '100%',
			margin: '0 auto',
			transform: 'translate3d(0, -50%, 0)'
		}
	},
	description: {
		margin: '2rem auto',
		marginTop: '-60px',
		maxWidth: '600px',
		textAlign: 'center !important' as 'center',
		paddingBottom: '32px'
	},
	descriptionItem: {
		marginBottom: '16px'
	},
	descriptionTitle: {
		marginTop: '16px'
	},
	...imagesStyle,
	main: {
		background: '#FFFFFF',
		position: 'relative' as const,
		zIndex: 3
	},
	mainRaised: {
		margin: '-60px 30px 0px',
		borderRadius: '6px',
		boxShadow:
			'0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
	}
}

export default profilePageStyle
