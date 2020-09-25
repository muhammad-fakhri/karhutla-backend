import { Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import classNames from "classnames";
import MaterialTable from "material-table";
import useSWR from "swr";
import styles from "../../assets/jss/nextjs-material-kit/pages/patrolReportPage";
import SiteLayout from "../../components/Layout/SiteLayout";
import Loader from "../../components/Loader/Loader";
import PatroliService from "../../services/PatroliService";
import useAuth, { ProtectRoute } from "../../context/auth";

const column = [
  { title: "Tanggal", field: "patrolDate" },
  { title: "Daerah Operasi", field: "operationRegion" },
  { title: "Daerah Patroli", field: "patrolRegion" },
];

function PatroliTerpaduPage(props) {
  const useStyles = makeStyles(styles);
  const { isAuthenticated } = useAuth();
  const classes = useStyles();
  const [terpadu, setTerpadu] = React.useState();
  const { data, isValidating } = useSWR(
    isAuthenticated ? "/list" : null,
    PatroliService.getAllPatroliTerpadu
  );
  // TODO: change endpoint with endpoint for fetching all terpadu patrol data
  React.useEffect(() => {
    setTerpadu(data);
  }, [data]);

  return !isAuthenticated ? (
    <Loader />
  ) : (
    <SiteLayout headerColor="info">
      <div
        className={classNames(
          classes.main,
          classes.mainRaised,
          classes.textCenter
        )}
      >
        <h2>Data Patroli Terpadu</h2>
        {isValidating ? (
          <CircularProgress />
        ) : (
          <MaterialTable
            title="5 Hari Terakhir"
            columns={column}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            data={terpadu}
            options={{
              search: true,
              actionsColumnIndex: -1,
            }}
            actions={[
              {
                icon: CloudDownloadIcon,
                tooltip: "Download Laporan",
                onClick: (event, rowData) => window.open(rowData.reportLink),
              },
            ]}
          />
        )}
      </div>
    </SiteLayout>
  );
}

export default ProtectRoute(PatroliTerpaduPage);
