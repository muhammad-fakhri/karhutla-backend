import { makeStyles } from "@material-ui/core/styles";
import { ButtonBase, Grid } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateIcon from '@material-ui/icons/Create';
import Link from 'next/link';
import SiteLayout from "../../components/Layout/SiteLayout";
import Loader from "../../components/Loader/Loader";
import Button from '../../components/CustomButtons/Button'
import classNames from "classnames";
import styles from "../../assets/jss/nextjs-material-kit/pages/suratTugas/inputPage";
import useAuth, { ProtectRoute } from '../../context/auth';

const useStyles = makeStyles(styles);

function InputSuratTugasPage(props) {
    const classes = useStyles();
    const { isAuthenticated } = useAuth();
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
                            sm={10}
                            align="center"
                            className={classNames(classes.gridItem, classes.title)}>
                            <h2>Tambah Penugasan</h2>
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            sm={4}
                            align="center"
                            className={classes.gridItem}>
                            {/* <Link href="/penugasan/berkas"> */}
                            <Link href="#">
                                <ButtonBase
                                    onClick={() => alert("Masih dalam pengembangan")}
                                    className={classNames(classes.buttonBase, classes.textCenter)}
                                    focusRipple={true}
                                >
                                    <div>
                                        <h3>Upload Berkas Excel</h3>
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
                            {/* <Link href="/penugasan/manual"> */}
                            <Link href="#">
                                <ButtonBase
                                    onClick={() => alert("Masih dalam pengembangan")}
                                    className={classNames(classes.buttonBase, classes.textCenter)}
                                    focusRipple={true}
                                >
                                    <div>
                                        <h3>Input Manual Penugasan</h3>
                                        <br />
                                        <CreateIcon style={{ fontSize: "80px" }} />
                                    </div>
                                </ButtonBase>
                            </Link>
                        </Grid>
                    </Grid>
                </SiteLayout >
            )
    );
}

export default ProtectRoute(InputSuratTugasPage);