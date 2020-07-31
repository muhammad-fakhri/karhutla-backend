import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"
import Icon from '@material-ui/core/Icon'
import SiteLayout from '../components/Layout/SiteLayout';
import Parallax from "../components/Parallax/Parallax.js"
import GridContainer from "../components/Grid/GridContainer.js"
import GridItem from "../components/Grid/GridItem.js"
import Map from "../components/Map/Map.js"

import styles from "../assets/jss/nextjs-material-kit/pages/frontPage.js"

const useStyles = makeStyles(styles)

function FrontPage(props) {
  const classes = useStyles();
  return (
    <SiteLayout>
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
        <h2>
          <Icon className={classes.icon} color={"error"}>fiber_manual_record</Icon>
          SIPONGI Live Update
        </h2>
        <Map
          center={
            {
              lat: -1.5,
              lng: 117.384
            }
          }
          zoom={5.2}
        />
      </div>
    </SiteLayout>
  );
}

export default FrontPage