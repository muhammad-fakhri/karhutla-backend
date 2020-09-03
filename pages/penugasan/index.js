import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MaterialTable from 'material-table';
import Link from 'next/link';
import SiteLayout from "../../components/Layout/SiteLayout";
import Button from '../../components/CustomButtons/Button'
import styles from "../../assets/jss/nextjs-material-kit/pages/suratTugas/index";
import { ProtectRoute } from '../../context/auth';

const useStyles = makeStyles(styles);

function PenugasanPage(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        columns: [
            { title: 'Jenis', field: 'type' },
            { title: 'Nomor Surat', field: 'number' },
            { title: 'Tanggal Mulai', field: 'startDate' },
            { title: 'Tanggal Selesai', field: 'finishDate' },
        ],
        data: [
            { type: 'Terpadu', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Zerya Betül', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Terpadu', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Terpadu', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Mandiri', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Mandiri', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Mandiri', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '29-08-2020' },
            { type: 'Mandiri', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Pencegahan', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Pencegahan', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
            { type: 'Pencegahan', number: 'GADA213NASD1', startDate: '23-08-2020', finishDate: '31-08-2020' },
        ],
    });

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
                        columns={state.columns}
                        data={state.data}
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