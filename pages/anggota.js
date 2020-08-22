import dynamic from "next/dynamic";
import Router from 'next/router';
import { getTokenFromRequest } from '../context/auth';
const LoginPage = dynamic(() => import("./login"));
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import Link from 'next/link';
import SiteLayout from "../components/Layout/SiteLayout";
import Button from '../components/CustomButtons/Button'
import classNames from "classnames";
import styles from "../assets/jss/nextjs-material-kit/pages/anggotaPage";

const useStyles = makeStyles(styles);

const DialogTitle = props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};

// const DialogContent = withStyles((theme) => ({
//     root: {
//         padding: theme.spacing(2),
//     },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);


function AnggotaPage(props) {
    const classes = useStyles();

    // Load login page if not logged in
    React.useEffect(() => {
        if (props.loggedIn) return; // do nothing if already logged in
        Router.replace("/surat-tugas", "/login", { shallow: true });
    }, [props.loggedIn]);

    if (props.loggedIn !== undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

    const [openOption, setOpenOption] = React.useState(false);
    const [state, setState] = React.useState({
        columns: [
            { title: 'Daerah Operasi', field: 'region' },
            { title: 'Nomor Registrasi', field: 'registrationNumber' },
            { title: 'Nama', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Nomor HP', field: 'phoneNumber' },
        ],
        data: [
            { region: 'Terpadu', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Zerya Betül', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Terpadu', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Terpadu', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Mandiri', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Mandiri', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Mandiri', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Mandiri', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Pencegahan', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Pencegahan', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { region: 'Pencegahan', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
        ],
    });

    const handleOpenOption = () => {
        setOpenOption(true);
    };

    const handleCloseOption = () => {
        setOpenOption(false);
    };

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
                    <h2>Daftar Anggota</h2>
                </Grid>
                <Grid
                    item
                    xs={3}
                    align="center"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddBoxIcon />}
                        onClick={handleOpenOption}
                    >
                        Tambah Anggota
                    </Button>
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
                                tooltip: 'Edit Anggota',
                                onClick: (event, rowData) => {
                                    alert("You edit " + rowData.name)
                                }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Hapus Anggota',
                                onClick: (event, rowData) => {
                                    alert("You delete " + rowData.name)
                                }
                            }
                        ]}
                        options={{
                            search: true,
                            actionsColumnIndex: -1
                        }}
                    />
                </Grid>
                <Dialog onClose={handleCloseOption} aria-labelledby="customized-dialog-title" open={openOption}>
                    <DialogTitle id="customized-dialog-title" onClose={handleCloseOption} classes={classes}>
                        Tambah Anggota
                    </DialogTitle>
                    <MuiDialogContent dividers>
                        <Typography gutterBottom align='justify'>
                            Silakan pilih cara menambah anggota, melalui <strong>upload template</strong> atau <strong>isi manual</strong>.
                            Anda bisa download templatenya dengan menekan tombol "Download Template"
                        </Typography>
                        <Box component="div" textAlign="center">
                            <Button variant="contained" color="primary">
                                Upload Template
                            </Button>
                            <Button variant="contained" color="primary">
                                Isi Manual
                            </Button>
                            <Button variant="contained" color="grey">
                                Download Template
                            </Button>
                        </Box>
                    </MuiDialogContent>
                    {/* <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Save changes
                        </Button>
                    </DialogActions> */}
                </Dialog>
            </Grid>
        </SiteLayout >
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            loggedIn: getTokenFromRequest(context)
        }
    }
}

export default AnggotaPage;