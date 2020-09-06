import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loader from "components/Loader/Loader";
import Parallax from "components/Parallax/Parallax.js";
import SiteLayout from "../components/Layout/SiteLayout";
import useAuth, { ProtectRoute } from '../context/auth';
import profile from "assets/img/user.png";

import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";

const useStyles = makeStyles(styles);

function ProfilePage(props) {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    !isAuthenticated ? (
      <Loader />
    ) : (
        <SiteLayout scrollChange={true}>
          <div>
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div>
                <div className={classes.container}>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                      <div className={classes.profile}>
                        <div>
                          <img src={profile} alt="..." className={imageClasses} />
                        </div>
                        <div className={classes.name}>
                          <h3 className={classes.title}>Nama Pengguna</h3>
                          <h6>LOREM IPSUM</h6>
                        </div>
                      </div>
                    </GridItem>
                  </GridContainer>
                  <div className={classes.description}>
                    <p>
                      Lorem ipsum dolor sit amet, vertica nus equinox deles matreica.
                      Lorem ipsum dolor sit amet, vertica nus equinox deles matreica.
                      Lorem ipsum dolor sit amet, vertica nus equinox deles matreica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SiteLayout>
      )
  );
}
export default ProtectRoute(ProfilePage);