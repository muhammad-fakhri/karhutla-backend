import 'date-fns';
import dynamic from "next/dynamic";
import Router, { useRouter } from 'next/router';
const LoginPage = dynamic(() => import("../login"));
import { getTokenFromRequest } from '../../context/auth';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import SiteLayout from '../../components/Layout/SiteLayout';
import Button from "../../components/CustomButtons/Button";
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/pengguna/nonPatroliPage";
import { makeStyles } from "@material-ui/core/styles";
import UserService from '../../services/UserService';
import BalaiService from '../../services/BalaiService';
import DaopsService from '../../services/DaopsService';
const useStyles = makeStyles(styles);

const DialogTitle = props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.dialogTitle}>{children}</Typography>
      {onClose ? (
        <IconButton color="default" aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default function NonPatroliPage(props) {
  const classes = useStyles();
  const router = useRouter();
  React.useEffect(() => {
    if (props.loggedIn) return; // do nothing if already logged in
    Router.replace("/pengguna/non-patroli", "/login", { shallow: true });
  }, [props.loggedIn]);

  // Load login page if not logged in
  if (props.loggedIn !== undefined) {
    if (!props.loggedIn) return <LoginPage />;
  }

  // If logged in load non-patroli page 
  const [values, setValues] = React.useState({
    role: '',
    institution: '',
    name: '',
    nip: '',
    phone: '',
    email: '',
    password: '',
    cPassword: '',
    errorMessage: '',
    disabled: false,
    showDialog: false,
    showPassword: false,
    successDialog: true
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleRoleChange = (event) => {
    if (event.target.value == 4 || event.target.value == 5) {
      setValues({ ...values, role: event.target.value, institution: 'KLHK', disabled: true });
    } else {
      setValues({ ...values, role: event.target.value, institution: '', disabled: false });
    }
  }
  const handleNonPatroliFormSubmit = async () => {
    let result = await UserService.addNonPatroliUser({
      "role": values.role,
      "name": values.name,
      "institution": values.institution,
      "email": values.email,
      "nip": values.nip,
      "phone": values.phone,
      "password": values.password,
      "cPassword": values.cPassword
    });
    if (result.success) setValues({ ...values, successDialog: true, showDialog: true });
    else {
      setValues({
        ...values,
        successDialog: false,
        errorMessage: result.message,
        showDialog: true
      });
    }
  };
  const resetForm = () => {
    setValues({
      ...values,
      name: '',
      nip: '',
      phone: '',
      email: '',
      password: '',
      cPassword: '',
      errorMessage: '',
      disabled: false,
      showDialog: false,
      showPassword: false,
      successDialog: true
    });
  }
  const closeDialog = () => {
    if (values.successDialog) resetForm();
    else setValues({ ...values, showDialog: false });
  }
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <SiteLayout headerColor='info'>
      <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
        <h2>Tambah Pengguna Daops/Balai</h2>
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
            {values.role == 6 || values.role == 7
              ? <TextField
                id="balai"
                select
                label="Balai"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                disabled={values.disabled}
                onChange={handleChange('institution')}
                className={classes.textAlignLeft}
              >
                {props.balai.map((balai) => (
                  <MenuItem key={balai.code} value={balai.name}>
                    {balai.name}
                  </MenuItem>
                ))}
              </TextField>
              : <TextField
                id="daops"
                select
                label="Daerah Operasi"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                disabled={values.disabled}
                onChange={handleChange('institution')}
                className={classes.textAlignLeft}
              >
                {props.daops.map((daops) => (
                  <MenuItem key={daops.code} value={daops.name}>
                    {daops.name + ' | ' + daops.code}
                  </MenuItem>
                ))}
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
              value={values.name}
              onChange={handleChange('name')}
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
              value={values.nip}
              onChange={handleChange('nip')}
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
              value={values.email}
              onChange={handleChange('email')}
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
              helperText="Format nomor HP: 08xx-xxxx-xxxx / +62xxx-xxxx-xxxx"
              variant="outlined"
              fullWidth
              value={values.phone}
              onChange={handleChange('phone')}
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
              type={values.showPassword ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              value={values.password}
              onChange={handleChange('password')}
              fullWidth
              margin="normal"
              required
              className={classes.textAlignLeft}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={10} md={4}>
            <TextField
              id="password-confirmation"
              type={values.showPassword ? 'text' : 'password'}
              label="Konfirmasi Password"
              variant="outlined"
              value={values.cPassword}
              onChange={handleChange('cPassword')}
              fullWidth
              margin="normal"
              required
              className={classes.textAlignLeft}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
              }}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={10} md={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNonPatroliFormSubmit}
              fullWidth
            >
              Tambah Pengguna
                </Button>
          </Grid>
        </Grid>
        <Dialog onClose={closeDialog} aria-labelledby="customized-dialog-title" open={values.showDialog}>
          <DialogTitle id="customized-dialog-title" onClose={closeDialog} classes={classes}>
            {values.successDialog ? 'Tambah Pengguna Berhasil' : 'Tambah Pengguna Gagal'}
          </DialogTitle>
          <MuiDialogContent dividers>
            <Box component="div" textAlign="center">
              {values.successDialog ?
                <>
                  <Button variant="contained" color="primary" onClick={resetForm}>
                    Tambah Pengguna Lagi
                  </Button>
                  <Button variant="contained" color="primary" onClick={event => {
                    event.preventDefault()
                    router.push('/pengguna');
                  }}>
                    Kembali ke Halaman Pengguna
                  </Button>
                </>
                : values.errorMessage.map(error => (
                  <Typography>{error}</Typography>
                ))
              }
            </Box>
          </MuiDialogContent>
        </Dialog>
      </div>
    </SiteLayout >
  );
}

export async function getServerSideProps(context) {
  const roles = await UserService.getNonPatroliRoles();
  const balai = await BalaiService.getAllBalai();
  const daops = await DaopsService.getAllDaops();
  return {
    props: {
      loggedIn: getTokenFromRequest(context),
      roles,
      balai,
      daops
    }
  }
}