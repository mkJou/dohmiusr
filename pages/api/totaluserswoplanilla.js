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

  let doc = await req.db.collection('users').find({ ATTENDED: false, TALLER: "ASISTENTE-COCINA" }).toArray()

  let newDoc = []

  doc.forEach(element => {

    if (element.N_PLANILLA != 0) {

      element.GP = "B"
      newDoc.push(element)
      listf[element.FASE] = listf[element.FASE] + 1;
    }
  });

  // data.forEach(element => {

  //     if (element.TALLER == "FRITURA-ZULIANA") {
  //         if (element.N_PLANILLA != 0) {
  //             listf[element.FASE] = listf[element.FASE] + 1;
  //         }
  //     }

  // })

  return res.json({...listf, length: newDoc.length, newDoc})

  // 

  // 

  // 

  // 

  // console.log(listf)
  // return res.json(newDoc);

});

export default handler;