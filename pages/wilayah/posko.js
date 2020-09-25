import { Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import MaterialTable from "material-table";
import useSWR from "swr";
import { Alert } from "@material-ui/lab";
import styles from "../../assets/jss/nextjs-material-kit/pages/wilayahKerjaPage";
import SiteLayout from "../../components/Layout/SiteLayout";
import PoskoService from "../../services/PoskoService";
import DaopsService from "../../services/DaopsService";
import useAuth, { ProtectRoute } from "../../context/auth";
import Loader from "../../components/Loader/Loader";

const generateDaopsLookup = async () => {
  let data = {};
  let daops = await DaopsService.getAllDaops();
  daops.forEach((item) => {
    data[item.id] = item.name;
  });
  return data;
};

function PoskoPage(props) {
  const { isAuthenticated } = useAuth();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const [column, setColumn] = React.useState([]);
  const [values, setValues] = React.useState({
    posko: [],
    alertMessage: "",
    successAlert: true,
  });
  const { data, isValidating } = useSWR(
    isAuthenticated ? "/posko/list" : null,
    PoskoService.getAllPosko
  );
  const closeAlert = () => setShow(false);
  const showAlert = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };
  React.useEffect(() => {
    const setLookup = async () => {
      let daopsLookup = await generateDaopsLookup();
      const column = [
        { title: "Posko", field: "name" },
        { title: "Daops", field: "daops", lookup: daopsLookup },
        { title: "Kecamatan", field: "kecamatan" },
        { title: "Kelurahan", field: "kelurahan" },
        { title: "Desa", field: "desa" },
      ];
      setColumn(column);
    };
    if (isAuthenticated) setLookup();
  }, [isAuthenticated]);
  React.useEffect(() => {
    setValues({ ...values, posko: data });
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
        <h2>Data Posko</h2>
        {show ? (
          <Alert
            severity={values.successAlert ? "success" : "error"}
            onClose={closeAlert}
          >
            {values.alertMessage}
          </Alert>
        ) : null}
        {isValidating ? (
          <CircularProgress />
        ) : (
          <MaterialTable
            title=""
            columns={column}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            data={values.posko}
            options={{
              search: true,
              actionsColumnIndex: -1,
              addRowPosition: "first",
            }}
            localization={{
              body: { editRow: { deleteText: "Yakin hapus data ini ?" } },
              header: { actions: "Aksi" },
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  resolve();
                  //   PoskoService.addPosko(newData).then(async (result) => {
                  // if (result.success) {
                  //   let data = await PoskoService.getAllPosko();
                  //   setValues({
                  //     ...values,
                  //     posko: data,
                  //     alertMessage: "Tambah Posko Berhasil",
                  //     successAlert: true,
                  //   });
                  //   resolve();
                  // } else {
                  //   setValues({
                  //     ...values,
                  //     alertMessage:
                  //       "Tambah Posko Gagal, " + result.message[0],
                  //     successAlert: false,
                  //   });
                  //   reject();
                  // }
                  // showAlert();
                  //   });
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  resolve();
                  //   PoskoService.updatePosko(newData, oldData).then((result) => {
                  //     if (result.success) {
                  //       const dataUpdate = [...values.posko];
                  //       const index = oldData.tableData.id;
                  //       dataUpdate[index] = newData;
                  //       setValues({
                  //         posko: [...dataUpdate],
                  //         alertMessage: "Update Posko Berhasil",
                  //         successAlert: true,
                  //       });
                  //       resolve();
                  //     } else {
                  //       setValues({
                  //         ...values,
                  //         alertMessage:
                  //           "Update Posko Gagal, " + result.message[0],
                  //         successAlert: false,
                  //       });
                  //       reject();
                  //     }
                  //     showAlert();
                  //   });
                }),
              //   onRowDelete: (oldData) =>
              //     new Promise((resolve, reject) => {
              //       PoskoService.deletePosko(oldData).then((result) => {
              //         if (result.success) {
              //           const dataDelete = [...values.posko];
              //           const index = oldData.tableData.id;
              //           dataDelete.splice(index, 1);
              //           setValues({
              //             ...values,
              //             posko: [...dataDelete],
              //             alertMessage: "Hapus Posko Berhasil",
              //             successAlert: true,
              //           });
              //         } else {
              //           setValues({
              //             ...values,
              //             alertMessage: "Hapus Posko Gagal, " + result.message[0],
              //             successAlert: false,
              //           });
              //         }
              //         showAlert();
              //         resolve();
              //       });
              //     }),
            }}
          />
        )}
      </div>
    </SiteLayout>
  );
}

export default ProtectRoute(PoskoPage);
