import PropTypes from 'prop-types'
import Header from '../Header/Header'
import HeaderLinks from '../Header/HeaderLinks'
import Footer from '../Footer/Footer'

type PropType = {
	children: JSX.Element
	scrollChange: boolean
	headerColor: string
}

export default function SiteLayout(props: PropType) {
	let scrollChangeOption = null
	if (props.scrollChange) {
		scrollChangeOption = {
			height: 200,
			color: 'white'
		}
	} else {
		scrollChangeOption = null
	}

	return (
		<div>
			<Header
				brand="SIPP Karhutla"
				rightLinks={<HeaderLinks />}
				fixed
				color={props.headerColor ? props.headerColor : 'transparent'}
				changeColorOnScroll={scrollChangeOption}
			/>
			{props.children}
			<Footer />
		</div>
	)
}

SiteLayout.propTypes = {
	children: PropTypes.element.isRequired
}
