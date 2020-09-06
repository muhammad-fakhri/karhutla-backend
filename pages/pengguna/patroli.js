import 'date-fns';
import { TextField, MenuItem, Grid } from '@material-ui/core';
import SiteLayout from '../../components/Layout/SiteLayout';
import Button from "../../components/CustomButtons/Button";
import Loader from "../../components/Loader/Loader";
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/pengguna/patroliPage";
import { makeStyles } from "@material-ui/core/styles";
import useAuth, { ProtectRoute } from '../../context/auth';
const useStyles = makeStyles(styles);

function PatroliPage(props) {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const handleManualManggalaFormSubmit = () => {
  };
  return (
    !isAuthenticated ? (
      <Loader />
    ) : (
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
      )
  );
}

export default ProtectRoute(PatroliPage);