import { digitLength } from "./ValidatorHelper";
class PoskoValidator {
  static createPosko(inputData) {
    const errorMsg = new Array();
    if (!inputData.name) errorMsg.push("Tolong masukkan nama posko");
    if (digitLength(inputData.daops) < 1) errorMsg.push("Tolong pilih daops");
    if (digitLength(inputData.kecamatan) < 1)
      errorMsg.push("Tolong pilih kecamatan");
    if (errorMsg.length == 0) {
      return { pass: true };
    } else {
      return { pass: false, message: errorMsg };
    }
  }

  static updatePosko(inputData) {
    const errorMsg = new Array();
    if (!inputData.id) errorMsg.push("ID posko tidak disertakan");
    if (!inputData.name) errorMsg.push("Tolong masukkan nama posko");
    if (!inputData.daops) errorMsg.push("Tolong pilih daops");
    if (!inputData.kecamatan) errorMsg.push("Tolong pilih kecamatan");
    if (errorMsg.length == 0) {
      return { pass: true };
    } else {
      return { pass: false, message: errorMsg };
    }
  }

  static deletePosko(inputData) {
    const errorMsg = new Array();
    if (!inputData.id) errorMsg.push("ID posko tidak disertakan");
    if (errorMsg.length == 0) {
      return { pass: true };
    } else {
      return { pass: false, message: errorMsg };
    }
  }
}
export default PoskoValidator;
