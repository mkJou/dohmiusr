// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import middleware from '../../lib/database'

//dbConnect()

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let doc = await req.db.collection('users').find().toArray()
    console.log(doc.length);
    res.json({ 'count': doc.length });
});

export default handler;