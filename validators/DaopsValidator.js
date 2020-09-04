class DaopsValidator {
    static createDaops(inputData) {
        let errorMsg = new Array();
        if (Object.keys(inputData).length > 0) {
            if (!inputData.code) errorMsg.push("Tolong masukkan kode daops");
            if (!inputData.name) errorMsg.push("Tolong masukkan nama daops");
            if (!inputData.balaiId) errorMsg.push("Tolong pilih balai");
        } else {
            errorMsg.push("Tolong isikan data daops");
        }
        if (errorMsg.length == 0) {
            return { pass: true };
        } else {
            return { pass: false, message: errorMsg };
        }
    }

    static updateDaops(inputData) {
        let errorMsg = new Array();
        if (Object.keys(inputData).length > 0) {
            if (!inputData.id) errorMsg.push("ID daops tidak disertakan");
            if (!inputData.code) errorMsg.push("Tolong masukkan kode daops");
            if (!inputData.name) errorMsg.push("Tolong masukkan nama daops");
            if (!inputData.balaiId) errorMsg.push("Tolong pilih balai");
        } else {
            errorMsg.push("Tolong isikan data daops");
        }
        if (errorMsg.length == 0) {
            return { pass: true };
        } else {
            return { pass: false, message: errorMsg };
        }
    }

    static deleteDaops(inputData) {
        let errorMsg = new Array();
        if (!inputData.id) errorMsg.push("ID Daops tidak disertakan");
        if (errorMsg.length == 0) {
            return { pass: true };
        } else {
            return { pass: false, message: errorMsg };
        }
    }
}
export default DaopsValidator;