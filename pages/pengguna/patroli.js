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
import styles from "../../assets/jss/nextjs-material-kit/pages/pengguna/patroliPage";
import { makeStyles } from "@material-ui/core/styles";
import UserService from '../../services/UserService';
const useStyles = makeStyles(styles);

export default function PatroliPage(props) {
  const classes = useStyles();
  React.useEffect(() => {
    if (props.loggedIn) return; // do nothing if already logged in
    Router.replace("/pengguna/patroli", "/login", { shallow: true });
  }, [props.loggedIn]);

  // Load login page if not logged in
  if (props.loggedIn !== undefined) {
    if (!props.loggedIn) return <LoginPage />;
  }

  // If logged in load non-patroli page 
  const handleManualManggalaFormSubmit = () => {
  };
  return (
    <SiteLayout headerColor='info'>
      <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
        <h2>Tambah Manual Personil Manggala Agni</h2>
        <form noValidate autoComplete="off">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <TextField
                id="operation-region"
                select
                label="Daerah Operasi"
                variant="outlined"
                fullWidth
                disabled
                margin="normal"
                required
                defaultValue='a'
                className={classes.textAlignLeft}
              >
                <MenuItem key={'a'} value={'a'}>
                  Lahat
                                        </MenuItem>
                <MenuItem key={'b'} value={'b'}>
                  B
                                        </MenuItem>
                <MenuItem key={'c'} value={'c'}>
                  C
                                        </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={10} md={4}>
              <TextField
                id="operation-region"
                label="Nomor Registrasi"
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
                id="operation-region"
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
                id="operation-region"
                label="Email"
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
                id="operation-region"
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
                id="operation-region"
                label="Konfirmasi Password"
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
                id="operation-region"
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleManualManggalaFormSubmit}
                fullWidth
              >
                Tambah Anggota
              </Button>
            </Grid>
          </Grid>
        </form>
      </div >
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