import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import MaterialTable from "material-table";
import useSWR from "swr";
import { Alert } from "@material-ui/lab";
import styles from "../../assets/jss/nextjs-material-kit/pages/patroliTerpaduPage";
import SiteLayout from "../../components/Layout/SiteLayout";
import Loader from "../../components/Loader/Loader";
import { apiUrl } from "../../services/config";
import BalaiService from "../../services/BalaiService";
import WilayahService from "../../services/WilayahService";
import useAuth, { ProtectRoute } from "../../context/auth";

const generateWilayahLookup = async () => {
    let data = {};
    let wilayah = await WilayahService.getAllWilayah();
    wilayah.forEach(item => {
        data[item.id] = item.type + ' ' + item.name;
    })
    return data;
}

function BalaiPage(props) {
    const { loading } = useAuth();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [show, setShow] = React.useState(false);
    const [column, setColumn] = React.useState([]);
    const [values, setValues] = React.useState({
        balai: [],
        alertMessage: "",
        successAlert: true,
    });
    const { data, isValidating } = useSWR(
        apiUrl + "/balai/list",
        BalaiService.getAllBalai
    );
    const showLoader = isValidating || loading;
    const closeAlert = () => setShow(false);
    const showAlert = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };
    React.useEffect(() => {
        const setLookup = async () => {
            let wilayahLookup = await generateWilayahLookup();
            const column = [
                { title: "Nama", field: "name" },
                { title: "Kode", field: "code" },
                {
                    title: "Wilayah",
                    field: "region",
                    lookup: wilayahLookup
                },
            ];
            setColumn(column);
        }
        setLookup();
    }, []);
    React.useEffect(() => {
        setValues({ ...values, balai: data });
    }, [data]);

    return (
        showLoader ? (
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
                        <h2>Data Balai</h2>
                        {show ? (
                            <Alert
                                severity={values.successAlert ? "success" : "error"}
                                onClose={closeAlert}
                            >
                                {values.alertMessage}
                            </Alert>
                        ) : null}
                        <MaterialTable
                            title=""
                            columns={column}
                            components={{
                                Container: (props) => (
                                    <Paper {...props} elevation={0} />
                                ),
                            }}
                            data={values.balai}
                            options={{
                                search: true,
                                actionsColumnIndex: -1,
                            }}
                            editable={{
                                onRowAdd: (newData) =>
                                    new Promise((resolve, reject) => {
                                        BalaiService.addBalai(newData).then(
                                            async (result) => {
                                                if (result.success) {
                                                    let data = await BalaiService.getAllBalai();
                                                    setValues({
                                                        ...values,
                                                        balai: data,
                                                        alertMessage:
                                                            "Tambah Balai Berhasil",
                                                        successAlert: true,
                                                    });
                                                    resolve();
                                                } else {
                                                    setValues({
                                                        ...values,
                                                        alertMessage:
                                                            "Tambah Balai Gagal, " +
                                                            result.message[0],
                                                        successAlert: false,
                                                    });
                                                    reject();
                                                }
                                                showAlert();
                                            }
                                        );
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        BalaiService.updateBalai(
                                            newData,
                                            oldData
                                        ).then((result) => {
                                            if (result.success) {
                                                const dataUpdate = [...values.balai];
                                                const index = oldData.tableData.id;
                                                dataUpdate[index] = newData;
                                                setValues({
                                                    balai: [...dataUpdate],
                                                    alertMessage:
                                                        "Update Balai Berhasil",
                                                    successAlert: true,
                                                });
                                                resolve();
                                            } else {
                                                setValues({
                                                    ...values,
                                                    alertMessage:
                                                        "Update Balai Gagal, " +
                                                        result.message[0],
                                                    successAlert: false,
                                                });
                                                reject();
                                            }
                                            showAlert();
                                        });
                                    }),
                                onRowDelete: (oldData) =>
                                    new Promise((resolve, reject) => {
                                        BalaiService.deleteBalai(oldData).then(
                                            (result) => {
                                                if (result.success) {
                                                    const dataDelete = [
                                                        ...values.balai,
                                                    ];
                                                    const index = oldData.tableData.id;
                                                    dataDelete.splice(index, 1);
                                                    setValues({
                                                        ...values,
                                                        balai: [...dataDelete],
                                                        alertMessage:
                                                            "Hapus Balai Berhasil",
                                                        successAlert: true,
                                                    });
                                                } else {
                                                    setValues({
                                                        ...values,
                                                        alertMessage:
                                                            "Hapus Balai Gagal, " +
                                                            result.message[0],
                                                        successAlert: false,
                                                    });
                                                }
                                                showAlert();
                                                resolve();
                                            }
                                        );
                                    }),
                            }}
                        />
                    </div>
                </SiteLayout>
            )
    );
}

export default ProtectRoute(BalaiPage);
