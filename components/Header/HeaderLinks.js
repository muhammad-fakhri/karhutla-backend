import React from "react";
import Link from "next/link";
import cookie from 'js-cookie';
import { useRouter } from 'next/router'
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// import { Apps, CloudDownload } from "@material-ui/icons";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  let token = cookie.get('token');
  const router = useRouter()
  const classes = useStyles();
  if (!props.isLoginPage) {
    return (
      token != null ?
        (
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Link href="/dashboard">
                <Button
                  color="transparent"
                  className={classes.navLink} >
                  Dashboard
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <CustomDropdown
                noLiPadding
                navDropdown
                buttonText="Patroli"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                // buttonIcon={Apps}
                dropdownList={[
                  <Link href="/patroli/terpadu">
                    <a className={classes.dropdownLink}>Patroli Terpadu</a>
                  </Link>,
                  <Link href="/patroli/mandiri">
                    <a className={classes.dropdownLink}>Patroli Mandiri</a>
                  </Link>,
                  <Link href="/patroli/pencegahan">
                    <a className={classes.dropdownLink}>Patroli Pencegahan</a>
                  </Link>
                ]}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href="/surat-tugas">
                <Button
                  color="transparent"
                  className={classes.navLink} >
                  Surat Tugas
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href="/dashboard">
                <Button
                  color="transparent"
                  className={classes.navLink} >
                  Pengguna
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href="/dashboard">
                <Button
                  color="transparent"
                  className={classes.navLink} >
                  About
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={() => {
                  cookie.remove('token');
                  router.push('/');
                }} >
                Logout
              </Button>
            </ListItem>
          </List>
        ) : (
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Link href="/">
                <Button
                  color="transparent"
                  className={classes.navLink} >
                  <Icon className={classes.icons}>info</Icon> About
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href="/login">
                <Button
                  color="transparent"
                  className={classes.navLink} >
                  <Icon className={classes.icons}>login</Icon> Login
                </Button>
              </Link>
            </ListItem>
          </List>
        )
    );
  } else {
    return null;
  }
}
