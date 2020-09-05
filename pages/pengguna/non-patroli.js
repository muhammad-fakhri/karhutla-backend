import 'date-fns';
import { useRouter } from 'next/router';
import {
  IconButton,
  InputAdornment,
  TextField,
  MenuItem,
  Grid,
  Dialog,
  Typography,
  Box
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import SiteLayout from '../../components/Layout/SiteLayout';
import Button from "../../components/CustomButtons/Button";
import Loader from "../../components/Loader/Loader";
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/pengguna/nonPatroliPage";
import { makeStyles } from "@material-ui/core/styles";
import UserService from '../../services/UserService';
import BalaiService from '../../services/BalaiService';
import DaopsService from '../../services/DaopsService';
import useAuth, { ProtectRoute } from '../../context/auth';
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

function NonPatroliPage(props) {
  const { loading } = useAuth();
  const classes = useStyles();
  const router = useRouter();
  const [loadData, setLoadData] = React.useState(true);
  const [roles, setRoles] = React.useState([]);
  const [balai, setBalai] = React.useState([]);
  const [daops, setDaops] = React.useState([]);
  const showLoader = loading || loadData;
  React.useEffect(() => {
    const getDropdownData = async () => {
      const roles = await UserService.getNonPatroliRoles();
      const balai = await BalaiService.getAllBalai();
      const daops = await DaopsService.getAllDaops();
      setRoles(roles);
      setBalai(balai);
      setDaops(daops);
      setLoadData(false);
    }
    getDropdownData();
  }, []);

  const [values, setValues] = React.useState({
    role: '',
    organization: '',
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
      setValues({ ...values, role: event.target.value, organization: 'KLHK', disabled: true });
    } else {
      setValues({ ...values, role: event.target.value, organization: '', disabled: false });
    }
  }
  const handleNonPatroliFormSubmit = async () => {
    let result = await UserService.addNonPatroliUser(values);
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
    showLoader ? (
      <Loader />
    ) : (
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
                  {roles.map((role) => (
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
                    onChange={handleChange('organization')}
                    className={classes.textAlignLeft}
                  >
                    {balai.map((balai) => (
                      <MenuItem key={balai.id} value={balai.code}>
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
                    onChange={handleChange('organization')}
                    className={classes.textAlignLeft}
                  >
                    {daops.map((daops) => (
                      <MenuItem key={daops.id} value={daops.code}>
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
      )
  );
}

export default ProtectRoute(NonPatroliPage);