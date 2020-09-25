import {
  isEmail,
  isNumeric,
  isPhoneNumber,
  digitLength,
} from "./ValidatorHelper";

class UserValidator {
  static createPatroli(inputData) {
    let errorMsg = new Array();
    if (inputData.name.length < 1)
      errorMsg.push("Tolong masukan nama pengguna");
    if (!isEmail(inputData.email))
      errorMsg.push("Tolong masukan email pengguna yang valid");
    if (inputData.organization.length < 1)
      errorMsg.push("Tolong pilih Daerah Operasi");
    if (inputData.registrationNumber.length < 1)
      errorMsg.push("Tolong masukan nomor registrasi");
    if (!isPhoneNumber(inputData.phone))
      errorMsg.push("Tolong masukan nomor hape yang valid");
    if (inputData.password.length < 8)
      errorMsg.push("Password minimal 8 karakter");
    if (
      inputData.password !== inputData.cPassword &&
      inputData.password.length > 7
    ) {
      errorMsg.push("Konfirmasi password tidak sama");
    }
    if (errorMsg.length == 0) {
      return { pass: true };
    } else {
      return { pass: false, message: errorMsg };
    }
  }

  static createNonPatroli(inputData) {
    let errorMsg = new Array();
    if (digitLength(inputData.role) < 1)
      errorMsg.push("Tolong pilih hak akses pengguna");
    if (inputData.name.length < 1)
      errorMsg.push("Tolong masukan nama pengguna");
    if (!isEmail(inputData.email))
      errorMsg.push("Tolong masukan email pengguna yang valid");
    if (inputData.organization.length < 1)
      errorMsg.push("Tolong pilih Daops/Balai");
    if (inputData.nip.length < 1 && !isNumeric(inputData.nip))
      errorMsg.push("Tolong masukan NIP yang valid");
    if (!isPhoneNumber(inputData.phone))
      errorMsg.push("Tolong masukan nomor hape yang valid");
    if (inputData.password.length < 8)
      errorMsg.push("Password minimal 8 karakter");
    if (
      inputData.password !== inputData.cPassword &&
      inputData.password.length > 7
    ) {
      errorMsg.push("Konfirmasi password tidak sama");
    }
    if (errorMsg.length == 0) {
      return { pass: true };
    } else {
      return { pass: false, message: errorMsg };
    }
  }

  static updateNonPatroli(inputData) {
    let errorMsg = new Array();
    if (digitLength(inputData.id) < 1) errorMsg.push("ID Pengguna tidak ada");
    if (digitLength(inputData.role) < 1)
      errorMsg.push("Tolong pilih hak akses pengguna");
    if (inputData.name.length < 1)
      errorMsg.push("Tolong masukan nama pengguna");
    if (inputData.organization.length < 1)
      errorMsg.push("Tolong pilih Daops/Balai");
    if (!isPhoneNumber(inputData.phone))
      errorMsg.push("Tolong masukan nomor hape yang valid");
    if (errorMsg.length == 0) {
      return { pass: true };
    } else {
      return { pass: false, message: errorMsg };
    }
  }

  static deleteNonPatroli(inputData) {
    let errorMsg = new Array();
    if (digitLength(inputData.id) < 1) errorMsg.push("ID Pengguna tidak ada");
    if (digitLength(inputData.accessId) < 1)
      errorMsg.push("ID Akses Pengguna tidak ada");
    if (errorMsg.length == 0) {
      return { pass: true };
    } else {
      return { pass: false, message: errorMsg };
    }
  }
}
export default UserValidator;
