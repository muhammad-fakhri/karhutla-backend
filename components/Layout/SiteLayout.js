import React from 'react';
import PropTypes from 'prop-types';
import Header from "../Header/Header.js"
import HeaderLinks from "../Header/HeaderLinks.js"
import Footer from "../Footer/Footer.js"

export default function SiteLayout(props) {
    return (
        <div>
            <Header
                brand="SIMADU2"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
            // {...rest}
            />
            {props.children}
            <Footer />
        </div >
    );
}

SiteLayout.propTypes = {
    children: PropTypes.element.isRequired,
};