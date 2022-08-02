const XLSX = require("xlsx");
const fs = require("fs");
const finalObject = {};

myFile = "./LISTA-TOTAL.xlsx";

const data = XLSX.read(myFile, { type: "buffer" });
data.SheetNames.forEach((sheetName) => {
  let rowObject = XLSX.utils.sheet_to_json(data.Sheets[sheetName]);
  console.log(rowObject);
  finalObject[sheetName] = rowObject;
});
