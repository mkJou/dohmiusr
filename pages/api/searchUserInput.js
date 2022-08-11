// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import middleware from '../../lib/database'

//dbConnect()

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const { select, inputr } = req.body;

    let selectlist = {
        [select]: /{inputr}/
    }

    console.log(selectlist)
    let doc = await req.db.collection('users').find({ [select]: new RegExp(inputr, "i") }).toArray()
    res.json(doc)

    //let doc = await req.db.collection('users').find().toArray()
    //console.log(doc.length);
    //res.json({ 'count': doc.length });
});

export default handler;