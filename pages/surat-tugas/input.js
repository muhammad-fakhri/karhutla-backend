import dynamic from "next/dynamic";
import Router from 'next/router';
import { getTokenFromRequest } from '../../context/auth';
const LoginPage = dynamic(() => import("../login"));
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateIcon from '@material-ui/icons/Create';
import Link from 'next/link';
import SiteLayout from "../../components/Layout/SiteLayout";
import Button from '../../components/CustomButtons/Button'
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/suratTugas/inputPage";

const useStyles = makeStyles(styles);

function InputSuratTugasPage(props) {
    const classes = useStyles();

    // Load login page if not logged in
    React.useEffect(() => {
        if (props.loggedIn) return; // do nothing if already logged in
        Router.replace("/surat-tugas/input", "/login", { shallow: true });
    }, [props.loggedIn]);

    if (props.loggedIn !== undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

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
                    sm={10}
                    align="center"
                    className={classNames(classes.gridItem, classes.title)}>
                    <h2>Input Surat Tugas</h2>
                </Grid>
                <Grid
                    item
                    xs={10}
                    sm={4}
                    align="center"
                    className={classes.gridItem}>
                    <Link href="/surat-tugas/berkas">
                        <ButtonBase
                            className={classNames(classes.buttonBase, classes.textCenter)}
                            focusRipple={true}
                        >
                            <div>
                                <h3>Upload Berkas</h3>
                                <br />
                                <CloudUploadIcon style={{ fontSize: "80px" }} />
                            </div>
                        </ButtonBase>
                    </Link>
                    <a href="https://drive.google.com" target="_blank">
                        <Button type="button" color="gray">Download Template Kosong</Button>
                    </a>
                </Grid>
                <Grid
                    item
                    xs={10}
                    sm={4}
                    align="center"
                    className={classes.gridItem}
                >
                    <Link href="/surat-tugas/manual">
                        <ButtonBase
                            className={classNames(classes.buttonBase, classes.textCenter)}
                            focusRipple={true}
                        >
                            <div>
                                <h3>Input Manual</h3>
                                <br />
                                <CreateIcon style={{ fontSize: "80px" }} />
                            </div>
                        </ButtonBase>
                    </Link>
                </Grid>
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

export default InputSuratTugasPage;