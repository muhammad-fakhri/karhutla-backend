import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import CustomCarousel from "components/CustomCarousel/CustomCarousel.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import typoStyles from "assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";

const useStyles = makeStyles(styles);
const useTypoStyles = makeStyles(typoStyles);

export default function Components(props) {
  const classes = useStyles();
  const typoClasses = useTypoStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="SIMADU"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/forest-fire.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Website SIMADU</h1>
                <h3 className={classes.subtitle}>
                  Website monitoring kebakaran hutan di Indonesia
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={typoClasses.title}>
          <h2>The Life of Material Kit</h2>
        </div>
        <CustomCarousel />
      </div>
      <Footer />
    </div>
  );
}
