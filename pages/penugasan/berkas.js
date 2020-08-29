import 'date-fns';
import dynamic from "next/dynamic";
import Router from 'next/router';
const LoginPage = dynamic(() => import("../login"));
import { getTokenFromRequest } from '../../context/auth';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SiteLayout from '../../components/Layout/SiteLayout';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button";
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/suratTugas/berkasPage";
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

export default function DashboardPage(props) {
  const classes = useStyles();
  React.useEffect(() => {
    if (props.loggedIn) return; // do nothing if already logged in
    Router.replace("/penugasan/berkas", "/login", { shallow: true });
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

  const handleFileChange = (event) => {
    setWorkFile(event.target.files[0])
    console.log(event.target.files[0])
  };

  const handleClick = () => {
    const data = new FormData();
    data.append('file', workFile);
  };

  return (
    <SiteLayout headerColor='info'>
      <div>
        <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
          <h2>Upload Berkas Excel Penugasan</h2>
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
              <GridItem sm={4} xs={10}>
                <TextField
                  id="outlined-number"
                  margin="normal"
                  label="Berkas Excel"
                  type="file"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="file"
                  onChange={handleFileChange}
                  className={classes.textAlignLeft}
                />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem sm={3} xs={10}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleClick}
                  fullWidth
                >
                  Upload
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      loggedIn: getTokenFromRequest(context)
    }
  }
}