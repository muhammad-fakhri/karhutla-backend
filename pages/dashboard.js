import dynamic from "next/dynamic";
import Router from 'next/router';
const LoginPage = dynamic(() => import("./login"));
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import SiteLayout from '../components/Layout/SiteLayout';
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Map from '../components/Map/Map';
import classNames from "classnames";
import styles from "../assets/jss/nextjs-material-kit/pages/dashboardPage";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

export default function DashboardPage(props) {
    React.useEffect(() => {
        if (props.loggedIn) return; // do nothing if already logged in
        Router.replace("/dashboard", "/login", { shallow: true });
    }, [props.loggedIn]);


    // Load login page if not logged in
    if (props.loggedIn != undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

    // If logged in load dashboard page 
    const classes = useStyles();

    const [date, setDate] = React.useState(props.todayDate);

    return (
        <SiteLayout headerColor='info'>
            <div>
                <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
                    <h2>Sebaran Patroli</h2>
                    <Map
                        center={
                            {
                                lat: -1.5,
                                lng: 117.384
                            }
                        }
                        zoom={5.1}
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
                                            setDate(getTodayDate(date.format("YYYY-MM-DD")));
                                        }}
                                        closeOnSelect={true}
                                        locale="id"
                                    />
                                </FormControl>
                            </h3>
                        </GridItem>
                        <GridItem xs={4}>
                            <h2>Patroli Terpadu</h2>
                            <h3>0</h3>
                        </GridItem>
                        <GridItem xs={4}>
                            <h2>Patroli Mandiri</h2>
                            <h3>0</h3>
                        </GridItem>
                        <GridItem xs={4}>
                            <h2>Patroli Pencegahan</h2>
                            <h3>0</h3>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </SiteLayout>
    );
}

function getTodayDate(date) {
    let inputDate;
    if (date) {
        inputDate = Date.parse(date);
    }
    let todayDateTime = date ? new Date(inputDate) : new Date();
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
    return `${todayDateTime.getDate()} ${months[todayDateTime.getMonth()]} ${todayDateTime.getFullYear()}`;
}

export async function getServerSideProps(context) {
    const cookieList = {},
        rc = context.req.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        let parts = cookie.split('=');
        cookieList[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    let loggedIn;
    cookieList['token'] ? loggedIn = true : loggedIn = false;

    return {
        props: {
            loggedIn,
            todayDate: getTodayDate()
        }
    }
}