import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MaterialTable from 'material-table';
import Link from 'next/link';
import SiteLayout from "../../components/Layout/SiteLayout";
import Button from '../../components/CustomButtons/Button'
import styles from "../../assets/jss/nextjs-material-kit/pages/suratTugas/index";
import { ProtectRoute } from '../../context/auth';
import useSWR from 'swr';
import PenugasanService from '../../services/PenugasanService';
import { apiUrl } from '../../services/config';

const useStyles = makeStyles(styles);

const columns = [
    { title: 'Jenis', field: 'type' },
    { title: 'Nomor Surat', field: 'number' },
    { title: 'Tanggal Mulai', field: 'startDate' },
    { title: 'Tanggal Selesai', field: 'finishDate' },
];

function PenugasanPage(props) {
    const classes = useStyles();
    const [penugasan, setPenugasan] = React.useState([]);
    const { data, error } = useSWR(
        apiUrl + "/penugasan/list",
        PenugasanService.getAllPenugasan
    );
    React.useEffect(() => {
        setPenugasan(data);
    }, [data]);

    return (
        <SiteLayout headerColor="info">
            <Grid
                container
                justify="center"
                className={classes.gridContainer}
            >
                <Grid
                    item
                    xs={10}
                    align="center"
                    className={classes.title}>
                    <h2>Daftar Penugasan</h2>
                </Grid>
                <Grid
                    item
                    xs={3}
                    align="center"
                >
                    <Link href="penugasan/input">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddBoxIcon />}
                        >
                            Tambah Penugasan
                    </Button>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={10}
                    align="center"
                    className={classes.gridItem}>
                    <MaterialTable
                        title=""
                        columns={columns}
                        data={penugasan}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Data',
                                onClick: (event, rowData) => {
                                    alert("You edit " + rowData.type)
                                }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete Data',
                                onClick: (event, rowData) => {
                                    alert("You delete " + rowData.type)
                                }
                            }
                        ]}
                        options={{
                            search: true,
                            actionsColumnIndex: -1
                        }}
                    />
                </Grid>
            </Grid>
        </SiteLayout >
    );
}

export default ProtectRoute(PenugasanPage);