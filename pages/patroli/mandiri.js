import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import classNames from 'classnames';
import MaterialTable from 'material-table';
import useSWR from 'swr';
import styles from "../../assets/jss/nextjs-material-kit/pages/patroliMandiriPage";
import SiteLayout from '../../components/Layout/SiteLayout';
import Loader from '../../components/Loader/Loader';
import { simaduApiUrl } from '../../services/config';
import PatroliService from '../../services/PatroliService';
import useAuth, { ProtectRoute } from '../../context/auth';

const column = [
    { title: 'Tanggal', field: 'patrolDate' },
    { title: 'Daerah Operasi', field: 'operationRegion' },
    { title: 'Daerah Patroli', field: 'patrolRegion' },
];

function PatroliMandiriPage(props) {
    const useStyles = makeStyles(styles);
    const { loading } = useAuth();
    const classes = useStyles();
    const [mandiri, setMandiri] = React.useState({});

    const { data, isValidating } = useSWR(simaduApiUrl + '/list', PatroliService.getAllPatroliMandiri);
    const showLoader = loading || isValidating;
    // TODO: change endpoint with endpoint for fetching all mandiri patrol data
    React.useEffect(() => {
        setMandiri(data);
    }, [data]);

    return (
        showLoader ? (
            <Loader />
        ) : (
                <SiteLayout headerColor="info">
                    <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
                        <h2>Data Patroli Mandiri</h2>
                        <MaterialTable
                            title='5 Hari Terakhir'
                            columns={column}
                            components={{
                                Container: props => <Paper {...props} elevation={0} />
                            }}
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
                    </div>
                </SiteLayout>
            )
    );
}

export default ProtectRoute(PatroliMandiriPage);