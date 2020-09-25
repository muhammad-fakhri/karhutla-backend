import "date-fns";
import { useRouter } from "next/router";
import {
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Grid,
  Dialog,
  Typography,
  Box,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CloseIcon from "@material-ui/icons/Close";
import SiteLayout from "../../components/Layout/SiteLayout";
import Button from "../../components/CustomButtons/Button";
import Loader from "../../components/Loader/Loader";
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/createPenggunaPage";
import { makeStyles } from "@material-ui/core/styles";
import useAuth, { ProtectRoute } from "../../context/auth";
import DaopsService from "../../services/DaopsService";
import UserService from "../../services/UserService";
const useStyles = makeStyles(styles);

const DialogTitle = (props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.dialogTitle}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          color="default"
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

function PatroliPage(props) {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [daops, setDaops] = React.useState([]);
  React.useEffect(() => {
    const getDropdownData = async () => {
      const daops = await DaopsService.getAllDaops();
      setDaops(daops);
    };
    if (isAuthenticated) getDropdownData();
  }, [isAuthenticated]);
  const [values, setValues] = React.useState({
    organization: "",
    name: "",
    registrationNumber: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
    errorMessage: "",
    showDialog: false,
    showPassword: false,
    successDialog: true,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleManualManggalaFormSubmit = async () => {
    console.log(values);
    let result = await UserService.addPatroliUser(values);
    if (result.success)
      setValues({ ...values, successDialog: true, showDialog: true });
    else {
      setValues({
        ...values,
        successDialog: false,
        errorMessage: result.message,
        showDialog: true,
      });
    }
  };
  const resetForm = () => {
    setValues({
      ...values,
      organization: "",
      name: "",
      registrationNumber: "",
      phone: "",
      email: "",
      password: "",
      cPassword: "",
      errorMessage: "",
      disabled: true,
      showDialog: false,
      showPassword: false,
      successDialog: true,
    });
  };
  const closeDialog = () => {
    if (values.successDialog) resetForm();
    else setValues({ ...values, showDialog: false });
  };
  const handleClickShowPassword = () =>
    setValues({ ...values, showPassword: !values.showPassword });
  const handleMouseDownPassword = (event) => event.preventDefault();

  return !isAuthenticated ? (
    <Loader />
  ) : (
    <SiteLayout headerColor="info">
      <div
        className={classNames(
          classes.main,
          classes.mainRaised,
          classes.textCenter
        )}
      >
        <h2>Tambah Personil Manggala Agni</h2>
        <form noValidate autoComplete="off">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <TextField
                id="operation-region"
                select
                label="Daerah Operasi"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={values.organization}
                className={classes.textAlignLeft}
                onChange={handleChange("organization")}
              >
                {daops.map((daops) => (
                  <MenuItem key={daops.id} value={daops.code}>
                    {daops.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={10} md={4}>
              <TextField
                id="registration-number"
                label="Nomor Registrasi"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
                onChange={handleChange("registrationNumber")}
                value={values.registrationNumber}
              />
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
                onChange={handleChange("name")}
                value={values.name}
              />
            </Grid>
            <Grid item xs={10} md={4}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
                onChange={handleChange("email")}
                value={values.email}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                value={values.password}
                type={values.showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
                onChange={handleChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={10} md={4}>
              <TextField
                id="confirmation-password"
                label="Konfirmasi Password"
                variant="outlined"
                value={values.cPassword}
                type={values.showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
                onChange={handleChange("cPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <TextField
                id="phone-number"
                label="Nomor HP"
                variant="outlined"
                helperText="Format nomor HP: 08xx-xxxx-xxxx / +62xxx-xxxx-xxxx"
                fullWidth
                margin="normal"
                required
                className={classes.textAlignLeft}
                onChange={handleChange("phone")}
                value={values.phone}
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
        <Dialog
          onClose={closeDialog}
          aria-labelledby="customized-dialog-title"
          open={values.showDialog}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={closeDialog}
            classes={classes}
          >
            {values.successDialog
              ? "Tambah Pengguna Berhasil"
              : "Tambah Pengguna Gagal"}
          </DialogTitle>
          <MuiDialogContent dividers>
            <Box component="div" textAlign="center">
              {values.successDialog ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={resetForm}
                  >
                    Tambah Pengguna Lagi
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      event.preventDefault();
                      router.push("/pengguna");
                    }}
                  >
                    Kembali ke Halaman Pengguna
                  </Button>
                </>
              ) : (
                values.errorMessage.map((error, index) => (
                  <Typography key={index}>{error}</Typography>
                ))
              )}
            </Box>
          </MuiDialogContent>
        </Dialog>
      </div>
    </SiteLayout>
  );
}

export default ProtectRoute(PatroliPage);
