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
        Router.replace("/surat-tugas", "/login", { shallow: true });
    }, [props.loggedIn]);

    if (props.loggedIn !== undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

    const [openOption, setOpenOption] = React.useState(false);
    const [openUpload, setOpenUpload] = React.useState(false);
    const [openManual, setOpenManual] = React.useState(false);
    const [workFile, setWorkFile] = React.useState();
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
        setOpenUpload(false);
        setOpenManual(false);
    };

    const handleCloseOption = () => {
        setOpenOption(false);
        setOpenUpload(false);
        setOpenManual(false);
    };

    const handleOpenUpload = () => {
        setOpenOption(false);
        setOpenUpload(true);
        setOpenManual(false);
    };

    const handleOpenManual = () => {
        setOpenOption(false);
        setOpenUpload(false);
        setOpenManual(true);
    };

    const handleFileChange = (event) => {
        setWorkFile(event.target.files[0])
        console.log(event.target.files[0])
    };

    const handleUploadFormSubmit = () => {
        const data = new FormData();
        data.append('file', workFile);
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
                    <h2>Daftar Anggota Manggala Agni</h2>
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
                        Tambah Anggota Manggala Agni
                    </DialogTitle>
                    <MuiDialogContent dividers>
                        <Typography gutterBottom align='justify'>
                            Silakan pilih cara menambah anggota, melalui <strong>upload template</strong> atau <strong>isi manual</strong>.
                            Anda bisa download templatenya dengan menekan tombol "Download Template"
                        </Typography>
                        <Box component="div" textAlign="center">
                            <Button variant="contained" color="primary" onClick={handleOpenUpload}>
                                Upload Template
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleOpenManual}>
                                Isi Manual
                            </Button>
                            <a href="https://drive.google.com" target="_blank">
                                <Button variant="contained" color="grey">
                                    Download Template
                            </Button>
                            </a>
                        </Box>
                    </MuiDialogContent>
                </Dialog>
                <Dialog onClose={handleCloseOption} aria-labelledby="customized-dialog-title" open={openUpload}>
                    <DialogTitle id="customized-dialog-title" onClose={handleCloseOption} classes={classes}>
                        Upload Template
                    </DialogTitle>
                    <MuiDialogContent dividers>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="outlined-number"
                                margin="normal"
                                label="Berkas Template"
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                name="file"
                                onChange={handleFileChange}
                                className={classes.textAlignLeft}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUploadFormSubmit}
                                fullWidth
                            >
                                Upload
                            </Button>
                        </form>
                    </MuiDialogContent>
                </Dialog>
                <Dialog onClose={handleCloseOption} aria-labelledby="customized-dialog-title" open={openManual}>
                    <DialogTitle id="customized-dialog-title" onClose={handleCloseOption} classes={classes}>
                        Isi Manual
                    </DialogTitle>
                    <MuiDialogContent dividers>
                        <form noValidate autoComplete="off">
                            <GridContainer justify="center">
                                <GridItem sm={8}>
                                    <TextField
                                        id="operation-region"
                                        select
                                        label="Daerah Operasi"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                        margin="normal"
                                        required
                                        defaultValue='a'
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
                                        label="Nomor Registrasi"
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
                                        Tambah Anggota
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