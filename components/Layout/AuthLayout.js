import { makeStyles } from "@material-ui/core/styles";
import Header from '../Header/Header';
import HeaderLinks from "../Header/HeaderLinks.js";
import Footer from "../Footer/Footer.js";
import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";
import image from "assets/img/login-bg.jpg";

const useStyles = makeStyles(styles);

export default function AuthLayout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Header
        fixed
        color="transparent"
        brand="SIMADU2"
        rightLinks={<HeaderLinks isLoginPage={true} />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        {children}
        <Footer whiteFont />
      </div>
    </div>
  );
}