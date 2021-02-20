import basePage from './base.page.style'

const updatePenggunaPageStyle = {
	...basePage,
	textAlignLeft: {
		textAlign: 'left' as const
	},
	closeButton: {
		position: 'absolute' as const,
		right: '8px',
		top: '8px',
		color: '#e6e1e1'
	},
	dialogTitle: {
		marginRight: '32px'
	}
}

export default updatePenggunaPageStyle
