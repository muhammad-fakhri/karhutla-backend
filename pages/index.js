// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
// @material-ui/icons
// core components
import Header from "../components/Header/Header.js"
import HeaderLinks from "../components/Header/HeaderLinks.js"
import Footer from "../components/Footer/Footer.js"
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js"
// import Button from "../components/CustomButtons/Button.js";
import Parallax from "../components/Parallax/Parallax.js"

import styles from "../assets/jss/nextjs-material-kit/pages/frontPage.js"

const useStyles = makeStyles(styles)

function FrontPage(props) {
  const classes = useStyles()
  const { ...rest } = props
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
        {...rest}
      />
      <Parallax image={require("assets/img/forest-fire.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>SIMADU2</h1>
                <h3 className={classes.subtitle}>
                  Website monitoring patroli kebakaran hutan di wilayah Pulau Sumatera, Indonesia.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
        <h2>SIPONGI Live Update</h2>
        {/* <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link href="/login">
            <a className={classes.link}>
              <Button color="primary" size="lg" simple>
                View Login Page
              </Button>
            </a>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload /> */}
      </div>
      <Footer />
    </div>
  );
}

export default FrontPage