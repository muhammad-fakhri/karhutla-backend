import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateIcon from '@material-ui/icons/Create';
import Link from 'next/link';
import SiteLayout from "../components/Layout/SiteLayout";
import classNames from "classnames";
import styles from "../assets/jss/nextjs-material-kit/pages/suratTugasPage";

const useStyles = makeStyles(styles);

function SuratTugasPage(props) {
    const classes = useStyles();

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
                    <Link href="/dashboard">
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
                </Grid>
                <Grid
                    item
                    xs={10}
                    sm={4}
                    align="center"
                    className={classes.gridItem}
                >
                    <Link href="/dashboard">
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

export default SuratTugasPage;