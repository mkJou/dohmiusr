import mongoose from "mongoose";
import XLSX from "xlsx";

import { ObjectId } from "mongodb"

mongoose.connect(
  "mongodb+srv://joalex:17569323Jouu1n@cluster0.rzvef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var datos = [];

const ExcelEnter = () => {
  const excel = XLSX.readFile("import/fase9just.xlsx", { cellDates: true });

  var nameSheet = excel.SheetNames;
  datos = XLSX.utils.sheet_to_json(excel.Sheets[nameSheet[7]]);
  console.log(nameSheet[7]);
};

ExcelEnter();

const uploadUsersSpecify = () => {
  for (let index = 0; index < datos.length; index++) {
    const user = datos[index];

    if (user.TALLER == "PANADERIA") {
      user.TALLER = "PANADERIA-COMERCIAL";
      console.log("PANADERIA COMERCIAL MODIFICADA");
    }

    if (user.CEDULA == undefined) {
      user.CEDULA = 0;
      console.log(">> Se ha detectado CEDULA undefined (LINEA DE ABAJO)");
    }

    if (user.N_PLANILLA == undefined) {
      user.N_PLANILLA = 0;
      console.log(">> Se ha detectado N_PLANILLA undefined (LINEA DE ABAJO)");
    }

    if (user.ESTADO == undefined) {
      user.ESTADO = "";
    }

    if (user.CIUDAD == undefined) {
      user.CIUDAD = "";
    }

    if (user.MUNICIPIO == undefined) {
      user.MUNICIPIO = "";
    }

    if (user.FASE == undefined) {
      user.FASE = 0;
      console.log(">> Se ha detectado FASE undefined (LINEA DE ABAJO)");
    }

    if (user.PROFESION == undefined) {
      user.PROFESION = "";
      console.log(">> Se ha detectado PROFESION undefined (LINEA DE ABAJO)");
    }

    if (user.FECHA_DE_NACIMIENTO == undefined) {
      user.FECHA_DE_NACIMIENTO = "";
      console.log(
        ">> Se ha detectado FECHA_DE_NACIMIENTO undefined (LINEA DE ABAJO)"
      );
    }

    if (user.CORREO == undefined) {
      user.CORREO = "";
      console.log(">> Se ha detectado CORREO undefined (LINEA DE ABAJO)");
    }

    if (user.PARROQUIA == undefined) {
      user.PARROQUIA = "";
      console.log(">> Se ha detectado PARROQUIA undefined (LINEA DE ABAJO)");
    }

    if (user.GRUPO == undefined) {
      user.GRUPO = "";
      console.log(">> Se ha detectado GRUPO undefined (LINEA DE ABAJO)");
    }

    if (user.DIRECCION == undefined) {
      user.CORREO = "";
      console.log(">> Se ha detectado CORREO undefined (LINEA DE ABAJO)");
    }

    /** TALLER */
    user.TALLER = "COMIDA-RAPIDA"
    /** ASISTIO */
    user.ATTENDED = false;
    user.COMPLETE = false;
    user.FASE = 9;
    user.ASSIGNED = false;
    /** FASE */

    /** QUE ASISTIO */
    //user.COMPLETION = "2"
    /** OBSERVACIONES */
    //user.OBSERVATIONS = ""

    try {
      //db.collection("users").insertOne(user);
      db.collection("users").insertOne(user);
      //const dr = await addDoc(collection(db, "users"), user);
      //console.log(user.FECHA_DE_NACIMIENTO);
      console.log("Document written with ID: ", "IMPORTANDO");
      console.log(
        "------------------------------------------------------------"
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

// //<option value="TALLER-PIZZERIA">TALLER DE PIZZERIA</option>
// //<option value="PASTAS-FRESCAS">TALLER DE PASTAS FRESCAS</option>
// //<option value="REPOSTERIA">REPOSTERIA</option>
// //<option value="PANADERIA-COMERCIAL">PANADERIA COMERCIAL</option>
// //<option value="BARISMO">BARISMO</option>
// <option value="FRITURA-ZULIANA">FRITURA ZULIANA</option>
// // <option value="SALSA-PASTAS">SALSA PARA PASTAS</option>
// // <option value="POSTRES-LIGEROS">POSTRES LIGEROS</option>
// // <option value="COMIDA-RAPIDA">COMIDA RAPIDA</option>
// //<option value="ASISTENTE-COCINA">ASISTENTE DE COCINA</option>
// //<option value="MESONERO">MESONERO</option>
// //<option value="CERT-PANADERO">Certificacion de panadero</option>
// //<option value="CERT-GASTRONOMICA">Certificacion gastronomicas</option>
// //<option value="CERT-COCINA">Certificacion de cocina</option>
// //<option value="CERT-REPOSTERIA">Certificacion de cocina</option>
// //<option value="CERT-COCINA">Certificacion de cocina</option>

const removeError = () => {
  try {
    db.collection("usersg2").deleteMany({ FASE: 8 });
    console.log("DELETED");
  } catch (error) {
    console.log("Error", error);
  }
};

const uploadJson = () => {

  const data = []

  const extractedRege = []

  const cursor = db.collection('inventory').find({});

  // doc.forEach(doc => {

  //   for (let index = 0; index < data.length; index++) {
  //     const element = data[index];

  //     if (element.oldid == doc._id) {
  //       extractedRege.push(element)
  //     }
  //   }
  // })

  console.log(extractedRege.length)
  // data.forEach(doc => {

  //   try {
  //     db.collection("usersg1").insertOne(doc);
  //     console.log("Document written.");
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }

  // })

}

async function replaceData() {

  let index = 0;
  const getData = db.collection('users').find({})
  const eje = await getData.exec()

  getData.map(doc => {

    index++;

  })

  console.log(index)
}

//uploadJson()
//removeError();

//replaceData()

uploadUsersSpecify();
