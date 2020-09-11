import { useRouter } from 'next/router';
import useSWR from 'swr';
import { makeStyles } from "@material-ui/core/styles";
import {
    Dialog,
    Grid,
    Typography,
    Box,
    AppBar,
    Tabs,
    Tab,
    TextField,
    IconButton,
    CircularProgress
} from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import SiteLayout from "../../components/Layout/SiteLayout";
import Button from '../../components/CustomButtons/Button';
import Loader from '../../components/Loader/Loader';
import styles from "../../assets/jss/nextjs-material-kit/pages/penggunaPage";
import UserService from '../../services/UserService';
import DaopsService from '../../services/DaopsService';
import BalaiService from '../../services/BalaiService';
import useAuth, { ProtectRoute } from '../../context/auth';

const useStyles = makeStyles(styles);

const DialogTitle = props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" className={classes.dialogTitle}>{children}</Typography>
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

const generateRolesLookup = async () => {
    let daopsRoles = {};
    let balaiRoles = {};
    let manggalaRoles = {};
    let nonPatrolRoles = await UserService.getNonPatroliRoles();
    let patrolRoles = await UserService.getPatroliRoles();
    nonPatrolRoles.forEach(role => {
        if (role.id == 8 || role.id == 9) {
            daopsRoles[role.id] = role.name;
        } else {
            balaiRoles[role.id] = role.name;
        }
    })
    patrolRoles.forEach(role => {
        manggalaRoles[role.id] = role.name;
    })
    return { daopsRoles, balaiRoles, manggalaRoles };
}
const generateDaopsLookup = async () => {
    let data = {};
    let daops = await DaopsService.getAllDaops();
    daops.forEach(item => {
        data[item.code] = item.name;
    })
    return data;
}
const generateBalaiLookup = async () => {
    let data = {};
    let daops = await BalaiService.getAllBalai();
    daops.forEach(item => {
        data[item.code] = item.name;
    })
    data['KLHK'] = 'KLHK';
    return data;
}

