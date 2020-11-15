/*eslint-disable*/
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/nextjs-material-kit/components/footerStyle.js";
import logoIPB from "assets/img/logo-ipb.png";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.center}>
          <Avatar alt="Logo IPB" src={logoIPB} className={classes.logo} />
          Copyright &copy; {1900 + new Date().getYear()}{" "}
          <a href="https://cs.ipb.ac.id" className={aClasses} target="_blank">
            Departemen Ilmu Komputer FMIPA IPB
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
