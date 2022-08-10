// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import middleware from '../../lib/database'

//dbConnect()

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const { select, inputr } = req.body;

    const selectlist = {
        [select]: { $search: `/${inputr}/` }
    }

    console.log(selectlist)
    let doc = await req.db.collection('users').find(selectlist).toArray()
    res.json(doc)

    //let doc = await req.db.collection('users').find().toArray()
    //console.log(doc.length);
    //res.json({ 'count': doc.length });
});

export default handler;