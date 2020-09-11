import moment from 'moment';
import classNames from "classnames";
import useAuth, { ProtectRoute } from '../context/auth';
import PatroliService from '../services/PatroliService';
import MaterialTable from 'material-table';
import Datetime from "react-datetime";
import { Divider, FormControl, Grid, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SiteLayout from '../components/Layout/SiteLayout';
import MapContainer from '../components/Map/MapPatroli';
import Loader from '../components/Loader/Loader';
import styles from "../assets/jss/nextjs-material-kit/pages/dashboardPage";
import useSWR from 'swr';
const useStyles = makeStyles(styles);

const column = [
    { title: 'Tanggal', field: 'patrolDate' },
    { title: 'Daerah Operasi', field: 'operationRegion' },
    { title: 'Daerah Patroli', field: 'patrolRegion' },
];

function DashboardPage(props) {
    const classes = useStyles();
    const { isAuthenticated } = useAuth();
    const [load, setLoad] = React.useState(true);
    const [date, setDate] = React.useState(moment());
    const [mandiriCounter, setMandiriCounter] = React.useState(0);
    const [pencegahanCounter, setPencegahanCounter] = React.useState(0);
    const [terpaduCounter, setTerpaduCounter] = React.useState(0);
    const [terpadu, setTerpadu] = React.useState();
    const [mandiri, setMandiri] = React.useState();
    const [pencegahan, setPencegahan] = React.useState();
    const [spots, setSpots] = React.useState();
    const { data: patroliData, isValidating } = useSWR(
        isAuthenticated && date.format('D-M-YYYY') === moment().format('D-M-YYYY')
            ? `/list?tanggal_patroli=${date.format('D-M-YYYY')}`
            : null,
        PatroliService.getPatroli
    );
    React.useEffect(() => {
        const updatePatroli = async () => {
            let patroliData = await PatroliService.getPatroli(null, date.format('D-M-YYYY'));
            setSpots(patroliData.patroliSpots);
            setMandiriCounter(patroliData.counter.mandiri);
            setPencegahanCounter(patroliData.counter.pencegahan);
            setTerpaduCounter(patroliData.counter.terpadu);
            setTerpadu(patroliData.patroliTerpadu);
            setMandiri(patroliData.patroliMandiri);
            setPencegahan(patroliData.patroliPencegahan)
            setLoad(false);
        }
        if (isAuthenticated) updatePatroli();
    }, [date, isAuthenticated, patroliData]);

    return (
        !isAuthenticated ? (
            <Loader />
        ) : (
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
                                isLoggedin={isAuthenticated}
                            />
                            <Grid container justify='center'>
                                <Grid item xs={12}>
                                    <h3>
                                        Tanggal: {date.format('D MMMM YYYY')}
                                        <br />
                                        <FormControl className={classNames(classes.formChooseDate, classes.textCenter)}>
                                            <Datetime
                                                timeFormat={false}
                                                inputProps={{ placeholder: "Pilih tanggal patroli ..." }}
                                                onChange={(date) => {
                                                    setDate(date);
                                                    setLoad(true);
                                                }}
                                                closeOnSelect={true}
                                                locale="id"
                                            />
                                        </FormControl>
                                    </h3>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h2 className={classes.terpaduBg}>Patroli Terpadu</h2>
                                    {isValidating || load ? (<CircularProgress />) : (<h3>{terpaduCounter}</h3>)}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h2 className={classes.mandiriBg}>Patroli Mandiri</h2>
                                    {isValidating || load ? (<CircularProgress />) : (<h3>{mandiriCounter}</h3>)}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h2 className={classes.pencegahanBg}>Patroli Pencegahan</h2>
                                    {isValidating || load ? (<CircularProgress />) : (<h3>{pencegahanCounter}</h3>)}
                                </Grid>
                                <Grid item xs={12} className={classes.divider}>
                                    <Divider variant='middle' />
                                </Grid>
                                <Grid item xs={12} className={classes.table}>
                                    <MaterialTable
                                        title="Data Patroli Terpadu"
                                        components={{
                                            Container: props => <Paper {...props} elevation={0} />
                                        }}
                                        columns={column}
                                        data={terpadu}
                                        options={{
                                            search: true,
                                            actionsColumnIndex: -1
                                        }}
                                        actions={[
                                            {
                                                icon: CloudDownloadIcon,
                                                tooltip: 'Download Laporan',
                                                onClick: (event, rowData) => window.open(rowData.reportLink)
                                            }
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.table}>
                                    <MaterialTable
                                        title="Data Patroli Mandiri"
                                        components={{
                                            Container: props => <Paper {...props} elevation={0} />
                                        }}
                                        columns={column}
                                        data={mandiri}
                                        options={{
                                            search: true,
                                            actionsColumnIndex: -1
                                        }}
                                        actions={[
                                            {
                                                icon: CloudDownloadIcon,
                                                tooltip: 'Download Laporan',
                                                onClick: (event, rowData) => window.open(rowData.reportLink)
                                            }
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.table}>
                                    <MaterialTable
                                        title="Data Patroli Pencegahan"
                                        components={{
                                            Container: props => <Paper {...props} elevation={0} />
                                        }}
                                        columns={column}
                                        data={pencegahan}
                                        options={{
                                            search: true,
                                            actionsColumnIndex: -1
                                        }}
                                        actions={[
                                            {
                                                icon: CloudDownloadIcon,
                                                tooltip: 'Download Laporan',
                                                onClick: (event, rowData) => window.open(rowData.reportLink)
                                            }
                                        ]}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </SiteLayout>
            )
    );
}

export default ProtectRoute(DashboardPage);