function AnggotaPage(props) {
    const { isAuthenticated } = useAuth();
    const classes = useStyles();
    const router = useRouter();

    const [openManggala, setOpenManggala] = React.useState(false);
    const [openUploadManggala, setOpenUploadManggala] = React.useState(false);
    const [manggalaState, setManggalaState] = React.useState([
        { role: 10, organization: 123, registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phone: '08123456789' },
        { role: 10, organization: 123, registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phone: '08123456789' },
    ]);
    const [daopsState, setDaopsState] = React.useState();
    const [balaiState, setBalaiState] = React.useState();
    const [manggalaColumn, setManggalaColumn] = React.useState();
    const [daopsColumn, setDaopsColumn] = React.useState();
    const [balaiColumn, setBalaiColumn] = React.useState();
    const [swipeValue, setSwipeValue] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const [values, setValues] = React.useState({
        alertMessage: "",
        successAlert: true,
    });

    React.useEffect(() => {
        const setLookup = async () => {
            let roles = await generateRolesLookup();
            let daopsLookup = await generateDaopsLookup();
            let balaiLookup = await generateBalaiLookup();
            const manggalaColumn = [
                { title: 'Jabatan', field: 'role', lookup: roles.manggalaRoles },
                { title: 'Daerah Operasi', field: 'organization', lookup: daopsLookup },
                { title: 'Nomor Registrasi', field: 'registrationNumber', editable: 'never' },
                { title: 'Nama', field: 'name' },
                { title: 'Email', field: 'email', editable: 'never' },
                { title: 'Nomor HP', field: 'phone' },
            ];
            const daopsColumn = [
                { title: 'Jabatan', field: 'role', lookup: roles.daopsRoles },
                { title: 'Daerah Operasi', field: 'organization', lookup: daopsLookup },
                { title: 'NIP', field: 'nip', editable: 'never' },
                { title: 'Nama', field: 'name' },
                { title: 'Email', field: 'email', editable: 'never' },
                { title: 'Nomor HP', field: 'phone' },
            ];
            const balaiColumn = [
                { title: 'Jabatan', field: 'role', lookup: roles.balaiRoles },
                { title: 'Balai', field: 'organization', lookup: balaiLookup },
                { title: 'NIP', field: 'nip', editable: 'never' },
                { title: 'Nama', field: 'name' },
                { title: 'Email', field: 'email', editable: 'never' },
                { title: 'Nomor HP', field: 'phone' },
            ];
            setManggalaColumn(manggalaColumn);
            setDaopsColumn(daopsColumn);
            setBalaiColumn(balaiColumn);
            // TODO: make NIP and email updateable
        }
        if (isAuthenticated) setLookup();
    }, [isAuthenticated]);
    const { data: dataNonPatroli, isValidating } = useSWR(
        isAuthenticated ? '/non_patroli/list' : null,
        UserService.getNonPatroliUsers)
    React.useEffect(() => {
        if (dataNonPatroli && isAuthenticated) {
            setDaopsState(dataNonPatroli.daopsUsers);
            setBalaiState(dataNonPatroli.balaiUsers);
        }
    }, [dataNonPatroli]);

    const handleOpenManggala = () => {
        setOpenManggala(true);
        setOpenUploadManggala(false);
    };
    const handleCloseManggala = () => {
        setOpenManggala(false);
        setOpenUploadManggala(false);
    };
    const handleOpenUploadManggala = () => {
        setOpenManggala(false);
        setOpenUploadManggala(true);
    };
    const handleFileChange = (event) => {
        setWorkFile(event.target.files[0])
        console.log(event.target.files[0])
    };
    const handleUploadManggalaFormSubmit = () => {
        const data = new FormData();
        // data.append('file', workFile);
    };
    const handleSwipeChange = (event, newValue) => {
        setSwipeValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setSwipeValue(index);
    };
    const closeAlert = () => setShow(false);
    const showAlert = (isSuccess, message) => {
        setValues({
            ...values,
            alertMessage: message,
            successAlert: isSuccess ? true : false,
        });
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    return (
        !isAuthenticated ? (
            <Loader />
        ) : (
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
                                    value={swipeValue}
                                    onChange={handleSwipeChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Personil Manggala Agni" {...a11yProps(0)} />
                                    <Tab label="Daops" {...a11yProps(1)} />
                                    <Tab label="Balai/Pusat" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            {show ? (
                                <Alert
                                    severity={values.successAlert ? "success" : "error"}
                                    onClose={closeAlert}
                                    style={{ marginTop: '16px' }}
                                >
                                    {values.alertMessage}
                                </Alert>
                            ) : null}
                            <SwipeableViews
                                axis={'x'}
                                index={swipeValue}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={swipeValue} index={0} dir={'right'}>
                                    {isValidating ? (
                                        <CircularProgress />
                                    ) : (
                                            <MaterialTable
                                                title="Personil Manggala Agni"
                                                columns={manggalaColumn}
                                                data={manggalaState}
                                                actions={[
                                                    {
                                                        icon: AddBoxIcon,
                                                        tooltip: 'Tambah Personil Manggala Agni',
                                                        isFreeAction: true,
                                                        onClick: (event) => {
                                                            // handleOpenManggala();
                                                            alert("Masih dalam pengembangan");
                                                        }
                                                    }
                                                ]}
                                                options={{
                                                    search: true,
                                                    actionsColumnIndex: -1
                                                }}
                                                editable={{
                                                    onRowUpdate: (newData, oldData) =>
                                                        new Promise((resolve, reject) => {
                                                            // setTimeout(() => {
                                                            //     if (oldData) {
                                                            //         setManggalaState((prevState) => {
                                                            //             const data = [...prevState];
                                                            //             data[data.indexOf(oldData)] = newData;
                                                            //             return data;
                                                            //         });
                                                            //     }
                                                            //     resolve();
                                                            // }, 1000);
                                                            alert('Masih dalam pengembangan');
                                                            resolve();
                                                        }),
                                                    onRowDelete: oldData =>
                                                        new Promise((resolve, reject) => {
                                                            // setTimeout(() => {
                                                            //     const dataDelete = [...daopsState];
                                                            //     const index = oldData.tableData.id;
                                                            //     dataDelete.splice(index, 1);
                                                            //     setDaopsState(dataDelete);
                                                            //     resolve();
                                                            // }, 1000);
                                                            alert('Masih dalam pengembangan');
                                                            resolve();
                                                        })
                                                }}
                                            />
                                        )}
                                </TabPanel>
                                <TabPanel value={swipeValue} index={1} dir={'right'}>
                                    {isValidating ? (
                                        <CircularProgress />
                                    ) : (
                                            <MaterialTable
                                                title="Pengguna Daops"
                                                columns={daopsColumn}
                                                data={daopsState}
                                                actions={[
                                                    {
                                                        icon: AddBoxIcon,
                                                        tooltip: 'Tambah Pengguna Daops',
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
                                                editable={{
                                                    onRowUpdate: (newData, oldData) =>
                                                        new Promise((resolve, reject) => {
                                                            UserService.updateNonPatroliUser(newData)
                                                                .then(result => {
                                                                    if (result.success) {
                                                                        if (oldData) {
                                                                            setDaopsState((prevState) => {
                                                                                const data = [...prevState];
                                                                                data[data.indexOf(oldData)] = newData;
                                                                                return data;
                                                                            });
                                                                        }
                                                                        showAlert(true, 'Update pengguna daops Berhasil');
                                                                        resolve();
                                                                    } else {
                                                                        showAlert(false, result.message[0]);
                                                                        reject();
                                                                    };
                                                                });
                                                        }),
                                                    onRowDelete: oldData =>
                                                        new Promise((resolve, reject) => {
                                                            UserService.deleteNonPatroliUser(oldData)
                                                                .then(result => {
                                                                    if (result.success) {
                                                                        const dataDelete = [...daopsState];
                                                                        const index = oldData.tableData.id;
                                                                        dataDelete.splice(index, 1);
                                                                        setDaopsState(dataDelete);
                                                                        showAlert(true, 'Hapus pengguna daops Berhasil');
                                                                        resolve();
                                                                    } else {
                                                                        showAlert(false, result.message[0]);
                                                                        reject();
                                                                    };
                                                                });
                                                        })
                                                }}
                                            />
                                        )}
                                </TabPanel>
                                <TabPanel value={swipeValue} index={2} dir={'right'}>
                                    {isValidating ? (
                                        <CircularProgress />
                                    ) : (
                                            <MaterialTable
                                                title="Pengguna Balai/Pusat"
                                                columns={balaiColumn}
                                                data={balaiState}
                                                actions={[
                                                    {
                                                        icon: AddBoxIcon,
                                                        tooltip: 'Tambah Pengguna Balai',
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
                                                editable={{
                                                    onRowUpdate: (newData, oldData) =>
                                                        new Promise((resolve, reject) => {
                                                            UserService.updateNonPatroliUser(newData)
                                                                .then(result => {
                                                                    if (result.success) {
                                                                        if (oldData) {
                                                                            setBalaiState((prevState) => {
                                                                                const data = [...prevState];
                                                                                data[data.indexOf(oldData)] = newData;
                                                                                return data;
                                                                            });
                                                                        }
                                                                        showAlert(true, 'Update pengguna balai/pusat Berhasil');
                                                                        resolve();
                                                                    } else {
                                                                        showAlert(false, result.message[0]);
                                                                        reject();
                                                                    };
                                                                });
                                                        }),
                                                    onRowDelete: oldData =>
                                                        new Promise((resolve, reject) => {
                                                            UserService.deleteNonPatroliUser(oldData)
                                                                .then(result => {
                                                                    if (result.success) {
                                                                        const dataDelete = [...balaiState];
                                                                        const index = oldData.tableData.id;
                                                                        dataDelete.splice(index, 1);
                                                                        setBalaiState(dataDelete);
                                                                        showAlert(true, 'Hapus pengguna balai/pusat Berhasil');
                                                                        resolve();
                                                                    } else {
                                                                        showAlert(false, result.message[0]);
                                                                        reject();
                                                                    };
                                                                });
                                                        })
                                                }}
                                            />
                                        )}
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
            )
    );
}

export default ProtectRoute(AnggotaPage);