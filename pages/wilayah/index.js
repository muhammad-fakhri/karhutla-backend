import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import MaterialTable from "material-table";
import useSWR from "swr";
import { Alert } from "@material-ui/lab";
import styles from "../../assets/jss/nextjs-material-kit/pages/wilayahPage";
import SiteLayout from "../../components/Layout/SiteLayout";
import { apiUrl } from "../../services/config";
import WilayahService from "../../services/WilayahService";
import { ProtectRoute } from "../../context/auth";

const column = [
    { title: "Nama", field: "name" },
    { title: "Kode", field: "code" },
    {
        title: "Tipe",
        field: "type",
        lookup: {
            Kecamatan: "Kecamatan",
            Kelurahan: "Kelurahan",
            Desa: "Desa",
        },
    },
];

function WilayahPage(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [show, setShow] = React.useState(false);
    const [values, setValues] = React.useState({
        wilayah: [],
        alertMessage: "",
        successAlert: true,
    });
    const { data, error } = useSWR(
        apiUrl + "/wilayah/list",
        WilayahService.getAllWilayah
    );
    const closeAlert = () => setShow(false);
    const showAlert = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };
    React.useEffect(() => {
        setValues({ ...values, wilayah: data });
    }, [data]);

    return (
        <SiteLayout headerColor="info">
            <div
                className={classNames(
                    classes.main,
                    classes.mainRaised,
                    classes.textCenter
                )}
            >
                <h2>Data Wilayah</h2>
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
                    data={values.wilayah}
                    options={{
                        search: true,
                        actionsColumnIndex: -1,
                    }}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve, reject) => {
                                WilayahService.addWilayah(newData).then(
                                    async (result) => {
                                        if (result.success) {
                                            let data = await WilayahService.getAllWilayah();
                                            setValues({
                                                ...values,
                                                wilayah: data,
                                                alertMessage:
                                                    "Tambah Wilayah Berhasil",
                                                successAlert: true,
                                            });
                                            resolve();
                                        } else {
                                            setValues({
                                                ...values,
                                                alertMessage:
                                                    "Tambah Wilayah Gagal, " +
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
                                WilayahService.updateWilayah(
                                    newData,
                                    oldData
                                ).then((result) => {
                                    if (result.success) {
                                        const dataUpdate = [...values.wilayah];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setValues({
                                            wilayah: [...dataUpdate],
                                            alertMessage:
                                                "Update Wilayah Berhasil",
                                            successAlert: true,
                                        });
                                        resolve();
                                    } else {
                                        setValues({
                                            ...values,
                                            alertMessage:
                                                "Update Wilayah Gagal, " +
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
                                WilayahService.deleteWilayah(oldData).then(
                                    (result) => {
                                        if (result.success) {
                                            const dataDelete = [
                                                ...values.wilayah,
                                            ];
                                            const index = oldData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            setValues({
                                                ...values,
                                                wilayah: [...dataDelete],
                                                alertMessage:
                                                    "Hapus Wilayah Berhasil",
                                                successAlert: true,
                                            });
                                        } else {
                                            setValues({
                                                ...values,
                                                alertMessage:
                                                    "Hapus Wilayah Gagal, " +
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
    );
}

export default ProtectRoute(WilayahPage);
