// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import middleware from '../../lib/database'

//dbConnect()

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const { booleano, withoutPlanilla } = req.body

    if (withoutPlanilla == true) {
        let doc = await req.db.collection('users').find({ ATTENDED: booleano, N_PLANILLA: 0 }).toArray()
        //console.log(doc.length);
        return res.json({ count: doc.length });
    }

    let doc = await req.db.collection('users').find({ ATTENDED: booleano }).toArray()
    //console.log(doc.length);
    return res.json({ count: doc.length });

});

export default handler;