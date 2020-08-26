import dynamic from "next/dynamic";
import Router from 'next/router';
const LoginPage = dynamic(() => import("./login"));
import { getTokenFromRequest } from '../context/auth';
import SiteLayout from '../components/Layout/SiteLayout';
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Icon from '@material-ui/core/Icon';
import Map from "../components/Map/MapHotspot";
import fetch from 'isomorphic-unfetch';
import classNames from "classnames";
import styles from "../assets/jss/nextjs-material-kit/pages/hotspotPage";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

function getTodayDate() {
    const todayDateTime = new Date();
    const months = [
        "Januari",
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

export default function HotspotPage(props) {
    const classes = useStyles();

    React.useEffect(() => {
        if (props.loggedIn) return; // do nothing if already logged in
        Router.replace("/dashboard", "/login", { shallow: true });
    }, [props.loggedIn]);

    // Load login page if not logged in
    if (props.loggedIn !== undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

    // If logged in, load dashboard page
    return (
        <SiteLayout headerColor='info'>
            <div>
                <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
                    <h2>
                        <Icon className={classes.icon} color={"error"}>fiber_manual_record</Icon>
                        SIPONGI Live Update
                    </h2>
                    <GridContainer>
                        <GridItem xs={12}>
                            <h3>
                                Tanggal: {props.todayDate.date}
                                <br />
                                Pukul: {props.todayDate.time}
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
                </div>
            </div>
        </SiteLayout>
    );
}

export async function getServerSideProps(context) {
    let todayDate = getTodayDate();
    let province = 'a';
    let hotspotResponses = new Array();
    let hotspots = new Array();
    try {
        const url = `http://103.129.223.216/siavipala/public/api/hotspot-sipongi/date-range?start_date=${todayDate.plainDate}&end_date=${todayDate.plainDate}&provinsi=${province}`;
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
            loggedIn: getTokenFromRequest(context),
            hotspots,
            todayDate,
        }
    }
}