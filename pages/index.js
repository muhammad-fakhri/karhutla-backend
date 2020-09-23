import { FormControl, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import moment from "moment";
import Datetime from "react-datetime";
import styles from "../assets/jss/nextjs-material-kit/pages/frontPage.js";
import SiteLayout from "../components/Layout/SiteLayout";
import MapContainer from "../components/Map/MapPatroli";
import Parallax from "../components/Parallax/Parallax.js";
import useAuth from "../context/auth";
import PatroliService from "../services/PatroliService";
const useStyles = makeStyles(styles);

export default function FrontPage(props) {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const [date, setDate] = React.useState(moment());
  const [loading, setLoading] = React.useState(true);
  const [mandiri, setMandiri] = React.useState(0);
  const [rutin, setRutin] = React.useState(0);
  const [terpadu, setTerpadu] = React.useState(0);
  const [spots, setSpots] = React.useState();

  React.useEffect(() => {
    const updatePatroli = async () => {
      let patroliData = await PatroliService.getPatroli(
        false,
        date.format("D-M-YYYY")
      );
      setSpots(patroliData.patroliSpots);
      setMandiri(patroliData.counter.mandiri);
      setRutin(patroliData.counter.rutin);
      setTerpadu(patroliData.counter.terpadu);
      setLoading(false);
    };
    updatePatroli();
  }, [date]);

  return (
    <SiteLayout scrollChange={true}>
      <div>
        <Parallax image={require("assets/img/forest-fire.jpg")}>
          <div className={classes.container}>
            <Grid container>
              <Grid item>
                <div className={classes.brand}>
                  <h1 className={classes.title}>SIMADU2</h1>
                  <h3 className={classes.subtitle}>
                    Sistem Informasi Patroli Pencegahan Kebakaran Hutan dan
                    Lahan
                  </h3>
                </div>
              </Grid>
            </Grid>
          </div>
        </Parallax>
        <div
          className={classNames(
            classes.main,
            classes.mainRaised,
            classes.textCenter
          )}
        >
          <h2>Sebaran Data Patroli Karhutla</h2>
          <MapContainer
            center={{
              lat: -1.5,
              lng: 117.384,
            }}
            zoom={5.1}
            spots={spots}
            isLoggedin={isAuthenticated}
          />
          <Grid container>
            <Grid item xs={12}>
              <h3>
                Tanggal: {date.format("D MMMM YYYY")}
                <br />
                <FormControl
                  className={classNames(
                    classes.formChooseDate,
                    classes.textCenter
                  )}
                >
                  <Datetime
                    timeFormat={false}
                    inputProps={{ placeholder: "Pilih tanggal patroli ..." }}
                    onChange={(date) => {
                      setDate(date);
                      setLoading(true);
                    }}
                    closeOnSelect={true}
                    locale="id"
                  />
                </FormControl>
              </h3>
            </Grid>
            <Grid item xs={12} md={4}>
              <h2 className={classes.mandiriBg}>Patroli Mandiri</h2>
              {loading ? <CircularProgress /> : <h3>{mandiri}</h3>}
            </Grid>
            <Grid item xs={12} md={4}>
              <h2 className={classes.pencegahanBg}>Patroli Rutin</h2>
              {loading ? <CircularProgress /> : <h3>{rutin}</h3>}
            </Grid>
            <Grid item xs={12} md={4}>
              <h2 className={classes.terpaduBg}>Patroli Terpadu</h2>
              {loading ? <CircularProgress /> : <h3>{terpadu}</h3>}
            </Grid>
          </Grid>
        </div>
      </div>
    </SiteLayout>
  );
}
