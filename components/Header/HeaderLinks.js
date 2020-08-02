/*eslint-disable*/
import React from "react";
import Link from "next/link";
import cookie from 'js-cookie';
import { useRouter } from 'next/router'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

// core components
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
              <Link href="/dashboard">
                <Button
                  color="transparent"
                  className={classes.navLink} >
                  Patroli
                </Button>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href="/dashboard">
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
