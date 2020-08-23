import dynamic from "next/dynamic";
import Router from 'next/router';
const LoginPage = dynamic(() => import("./login"));
import { getTokenFromRequest } from '../context/auth';
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import SiteLayout from '../components/Layout/SiteLayout';
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import MapContainer from '../components/Map/MapPatroli';
import classNames from "classnames";
import styles from "../assets/jss/nextjs-material-kit/pages/dashboardPage";
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

export default function DashboardPage(props) {
    const classes = useStyles();
    const [date, setDate] = React.useState(getTodayDate().plainDate);
    const [mandiri, setMandiri] = React.useState(0);
    const [pencegahan, setPencegahan] = React.useState(0);
    const [terpadu, setTerpadu] = React.useState(0);
    const [spots, setSpots] = React.useState();

    React.useEffect(() => {
        if (props.loggedIn) return; // do nothing if already logged in
        Router.replace("/dashboard", "/login", { shallow: true });
    }, [props.loggedIn]);

    // Load login page if not logged in
    if (props.loggedIn !== undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

    // If logged in, load dashboard page
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
        <SiteLayout headerColor='info'>
            <div>
                <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
                    <h2>Sebaran Patroli</h2>
                    <MapContainer
                        center={{
                            lat: -1.5,
                            lng: 117.384
                        }}
                        zoom={5.1}
                        spots={spots}
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
                            <h2>Patroli Terpadu</h2>
                            <h3>{terpadu}</h3>
                        </GridItem>
                        <GridItem xs={4}>
                            <h2>Patroli Mandiri</h2>
                            <h3>{mandiri}</h3>
                        </GridItem>
                        <GridItem xs={4}>
                            <h2>Patroli Pencegahan</h2>
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