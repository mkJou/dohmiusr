// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import middleware from '../../lib/database'

import { useState } from 'react'

import { ObjectId } from "mongodb"

//dbConnect()

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

  const listf = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0
  }

  let doc = await req.db.collection('users').find({ N_PLANILLA: 0}).toArray()

  return res.json(doc)

  // const semail = [
  //   20661031,
  //   5163475,
  //   25906521,
  //   18846748,
  //   31126184,
  //   29509704,
  //   26857715,
  //   31274935,
  //   17414941,
  //   15889946,
  //   15939307,
  //   13008124,
  //   9764812,
  //   22396931,
  //   20379481,
  //   7805444,
  //   10407380,
  //   17684649,
  //   15011809,
  //   13372183,
  //   14522678,
  //   20689293,
  //   20691417,
  //   7971023,
  //   18119113,
  //   30603653,
  //   24732976,
  //   12038996,
  //   9160136,
  //   13742624,
  //   11863049,
  //   26126039,
  //   22259103,
  //   21596487,
  //   3777712,
  //   22169414,
  //   26986530,
  //   29977470,
  //   31016059,
  //   25241838,
  // ]

  // let newDoc = []

  // const searchUser = async () => {

  //   const newlet = []

  //   for (let index = 0; index < semail.length; index++) {
  //     const element = semail[index];
  //     const data = await req.db.collection('users').findOne({ CEDULA: element })
  //     newlet.push(data)
  //   }
  //   return newlet
  // }

  // const lete = await searchUser()

  //let doc = await req.db.collection('users').find({ ATTENDED: false, TALLER: "ASISTENTE-COCINA" }).toArray()

  //

  // doc.forEach(element => {

  //   if (element.N_PLANILLA != 0) {

  //     element.GP = "B"
  //     newDoc.push(element)
  //     listf[element.FASE] = listf[element.FASE] + 1;
  //   }
  // });

  // data.forEach(element => {

  //     if (element.TALLER == "FRITURA-ZULIANA") {
  //         if (element.N_PLANILLA != 0) {
  //             listf[element.FASE] = listf[element.FASE] + 1;
  //         }
  //     }

  // })

  //return res.json(lete)
  //return res.json({ ...listf, length: newDoc.length, newDoc })

  // 

  // 

  // 

  // 

  // console.log(listf)
  // return res.json(newDoc);

});

export default handler;