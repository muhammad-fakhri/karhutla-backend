import basePage from '../base.page.style'

const berkasPageStyle = {
	...basePage,
	textAlignLeft: {
		textAlign: 'left' as const
	},
	form: {
		marginTop: '32px'
	},
	gridItem: {},
	downloadButton: {
		fontWeight: 'bold' as const
	},
	alert: {
		marginBottom: '16px',
		textAlign: 'left' as const
	}
}

export default berkasPageStyle
