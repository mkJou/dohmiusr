// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import middleware from '../../lib/database'

//dbConnect()

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const { taller } = req.body

    const attendedlist = []
    const notattendedlist = []
    const errorlist = []
    // if (withoutPlanilla == true) {
    //     let doc = await req.db.collection('users').find({ ATTENDED: booleano, N_PLANILLA: 0 }).toArray()
    //     //console.log(doc.length);
    //     return res.json({ count: doc.length });
    // }

    let doc = await req.db.collection('users').find({ TALLER: String(taller) }).toArray()

    for (let index = 0; index < doc.length; index++) {
        const element = doc[index];

        if (element.ATTENDED == false) {
            notattendedlist.push(element)
        } else if (element.ATTENDED == true) {
            attendedlist.push(element)
        } else {
            errorlist.push(element)
        }
    }

    //console.log(doc.length);
    return res.json({ countA: attendedlist.length, countNa: notattendedlist.length });

});

export default handler;