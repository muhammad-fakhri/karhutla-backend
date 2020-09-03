import SiteLayout from '../components/Layout/SiteLayout';
import { Icon, Grid } from '@material-ui/core';
import Map from "../components/Map/MapHotspot";
import classNames from "classnames";
import styles from "../assets/jss/nextjs-material-kit/pages/hotspotPage";
import { makeStyles } from "@material-ui/core/styles";
import { ProtectRoute } from '../context/auth';
import moment from 'moment';
const useStyles = makeStyles(styles);

function HotspotPage(props) {
    const classes = useStyles();
    const [hotspot, setHotspot] = React.useState([]);
    React.useEffect(() => {
        const getHotspot = async () => {
            let todayDate = moment().format('D-MM-YYYY');
            let province = 'a';
            let responses = new Array();
            let hotspots = new Array();
            try {
                const url = `http://103.129.223.216/siavipala/public/api/hotspot-sipongi/date-range?start_date=${todayDate}&end_date=${todayDate}&provinsi=${province}`;
                const res = await (await fetch(url)).json();
                responses = res.hostspot_sipongi;
                responses.forEach((item) => {
                    item.sebaran_hotspot.forEach((item) => {
                        hotspots.push(item);
                    });
                });
                setHotspot(hotspots);
            } catch (error) {
                console.log(error);
            }
        }
        getHotspot();
    }, []);

    return (
        <SiteLayout headerColor='info'>
            <div>
                <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
                    <h2>
                        <Icon className={classes.icon} color={"error"}>fiber_manual_record</Icon>
                        SIPONGI Live Update
                    </h2>
                    <Grid container>
                        <Grid item xs={12}>
                            <h3>
                                Tanggal: {moment().format('D MMMM YYYY')}
                                <br />
                                Pukul: {moment().format('HH:mm')}
                            </h3>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h2>Titik Panas</h2>
                            <h3>{hotspot.length}</h3>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h2>Rentang Data</h2>
                            <h3>24h</h3>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h2>Confidence Level</h2>
                            <h3>80%</h3>
                        </Grid>
                    </Grid>
                    <Map
                        center={
                            {
                                lat: -1.5,
                                lng: 117.384
                            }
                        }
                        zoom={5.1}
                        hotspots={hotspot}
                    />
                </div>
            </div>
        </SiteLayout>
    );
}

export default ProtectRoute(HotspotPage);