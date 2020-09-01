import { apiUrl } from '../../services/config';
import dynamic from "next/dynamic";
import Router, { useRouter } from 'next/router';
import useSWR from 'swr';
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
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import SiteLayout from "../../components/Layout/SiteLayout";
import Button from '../../components/CustomButtons/Button'
import styles from "../../assets/jss/nextjs-material-kit/pages/penggunaPage";
import UserService from '../../services/UserService';
import DaopsService from '../../services/DaopsService';
import BalaiService from '../../services/BalaiService';

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

const manggalaColumn = [
    { title: 'Daerah Operasi', field: 'region' },
    { title: 'Nomor Registrasi', field: 'registrationNumber' },
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
    const [manggalaState, setManggalaState] = React.useState([
        { region: 'Terpadu', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
        { region: 'Zerya Betül', registrationNumber: 'GADA213NASD1', name: 'Muhammad Fakhri', email: 'fakhri@mail.com', phoneNumber: '08123456789' },
    ]);
    const [daopsState, setDaopsState] = React.useState();
    const [balaiState, setBalaiState] = React.useState();
    const [value, setValue] = React.useState(0);

    const { data, error } = useSWR(apiUrl + '/non_patroli/list', UserService.getNonPatroliUsers)
    React.useEffect(() => {
        if (data) {
            setDaopsState(data.daopsUsers);
            setBalaiState(data.balaiUsers);
        }
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
                            <Tab label="Daops" {...a11yProps(1)} />
                            <Tab label="Balai" {...a11yProps(2)} />
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
                                columns={manggalaColumn}
                                data={manggalaState}
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
                                title="Pengguna Daops"
                                columns={props.daopsColumn}
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
                                        new Promise((resolve) => {
                                            console.log(newData);
                                            UserService.updateDaopsUser(newData)
                                                .then(result => {
                                                    if (result.success) {
                                                        resolve();
                                                        if (oldData) {
                                                            setDaopsState((prevState) => {
                                                                const data = [...prevState];
                                                                data[data.indexOf(oldData)] = newData;
                                                                return data;
                                                            });
                                                        }
                                                    } else {
                                                        resolve();
                                                        // TODO: make alert for fail update
                                                        console.log("update data Fail");
                                                        alert(result.message[0]);
                                                    };
                                                });
                                        }),
                                    // onRowDelete: oldData =>
                                    //     new Promise((resolve, reject) => {
                                    //         setTimeout(() => {
                                    //             const dataDelete = [...data];
                                    //             const index = oldData.tableData.id;
                                    //             dataDelete.splice(index, 1);
                                    //             setData([...dataDelete]);

                                    //             resolve();
                                    //         }, 1000);
                                    //     })
                                }}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={'right'}>
                            <MaterialTable
                                title="Pengguna Balai"
                                columns={props.daopsColumn}
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
                                        new Promise((resolve) => {
                                            UserService.updateDaopsUser(newData)
                                                .then(result => {
                                                    if (result.success) {
                                                        resolve();
                                                        if (oldData) {
                                                            setDaopsState((prevState) => {
                                                                const data = [...prevState];
                                                                data[data.indexOf(oldData)] = newData;
                                                                return data;
                                                            });
                                                        }
                                                    } else {
                                                        // TODO: make alert for fail update
                                                        console.log("update data Fail")
                                                    };
                                                });
                                        }),
                                    // onRowDelete: oldData =>
                                    //     new Promise((resolve, reject) => {
                                    //         setTimeout(() => {
                                    //             const dataDelete = [...data];
                                    //             const index = oldData.tableData.id;
                                    //             dataDelete.splice(index, 1);
                                    //             setData([...dataDelete]);

                                    //             resolve();
                                    //         }, 1000);
                                    //     })
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

const generateRolesLookup = async () => {
    let daopsRoles = {};
    let balaiRoles = {};
    let roles = await UserService.getNonPatroliRoles();
    roles.forEach(role => {
        if (role.id == 8 || role.id == 9) {
            daopsRoles[role.id] = role.name;
        } else {
            balaiRoles[role.id] = role.name;
        }
    })
    return { daopsRoles, balaiRoles };
}

const generateDaopsLookup = async () => {
    let data = {};
    let daops = await DaopsService.getAllDaops();
    daops.forEach(item => {
        data[item.code] = item.name + ' | ' + item.code;
    })
    return data;
}

export async function getServerSideProps(context) {
    let nonPatroliRoles = await generateRolesLookup();
    let daopsLookup = await generateDaopsLookup();
    const daopsColumn = [
        { title: 'Jabatan', field: 'role', lookup: nonPatroliRoles.daopsRoles },
        { title: 'Daerah Operasi', field: 'organization', lookup: daopsLookup },
        { title: 'NIP', field: 'nip', editable: 'never' },
        { title: 'Nama', field: 'name' },
        { title: 'Email', field: 'email', editable: 'never' },
        { title: 'Nomor HP', field: 'phone' },
    ];

    return {
        props: {
            loggedIn: getTokenFromRequest(context),
            daopsColumn
        }
    }
}

export default AnggotaPage;