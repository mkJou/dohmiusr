import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app, db } from "./firebase";

export const createUser = async (
  appr,
  approved,
  attendance,
  ci,
  email,
  fase,
  group,
  name,
  orden_number,
  planilla,
  taller,
  telephone,
  observaciones
) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      appr: appr,
      approved: approved,
      attendance: attendance,
      ci: ci,
      email: email,
      fase: fase,
      group: group,
      name: name,
      orden_number: orden_number,
      planilla: planilla,
      taller: taller,
      telephone: telephone,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const readUser = async (userci) => {
  const usersRef = collection(db, "users");

  const q = query(usersRef, where("ci", "==", userci));
  const querySnapshot = await getDocs(q);

  var resultData = {};

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    resultData = doc.data();
  });

  return resultData;

  /*const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  })*/
  /*const docRef = doc(db, "users", userci);
  

  */
};
