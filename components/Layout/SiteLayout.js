import React from 'react';
import PropTypes from 'prop-types';
import Header from "../Header/Header.js"
import HeaderLinks from "../Header/HeaderLinks.js"
import Footer from "../Footer/Footer.js"

export default function SiteLayout(props) {
    let scrollChangeOption = null;
    if (props.scrollChange) {
        scrollChangeOption = {
            height: 200,
            color: "white"
        };
    } else {
        scrollChangeOption = {};
    }

    return (
        <div>
            <Header
                brand="SIMADU2"
                rightLinks={<HeaderLinks />}
                fixed
                color={props.headerColor ? props.headerColor : "transparent"}
                changeColorOnScroll={scrollChangeOption}
            />
            {props.children}
            <Footer />
        </div >
    );
}

SiteLayout.propTypes = {
    children: PropTypes.element.isRequired,
};