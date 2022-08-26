// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import middleware from '../../lib/database'

import { useState } from 'react'

import { ObjectId } from "mongodb"

//dbConnect()

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

  let docCount = await req.db.collection('users').find({ CEDULA: { $type: "string" } }).toArray()
  let doc = await req.db.collection('users').find({ CEDULA: { $type: "string" } }).toArray()
  //let doc = await req.db.collection('users').find({ CEDULA: { $type: "number" } }).toArray()

  let newDoc = []
  let errorDoc = []

  doc.map(dc => {

    // try {
    //   dc.CORREO = String(dc.CORREO).toLowerCase()

    //   const updateOned = req.db.collection('users').updateOne({ _id: dc._id }, { $set: { CORREO: dc.CORREO } })
    //   newDoc.push(dc)
    //   console.log('CORREO UPDATE')

    // } catch (error) {
    //   errorDoc.push(dc)
    //   console.log('ERROR UPDATE', dc.NOMBRE_APELLIDO)
    // }

    if (typeof dc.CEDULA === 'string') {
      try {
        let pepe = dc.CEDULA;
        let newp = ''
        const divi = pepe.split('.')
        newp.concat(divi[0])
        // console.log('>>', 'test test test')
        divi.map(dv => {

          newp = `${newp}${dv}`

        })

        dc.CEDULA = parseInt(newp)

        //const updateOned = req.db.collection('users').updateOne({ _id: dc._id }, { $set: { CEDULA: dc.CEDULA } })
        newDoc.push(dc)
        console.log('CEDULA UPDATE')
      } catch (error) {
        errorDoc.push(dc)
        console.log('ERROR UPDATE', dc.CEDULA)
      }
    }
    else if (typeof dc.CEDULA === 'number') {
      console.log('Cedula correcta')
    } else {
      errorDoc.push(dc)
      console.log('ERROR UPDATE ADVERTANT', dc.CEDULA)
    }
  })

  //let newDoc = []

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
  console.log('Count:', doc.length, 'Updatedoc', newDoc.length)
  return res.json({ errorDoc: errorDoc, newDoc: docCount.length })

  // 

  // 

  // 

  // 

  // console.log(listf)
  // return res.json(newDoc);

});

export default handler;