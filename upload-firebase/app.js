import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import XLSX from "xlsx";

/** CONNECTION */
const firebaseConfig = {
  apiKey: "AIzaSyCHjbaHRmlHGPzZt-99Yk2Y1SmYhwGoGSQ",
  authDomain: "dohmiusr.firebaseapp.com",
  projectId: "dohmiusr",
  storageBucket: "dohmiusr.appspot.com",
  messagingSenderId: "81484010552",
  appId: "1:81484010552:web:f99bf1cd710fc3d17dc2cd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var datos = [];

const ExcelEnter = () => {
  const excel = XLSX.readFile("databs3.xlsx");

  var nameSheet = excel.SheetNames;
  datos = XLSX.utils.sheet_to_json(excel.Sheets[nameSheet[0]]);
  console.log(nameSheet[0]);
};

ExcelEnter();

const uploadUsersOne = async () => {
  for (let index = 0; index < datos.length; index++) {
    const user = datos[index];

    try {
      const dr = await addDoc(collection(db, "users"), user);
      console.log("Document written with ID: ", dr.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

// <option value="TALLER-PIZZERIA">TALLER DE PIZZERIA</option>
// <option value="TALLER-PASTAS-FRESCAS">TALLER DE PASTAS FRESCAS</option>
// <option value="TALLER-REPOSTERIA">REPOSTERIA</option>
// <option value="PANADERIA-COMERCIAL">PANADERIA COMERCIAL</option>
// <option value="BARISMO">BARISMO</option>
// <option value="FRITURA-ZULIANA">FRITURA ZULIANA</option>
// <option value="SALSA-PASTAS">SALSA PARA PASTAS</option>
// <option value="POSTRES-LIGEROS">POSTRES LIGEROS</option>
// <option value="COMIDA-RAPIDA">COMIDA RAPIDA</option>
// <option value="ASISTENTE-COCINA">ASISTENTE DE COCINA</option>

const uploadUsersSpecify = async () => {
  for (let index = 0; index < datos.length; index++) {
    const user = datos[index];

    /*if (user.TALLER == "Panaderia comercial") {
      user.TALLER = "PANADERIA-COMERCIAL";
    }*/

    /** TALLER */
    //user.TALLER = "TALLER BARISMO"
    /** ASISTIO */
    //user.ATTENDED = true
    /** FASE */
    //user.FASE = "4"
    /** QUE ASISTIO */
    //user.COMPLETION = "2"
    /** OBSERVACIONES */
    //user.OBSERVATIONS = ""

    try {
      //const dr = await addDoc(collection(db, "users"), user);
      console.log(user)
      //console.log("Document written with ID: ", dr.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

//uploadUsersOne()
uploadUsersSpecify();
