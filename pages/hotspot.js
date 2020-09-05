import SiteLayout from '../components/Layout/SiteLayout';
import { Icon, Grid } from '@material-ui/core';
import Map from "../components/Map/MapHotspot";
import Loader from "../components/Loader/Loader";
import classNames from "classnames";
import styles from "../assets/jss/nextjs-material-kit/pages/hotspotPage";
import { makeStyles } from "@material-ui/core/styles";
import useAuth, { ProtectRoute } from '../context/auth';
import moment from 'moment';
import useSWR from 'swr';
import HotspotService from '../services/HotspotService';
import { siavipalaUrl } from '../services/config';
const useStyles = makeStyles(styles);

function HotspotPage(props) {
    const classes = useStyles();
    const { loading } = useAuth();
    const [hotspot, setHotspot] = React.useState([]);
    const [date, setDate] = React.useState(moment());
    const { data, isValidating } = useSWR(
        `${siavipalaUrl}/public/api/hotspot-sipongi/date-range?start_date=${date.format('D-MM-YYYY')}&end_date=${date.format('D-MM-YYYY')}&provinsi=a`,
        HotspotService.getHotspot
    );
    const showLoader = loading || isValidating;
    React.useEffect(() => {
        if (data) {
            setHotspot(data)
            setDate(moment());
        };
    }, [data]);

    return (
        showLoader ? (
            <Loader />
        ) : (
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
                                        Tanggal: {date.format('D MMMM YYYY')}
                                        <br />
                                        Pukul: {date.format('HH:mm:ss')}
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
            )
    );
}

export default ProtectRoute(HotspotPage);