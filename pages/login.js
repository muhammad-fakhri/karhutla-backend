import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const DashboardPage = dynamic(() => import("./dashboard"));
import Router from 'next/router';
import cookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import AuthLayout from '../components/Layout/AuthLayout';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  useEffect(() => {
    if (!props.loggedIn) return; // do nothing if not logged in
    Router.replace("/login", "/dashboard", { shallow: true });
  }, [props.loggedIn]);

  // Load dashboard page if already logged in
  if (props.loggedIn != undefined) {
    if (props.loggedIn) return <DashboardPage />;
  }

  // Load login page if not logged in
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch('http://103.129.223.216/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson && responseJson.status == 401) {
          setLoginError("Login gagal");
          console.log("Error Login: " + loginError);
        } else {
          if (responseJson && responseJson.data.token) {
            // set cookie
            cookie.set('token', responseJson.data.token, { expires: 2 });
            Router.push('/dashboard');
          }
        }
      });
  };

  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <AuthLayout>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Login ke SIMADU2</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                    onChangeFunction={(e) => setEmail(e.target.value)}
                  />
                  <CustomInput
                    labelText="Password"
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                            </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                    onChangeFunction={(e) => setPassword(e.target.value)}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button simple color="primary" size="lg" onClick={handleSubmit}>
                    Login
                    </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </AuthLayout >
  );
}

export async function getServerSideProps(context) {
  const cookieList = {},
    rc = context.req.headers.cookie;

  rc && rc.split(';').forEach(function (cookie) {
    let parts = cookie.split('=');
    cookieList[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  let loggedIn;
  cookieList['token'] ? loggedIn = true : loggedIn = false;

  return {
    props: { loggedIn }
  }
}