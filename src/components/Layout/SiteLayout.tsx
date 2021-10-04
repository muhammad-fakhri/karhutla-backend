import Footer from '@component/Footer/Footer'
import Header from '@component/Header/Header'
import HeaderLinks from '@component/Header/HeaderLinks'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'

type PropType = {
	children: JSX.Element
	scrollChange?: boolean
	headerColor?: string
}

export default function SiteLayout(props: PropType) {
	let scrollChangeOption = {
		height: 200,
		color: 'white'
	}
	if (props.scrollChange) {
		scrollChangeOption = {
			height: 200,
			color: 'white'
		}
	} else {
		scrollChangeOption = {
			height: 200,
			color: 'white'
		}
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
