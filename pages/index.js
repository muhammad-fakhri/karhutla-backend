import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles"
import Icon from '@material-ui/core/Icon'
import SiteLayout from '../components/Layout/SiteLayout';
import Parallax from "../components/Parallax/Parallax.js"
import GridContainer from "../components/Grid/GridContainer.js"
import GridItem from "../components/Grid/GridItem.js"
import Map from "../components/Map/Map.js"
import fetch from 'isomorphic-unfetch';

import styles from "../assets/jss/nextjs-material-kit/pages/frontPage.js"

const useStyles = makeStyles(styles)

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
    'time': `${hour}:${minute}`
  }
}

function FrontPage(props) {
  const classes = useStyles();
  const todayDate = getTodayDate();

  return (
    <SiteLayout>
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
          <h2>
            <Icon className={classes.icon} color={"error"}>fiber_manual_record</Icon>
          SIPONGI Live Update
          </h2>
          <Map
            center={
              {
                lat: -1.5,
                lng: 117.384
              }
            }
            zoom={5.1}
            hotspots={props.hotspots}
          />
          <GridContainer>
            <GridItem xs={12}>
              <h3>
                Tanggal: {todayDate.date}
                <br />
                Pukul: {todayDate.time}
              </h3>
            </GridItem>
            <GridItem xs={4}>
              <h2>Titik Panas</h2>
              <h3>{props.hotspots.length}</h3>
            </GridItem>
            <GridItem xs={4}>
              <h2>Rentang Data</h2>
              <h3>24h</h3>
            </GridItem>
            <GridItem xs={4}>
              <h2>Confidence Level</h2>
              <h3>80%</h3>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  let hotspotResponses = new Array()
  let hotspots = new Array();

  try {
    const url = 'http://103.129.223.216/siavipala/public/api/hotspot-sipongi/date-range?start_date=01-08-2020&end_date=01-08-2020&provinsi=a';
    const res = await (await fetch(url)).json();
    hotspotResponses = res.hostspot_sipongi;
    hotspotResponses.forEach((item) => {
      item.sebaran_hotspot.forEach((item) => {
        hotspots.push(item);
      });
    });
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      hotspots
    }
  }
}

export default FrontPage