import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import classNames from 'classnames';
import MaterialTable from 'material-table';
import useSWR from 'swr';
import styles from '../../assets/jss/nextjs-material-kit/pages/patroliPencegahanPage';
import SiteLayout from '../../components/Layout/SiteLayout';
import { simaduApiUrl } from '../../services/config';
import PatroliService from '../../services/PatroliService';
import { ProtectRoute } from '../../context/auth';

const column = [
    { title: 'Tanggal', field: 'patrolDate' },
    { title: 'Daerah Operasi', field: 'operationRegion' },
    { title: 'Daerah Patroli', field: 'patrolRegion' },
];

function PatroliPencegahanPage(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [pencegahan, setPencegahan] = React.useState();

    const { data, error } = useSWR(simaduApiUrl + '/list', PatroliService.getAllPatroliPencegahan);
    // TODO: change endpoint with endpoint for fetching all pencegahan patrol data
    React.useEffect(() => {
        setPencegahan(data);
    }, [data]);

    return (
        <SiteLayout headerColor="info">
            <div>
                <div className={classNames(classes.main, classes.mainRaised, classes.textCenter)}>
                    <h2>Data Patroli Pencegahan</h2>
                    <MaterialTable
                        title='10 Hari Terakhir'
                        columns={column}
                        components={{
                            Container: props => <Paper {...props} elevation={0} />
                        }}
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
                </div>
            </div>
        </SiteLayout>
    );
}

export default ProtectRoute(PatroliPencegahanPage);