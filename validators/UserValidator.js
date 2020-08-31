import { isEmail, isNumeric, isPhoneNumber, digitLength } from './ValidatorHelper';

class UserValidator {
    static createNonPatroli(inputData) {
        let errorMsg = new Array();
        if (digitLength(inputData.role) < 1) errorMsg.push("Tolong pilih jabatan pengguna");
        if (inputData.name.length < 1) errorMsg.push("Tolong masukan nama pengguna");
        if (!isEmail(inputData.email)) errorMsg.push("Tolong masukan email pengguna yang valid");
        if (inputData.institution.length < 1) errorMsg.push("Tolong pilih Daops/Balai");
        if (inputData.nip.length < 1 && !isNumeric(inputData.nip)) errorMsg.push("Tolong masukan NIP yang valid");
        if (!isPhoneNumber(inputData.phone)) errorMsg.push("Tolong masukan nomor hape yang valid");
        if (inputData.password.length < 8) errorMsg.push("Password minimal 8 karakter");
        if (inputData.password !== inputData.cPassword && inputData.password.length > 7) {
            errorMsg.push("Konfirmasi password tidak sama");
        }
        if (errorMsg.length == 0) {
            return { pass: true };
        } else {
            return { pass: false, message: errorMsg };
        }
    }
}
export default UserValidator;