import { isEmail, isNumeric, isPhoneNumber, digitLength } from './ValidatorHelper';

class BalaiValidator {
    static createBalai(inputData) {
        let errorMsg = new Array();
        if (Object.keys(inputData).length > 0) {
            if (!inputData.code) errorMsg.push("Tolong masukkan kode balai");
            if (!inputData.name) errorMsg.push("Tolong masukkan nama balai");
            if (!inputData.region) errorMsg.push("Tolong pilih wilayah balai");
        } else {
            errorMsg.push("Tolong isikan data balai");
        }
        if (errorMsg.length == 0) {
            return { pass: true };
        } else {
            return { pass: false, message: errorMsg };
        }
    }

    static updateBalai(inputData) {
        let errorMsg = new Array();
        if (Object.keys(inputData).length > 0) {
            if (!inputData.id) errorMsg.push("ID balai tidak disertakan");
            if (!inputData.code) errorMsg.push("Tolong masukkan kode balai");
            if (!inputData.name) errorMsg.push("Tolong masukkan nama balai");
            if (!inputData.region) errorMsg.push("Tolong pilih wilayah");
        } else {
            errorMsg.push("Tolong isikan data balai");
        }
        if (errorMsg.length == 0) {
            return { pass: true };
        } else {
            return { pass: false, message: errorMsg };
        }
    }

    static deleteBalai(inputData) {
        let errorMsg = new Array();
        if (!inputData.id) errorMsg.push("ID Balai tidak disertakan");
        if (errorMsg.length == 0) {
            return { pass: true };
        } else {
            return { pass: false, message: errorMsg };
        }
    }
}
export default BalaiValidator;