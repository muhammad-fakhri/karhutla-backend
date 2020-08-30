import { apiUrl } from '../../services/config';
import dynamic from "next/dynamic";
import Router, { useRouter } from 'next/router';
import useSWR from 'swr'
import { getTokenFromRequest } from '../../context/auth';
const LoginPage = dynamic(() => import("../login"));
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import SiteLayout from "../../components/Layout/SiteLayout";
import Button from '../../components/CustomButtons/Button'
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import styles from "../../assets/jss/nextjs-material-kit/pages/penggunaPage";
import UserService from '../../services/UserService';

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

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const daopsColumn = [
    { title: 'Instansi', field: 'organization' },
    { title: 'Daerah Operasi', field: 'region' },
    { title: 'NIP', field: 'nipNumber' },
    { title: 'Nama', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Nomor HP', field: 'phoneNumber' },
];

function AnggotaPage(props) {
    const classes = useStyles();
    const router = useRouter();
    // Load login page if not logged in
    React.useEffect(() => {
        if (props.loggedIn) return; // do nothing if already logged in
        Router.replace("/pengguna", "/login", { shallow: true });
    }, [props.loggedIn]);

    if (props.loggedIn !== undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

    const [openManggala, setOpenManggala] = React.useState(false);
    const [openUploadManggala, setOpenUploadManggala] = React.useState(false);
    const [manggalaState, setManggalaState] = React.useState({
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
    const [daopsState, setDaopsState] = React.useState();
    const [value, setValue] = React.useState(0);

    const { data, error } = useSWR(apiUrl + '/user/list', UserService.getUsers)
    React.useEffect(() => {
        setDaopsState(data);
    }, [data]);

    const handleOpenManggala = () => {
        setOpenManggala(true);
        setOpenUploadManggala(false);
        setOpenManualManggala(false);
    };

    const handleCloseManggala = () => {
        setOpenManggala(false);
        setOpenUploadManggala(false);
        setOpenManualManggala(false);
    };

    const handleOpenUploadManggala = () => {
        setOpenManggala(false);
        setOpenUploadManggala(true);
        setOpenManualManggala(false);
    };

    const handleFileChange = (event) => {
        setWorkFile(event.target.files[0])
        console.log(event.target.files[0])
    };

    const handleUploadManggalaFormSubmit = () => {
        const data = new FormData();
        // data.append('file', workFile);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
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
                    <h2>Manajemen Pengguna</h2>
                </Grid>
                <Grid
                    item
                    xs={10}
                    align="center"
                    className={classes.gridItem}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Personil Manggala Agni" {...a11yProps(0)} />
                            <Tab label="Daops/Balai" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={'right'}>
                            <MaterialTable
                                title="Personil Manggala Agni"
                                columns={manggalaState.columns}
                                data={manggalaState.data}
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
                                    },
                                    {
                                        icon: AddBoxIcon,
                                        tooltip: 'Tambah Personil Manggala Agni',
                                        isFreeAction: true,
                                        onClick: (event) => {
                                            handleOpenManggala();
                                            // alert("You want to add a new manggala");
                                        }
                                    }
                                ]}
                                options={{
                                    search: true,
                                    actionsColumnIndex: -1
                                }}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={'right'}>
                            <MaterialTable
                                title="Daops/Balai"
                                columns={daopsColumn}
                                data={daopsState}
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
                                    },
                                    {
                                        icon: AddBoxIcon,
                                        tooltip: 'Tambah Pengguna Daops/Balai',
                                        isFreeAction: true,
                                        onClick: (event) => {
                                            event.preventDefault()
                                            router.push('/pengguna/non-patroli');
                                        }
                                    }
                                ]}
                                options={{
                                    search: true,
                                    actionsColumnIndex: -1
                                }}
                            />
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
                <Dialog onClose={handleCloseManggala} aria-labelledby="customized-dialog-title" open={openManggala}>
                    <DialogTitle id="customized-dialog-title" onClose={handleCloseManggala} classes={classes}>
                        Tambah Anggota Manggala Agni
                    </DialogTitle>
                    <MuiDialogContent dividers>
                        <Typography gutterBottom align='justify'>
                            Silakan pilih cara menambah anggota, melalui <strong>upload template</strong> atau <strong>isi manual</strong>.
                            Anda bisa download templatenya dengan menekan tombol "Download Template"
                        </Typography>
                        <Box component="div" textAlign="center">
                            <Button variant="contained" color="primary" onClick={handleOpenUploadManggala}>
                                Upload Template
                            </Button>
                            <Button variant="contained" color="primary" onClick={event => {
                                event.preventDefault()
                                router.push('/pengguna/patroli');
                            }}>
                                Isi Manual
                            </Button>
                            <a href="https://drive.google.com" target="_blank">
                                <Button variant="contained" color="github">
                                    Download Template
                            </Button>
                            </a>
                        </Box>
                    </MuiDialogContent>
                </Dialog>
                <Dialog onClose={handleCloseManggala} aria-labelledby="customized-dialog-title" open={openUploadManggala}>
                    <DialogTitle id="customized-dialog-title" onClose={handleCloseManggala} classes={classes}>
                        Upload Template Personil Manggala Agni
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
                                onClick={handleUploadManggalaFormSubmit}
                                fullWidth
                            >
                                Upload
                            </Button>
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
            loggedIn: getTokenFromRequest(context),

        }
    }
}

export default AnggotaPage;