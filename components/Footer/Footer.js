/*eslint-disable*/
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/nextjs-material-kit/components/footerStyle.js";

import Link from 'next/link'

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link href={"/"}>
                <a
                  className={classes.block}
                >
                  SIMADU2
              </a>
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link href={'/'}>
                <a
                  className={classes.block}
                >
                  Tentang
              </a>
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link href={'/login'}>
                <a
                  className={classes.block}
                >
                  Login
              </a>
              </Link>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} ,
          made by{" "}
          <a
            href="https://cs.ipb.ac.id"
            className={aClasses}
            target="_blank"
          >
            Departemen Ilmu Komputer FMIPA IPB.
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
