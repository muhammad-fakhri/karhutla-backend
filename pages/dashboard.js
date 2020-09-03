import dynamic from "next/dynamic";
import Router from 'next/router';
import moment from 'moment';
const LoginPage = dynamic(() => import("./login"));
import { getTokenFromRequest } from '../context/auth';
import PatroliService from '../services/PatroliService';
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

export default function DashboardPage(props) {
    const classes = useStyles();
    const [date, setDate] = React.useState(moment());
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
    React.useEffect(() => {
        const updatePatroli = async () => {
            let patroliData = await PatroliService.getPatroli(date.format('D-M-YYYY'));
            setSpots(patroliData.patroliSpots);
            setMandiri(patroliData.counter.mandiri);
            setPencegahan(patroliData.counter.pencegahan);
            setTerpadu(patroliData.counter.terpadu);
        }
        updatePatroli();
    }, [date]);

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
                        isLoggedin={props.loggedIn}
                    />
                    <GridContainer>
                        <GridItem xs={12}>
                            <h3>
                                Tanggal: {date.format('D MMMM YYYY')}
                                <br />
                                <FormControl className={classNames(classes.formChooseDate, classes.textCenter)}>
                                    <Datetime
                                        timeFormat={false}
                                        inputProps={{ placeholder: "Pilih tanggal patroli ..." }}
                                        onChange={(date) => {
                                            setDate(date);
                                        }}
                                        closeOnSelect={true}
                                        locale="id"
                                    />
                                </FormControl>
                            </h3>
                        </GridItem>
                        <GridItem sm={10} md={4}>
                            <h2 className={classes.terpaduBg}>Patroli Terpadu</h2>
                            <h3>{terpadu}</h3>
                        </GridItem>
                        <GridItem sm={10} md={4}>
                            <h2 className={classes.mandiriBg}>Patroli Mandiri</h2>
                            <h3>{mandiri}</h3>
                        </GridItem>
                        <GridItem sm={10} md={4}>
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