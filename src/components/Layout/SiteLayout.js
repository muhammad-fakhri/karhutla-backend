import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import HeaderLinks from '../Header/HeaderLinks'
import Footer from '../Footer/Footer'

export default function SiteLayout(props) {
	let scrollChangeOption = null
	if (props.scrollChange) {
		scrollChangeOption = {
			height: 200,
			color: 'white'
		}
	} else {
		scrollChangeOption = {}
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
