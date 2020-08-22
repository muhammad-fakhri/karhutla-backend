import dynamic from "next/dynamic";
import Router from 'next/router';
import { getTokenFromRequest } from '../context/auth';
const LoginPage = dynamic(() => import("./login"));
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import SiteLayout from "../components/Layout/SiteLayout";
import Button from '../components/CustomButtons/Button'
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
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

function AnggotaPage(props) {
    const classes = useStyles();

    // Load login page if not logged in
    React.useEffect(() => {
        if (props.loggedIn) return; // do nothing if already logged in
        Router.replace("/pengguna", "/login", { shallow: true });
    }, [props.loggedIn]);

    if (props.loggedIn !== undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

    const [openManual, setOpenManual] = React.useState(false);
    const [state, setState] = React.useState({
        columns: [
            { title: 'Instansi', field: 'organization' },
            { title: 'Daerah Operasi', field: 'region' },
            { title: 'NIP', field: 'nipNumber' },
            { title: 'Nama', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Nomor HP', field: 'phoneNumber' },
        ],
        data: [
            { organization: 'Daops', region: 'Terpadu', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Daops', region: 'Zerya Betül', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Daops', region: 'Terpadu', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Daops', region: 'Terpadu', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Daops', region: 'Mandiri', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Daops', region: 'Mandiri', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Balai', region: '-', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Balai', region: '-', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Balai', region: '-', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Balai', region: '-', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
            { organization: 'Balai', region: '-', nipNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
        ],
    });

    const handleOpenManual = () => {
        setOpenManual(true);
    };

    const handleCloseManual = () => {
        setOpenManual(false);
    };

    const handleManualFormSubmit = () => {
        const data = new FormData();
        data.append('file', workFile);
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
                    <h2>Daftar Pengguna Daops/Balai</h2>
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
                        onClick={handleOpenManual}
                    >
                        Tambah Pengguna
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
                                tooltip: 'Edit Pengguna',
                                onClick: (event, rowData) => {
                                    alert("You edit " + rowData.name)
                                }
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Hapus Pengguna',
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
                <Dialog onClose={handleCloseManual} aria-labelledby="customized-dialog-title" open={openManual}>
                    <DialogTitle id="customized-dialog-title" onClose={handleCloseManual} classes={classes}>
                        Tambah Pengguna Daops/Balai
                    </DialogTitle>
                    <MuiDialogContent dividers>
                        <form noValidate autoComplete="off">
                            <GridContainer justify="center">
                                <GridItem sm={8}>
                                    <TextField
                                        id="operation-region"
                                        select
                                        label="Asal Instansi"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    >
                                        <MenuItem key={'a'} value={'a'}>
                                            Daops
                                        </MenuItem>
                                        <MenuItem key={'b'} value={'b'}>
                                            Balai
                                        </MenuItem>
                                    </TextField>
                                    <TextField
                                        id="operation-region"
                                        select
                                        label="Daerah Operasi"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    >
                                        <MenuItem key={'a'} value={'a'}>
                                            Lahat
                                        </MenuItem>
                                        <MenuItem key={'b'} value={'b'}>
                                            B
                                        </MenuItem>
                                        <MenuItem key={'c'} value={'c'}>
                                            C
                                        </MenuItem>
                                    </TextField>
                                    <TextField
                                        id="operation-region"
                                        label="NIP"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    />
                                    <TextField
                                        id="operation-region"
                                        label="Nama"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    />
                                    <TextField
                                        id="operation-region"
                                        select
                                        label="Jabatan"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    >
                                        <MenuItem key={'a'} value={'a'}>
                                            Kepala
                                        </MenuItem>
                                        <MenuItem key={'b'} value={'b'}>
                                            Admin
                                        </MenuItem>
                                    </TextField>
                                    <TextField
                                        id="operation-region"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    />
                                    <TextField
                                        id="operation-region"
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    />
                                    <TextField
                                        id="operation-region"
                                        label="Konfirmasi Password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    />
                                    <TextField
                                        id="operation-region"
                                        label="Nomor HP"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        className={classes.textAlignLeft}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleManualFormSubmit}
                                        fullWidth
                                    >
                                        Tambah Pengguna
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </form>
                    </MuiDialogContent>
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