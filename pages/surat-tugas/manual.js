import 'date-fns';
import dynamic from "next/dynamic";
import Router from 'next/router';
const LoginPage = dynamic(() => import("../login"));
import { getTokenFromRequest } from '../../context/auth';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SiteLayout from '../../components/Layout/SiteLayout';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button";
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/suratTugas/manualPage";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

const workTypes = [
  {
    value: 'terpadu',
    label: 'Terpadu',
  },
  {
    value: 'mandiri',
    label: 'Mandiri',
  },
  {
    value: 'rutin',
    label: 'Rutin',
  },
];

export default function ManualSuratTugasPage(props) {
  const classes = useStyles();
  React.useEffect(() => {
    if (props.loggedIn) return; // do nothing if already logged in
    Router.replace("/surat-tugas/manual", "/login", { shallow: true });
  }, [props.loggedIn]);

  // Load login page if not logged in
  if (props.loggedIn !== undefined) {
    if (!props.loggedIn) return <LoginPage />;
  }

  // If logged in load dashboard page 
  const [workType, setWorkType] = React.useState('terpadu');
  const [startDate, setStartDate] = React.useState(new Date());
  const [finishDate, setFinishDate] = React.useState(new Date());
  const [workNumber, setWorkNumber] = React.useState();
  const [workFile, setWorkFile] = React.useState();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleFinishDateChange = (date) => {
    setFinishDate(date);
  };

  const handleWorkNumberChange = (number) => {
    setWorkNumber(number);
  };

  const handleWorkTypeChange = (event) => {
    setWorkType(event.target.value);
  };

  const handleClick = () => {
    const data = new FormData();
    data.append('file', workFile);
  };

  return (
    <SiteLayout headerColor='info'>
      <div>
        <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
          <h2>Input Manual Surat Tugas</h2>
          <form noValidate autoComplete="off" className={classes.form}>
            <GridContainer justify="center">
              <GridItem sm={3} xs={10}>
                <TextField
                  id="work-paper-type"
                  select
                  label="Jenis Surat Tugas"
                  value={workType}
                  onChange={handleWorkTypeChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  {workTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </GridItem>
              <GridItem sm={5} xs={10}>
                <TextField
                  id="work-paper-number"
                  label="Nomor Surat Tugas"
                  variant="outlined"
                  margin="normal"
                  value={workNumber}
                  required
                  fullWidth
                  onChange={handleWorkNumberChange}
                  className={classes.textAlignLeft} />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem sm={6} xs={10}>
                <Typography variant="h5" className={classes.title}>
                  Tanggal
                </Typography>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" alignItems="center">
              <GridItem sm={3} xs={10}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="start-date-picker"
                    margin="normal"
                    label="Tanggal Mulai"
                    format="dd/MM/yyyy"
                    value={startDate}
                    required
                    onChange={handleStartDateChange}
                    fullWidth
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    className={classes.textAlignLeft}
                  />
                </MuiPickersUtilsProvider>
              </GridItem>
              <GridItem sm={3} xs={10}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="finish-date-picker"
                    margin="normal"
                    label="Tanggal Selesai"
                    format="dd/MM/yyyy"
                    value={finishDate}
                    required
                    fullWidth
                    onChange={handleFinishDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    className={classes.textAlignLeft}
                  />
                </MuiPickersUtilsProvider>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem sm={6} xs={10}>
                <Typography variant="h5" className={classes.title}>
                  Lokasi
                </Typography>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" alignItems="center">
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  select
                  label="Daerah Operasi"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  select
                  label="Daerah Patroli"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" alignItems="center">
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  select
                  label="Provinsi"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  select
                  label="Kabupaten/Kota"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" alignItems="center">
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  select
                  label="Kecamatan"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  select
                  label="Kelurahan/Desa"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem sm={6} xs={10}>
                <Typography variant="h5" className={classes.title}>
                  Tim
                </Typography>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" alignItems="center">
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  select
                  label="Ketua"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" alignItems="center">
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  select
                  label="Anggota 1"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  label="Anggota 2"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" alignItems="center">
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  label="Anggota 3"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
              <GridItem sm={3} xs={10}>
                <TextField
                  id="operation-region"
                  label="Anggota 4"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className={classes.textAlignLeft}
                >
                  <MenuItem key={'a'} value={'a'}>
                    A
                  </MenuItem>
                  <MenuItem key={'b'} value={'b'}>
                    B
                  </MenuItem>
                  <MenuItem key={'c'} value={'c'}>
                    C
                  </MenuItem>
                </TextField>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center" className={classes.submitButton}>
              <GridItem sm={3} xs={10}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                  fullWidth
                >
                  Buat Surat Tugas
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </div>
      </div>
    </SiteLayout >
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      loggedIn: getTokenFromRequest(context)
    }
  }
}