import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import classNames from 'classnames';
import MaterialTable from 'material-table';
import useSWR from 'swr';
import styles from "../../assets/jss/nextjs-material-kit/pages/patroliTerpaduPage";
import SiteLayout from '../../components/Layout/SiteLayout';
import { simaduApiUrl } from '../../services/config';
import PatroliService from '../../services/PatroliService';
import { ProtectRoute } from '../../context/auth';

const column = [
    { title: 'Tanggal', field: 'patrolDate' },
    { title: 'Daerah Operasi', field: 'operationRegion' },
    { title: 'Daerah Patroli', field: 'patrolRegion' },
];

function PatroliTerpaduPage(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [terpadu, setTerpadu] = React.useState();

    const { data, error } = useSWR(simaduApiUrl + '/list', PatroliService.getAllPatroliTerpadu);
    // TODO: change endpoint with endpoint for fetching all terpadu patrol data
    React.useEffect(() => {
        setTerpadu(data);
    }, [data]);

    return (
        <SiteLayout headerColor="info">
            <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
                <h2>Data Patroli Terpadu</h2>
                <MaterialTable
                    title=''
                    columns={column}
                    components={{
                        Container: props => <Paper {...props} elevation={0} />
                    }}
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
            </div>
        </SiteLayout>
    );
}

export default ProtectRoute(PatroliTerpaduPage);