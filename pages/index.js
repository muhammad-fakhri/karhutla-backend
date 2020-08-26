import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { getTokenFromRequest } from '../context/auth';
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import SiteLayout from '../components/Layout/SiteLayout';
import Parallax from "../components/Parallax/Parallax.js";
import GridContainer from "../components/Grid/GridContainer.js";
import MapContainer from '../components/Map/MapPatroli';
import GridItem from "../components/Grid/GridItem.js";
import fetch from 'isomorphic-unfetch';
import styles from "../assets/jss/nextjs-material-kit/pages/frontPage.js";
const useStyles = makeStyles(styles);

function getTodayDate() {
  const todayDateTime = new Date();
  const months = ["Januari",
    "Februari",
    "Maret",
    "April",
    "Mungkin",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"];
  let hour = todayDateTime.getHours();
  let minute = todayDateTime.getMinutes();
  if (hour < 10) hour = '0' + hour;
  if (minute < 10) minute = '0' + minute;
  return {
    'date': `${todayDateTime.getDate()} ${months[todayDateTime.getMonth()]} ${todayDateTime.getFullYear()}`,
    'time': `${hour}:${minute}`,
    'plainDate': `${todayDateTime.getDate()}-${(todayDateTime.getMonth() + 1)}-${todayDateTime.getFullYear()}`
  }
}

export default function FrontPage(props) {
  const classes = useStyles();
  const [date, setDate] = React.useState(getTodayDate().plainDate);
  const [mandiri, setMandiri] = React.useState(0);
  const [pencegahan, setPencegahan] = React.useState(0);
  const [terpadu, setTerpadu] = React.useState(0);
  const [spots, setSpots] = React.useState();

  const getPatroli = async (date) => {
    try {
      let patroliSpots = new Array();
      let counter = {
        mandiri: 0,
        pencegahan: 0,
        terpadu: 0
      };
      const url = `http://103.129.223.216/api/simadu/list?tanggal_patroli=${date}`;
      const res = await (await fetch(url)).json();
      let patroliData = res.data;
      patroliData.forEach((item) => {
        item.forEach(patroli => {
          let data = {};
          data.latitude = patroli.laporanDarat[0].latitude;
          data.longitude = patroli.laporanDarat[0].longitude;

          const baseMarkerUrl = 'http://maps.google.com/mapfiles/ms/icons/';
          if (patroli.kategori_patroli == 'Mandiri') {
            data.marker = baseMarkerUrl + "blue-dot.png";
            counter.mandiri++;
          }
          if (patroli.kategori_patroli == 'Pencegahan') {
            data.marker = baseMarkerUrl + "green-dot.png";
            counter.pencegahan++;
          }
          if (patroli.kategori_patroli == 'Terpadu') {
            data.marker = baseMarkerUrl + "yellow-dot.png";
            counter.terpadu++;
          }
          data.patroli = patroli;

          patroliSpots.push(data);
        });
      });

      setSpots(patroliSpots);
      setMandiri(counter.mandiri);
      setPencegahan(counter.pencegahan);
      setTerpadu(counter.terpadu);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getPatroli(getTodayDate().plainDate);
  }, []);

  return (
    <SiteLayout scrollChange={true}>
      <div>
        <Parallax image={require("assets/img/forest-fire.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>SIMADU2</h1>
                  <h3 className={classes.subtitle}>
                    Website monitoring patroli kebakaran hutan di wilayah Pulau Sumatera, Indonesia.
                </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
          <h2>Sebaran Patroli</h2>
          <MapContainer
            center={{
              lat: -1.5,
              lng: 117.384
            }}
            zoom={5.1}
            spots={spots}
            isLoggedin={props.loggedIn}
          />
          <GridContainer>
            <GridItem xs={12}>
              <h3>
                Tanggal: {date}
                <br />
                <FormControl className={classNames(classes.formChooseDate, classes.textCenter)}>
                  <Datetime
                    timeFormat={false}
                    inputProps={{ placeholder: "Pilih tanggal patroli ..." }}
                    onChange={(date) => {
                      getPatroli(date.format('YYYY-MM-DD'));
                      setDate(date.format('D MMMM YYYY'));
                    }}
                    closeOnSelect={true}
                    locale="id"
                  />
                </FormControl>
              </h3>
            </GridItem>
            <GridItem xs={4}>
              <h2 className={classes.terpaduBg}>Patroli Terpadu</h2>
              <h3>{terpadu}</h3>
            </GridItem>
            <GridItem xs={4}>
              <h2 className={classes.mandiriBg}>Patroli Mandiri</h2>
              <h3>{mandiri}</h3>
            </GridItem>
            <GridItem xs={4}>
              <h2 className={classes.pencegahanBg}>Patroli Pencegahan</h2>
              <h3>{pencegahan}</h3>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </SiteLayout>
  );
}

export async function getServerSideProps(context) {
  return {
      props: {
          loggedIn: getTokenFromRequest(context),
      }
  }
}