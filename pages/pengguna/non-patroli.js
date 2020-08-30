import 'date-fns';
import dynamic from "next/dynamic";
import Router from 'next/router';
const LoginPage = dynamic(() => import("../login"));
import { getTokenFromRequest } from '../../context/auth';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import SiteLayout from '../../components/Layout/SiteLayout';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button";
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/pengguna/nonPatroliPage";
import { makeStyles } from "@material-ui/core/styles";
import UserService from '../../services/UserService';
const useStyles = makeStyles(styles);

export default function NonPatroliPage(props) {
  const classes = useStyles();
  React.useEffect(() => {
    if (props.loggedIn) return; // do nothing if already logged in
    Router.replace("/pengguna/non-patroli", "/login", { shallow: true });
  }, [props.loggedIn]);

  // Load login page if not logged in
  if (props.loggedIn !== undefined) {
    if (!props.loggedIn) return <LoginPage />;
  }

  // If logged in load non-patroli page 
  const [role, setRole] = React.useState();
  const [disabled, setDisabled] = React.useState(false);
  const handleRoleChange = (event) => {
    setRole(event.target.value);
    if (event.target.value == 4 || event.target.value == 5 || event.target.value == 10) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  const handleDaopsFormSubmit = () => { };

  return (
    <SiteLayout headerColor='info'>
      <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
        <h2>Tambah Pengguna Daops/Balai</h2>
        <form noValidate autoComplete="off">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <TextField
                id="role"
                select
                label="Jabatan"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleRoleChange}
                className={classes.textAlignLeft}
              >
                {props.roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={10} md={4}>
              {role == 6 || role == 7
                ? <TextField
                  id="balai"
                  select
                  label="Balai"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  disabled={disabled}
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    Lahat
                  </MenuItem>
                </TextField>
                : <TextField
                  id="daops"
                  select
                  label="Daerah Operasi"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  disabled={disabled}
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    Lahat
                  </MenuItem>
                </TextField>
              }
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <TextField
                id="name"
                label="Nama"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
              />
            </Grid>
            <Grid item xs={10} md={4}>
              <TextField
                id="registration-number"
                label="NIP"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
              />
            </Grid>
            <Grid item xs={10} md={4}>
              <TextField
                id="phone-number"
                label="Nomor HP"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
              />
            </Grid>
            <Grid item xs={10} md={4}>
              <TextField
                id="password-confirmation"
                label="Konfirmasi Password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={10} md={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDaopsFormSubmit}
                fullWidth
              >
                Tambah Pengguna
                </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </SiteLayout >
  );
}

export async function getServerSideProps(context) {
  const roles = await UserService.getNonPatroliRoles();
  return {
    props: {
      loggedIn: getTokenFromRequest(context),
      roles
    }
  }
}