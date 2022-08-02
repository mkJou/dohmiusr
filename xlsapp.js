const firebase = require("firebase");
require("firebase/firestore");

const XLSX = require("xlsx");

const ExcelAJson = () => {
  const excel = XLSX.readFile("uploadf1.xlsx");

  var nameSheet = excel.SheetNames;
  let datos = XLSX.utils.sheet_to_json(excel.Sheets[nameSheet[0]]);
  console.log(datos)
};

ExcelAJson();
