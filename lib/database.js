import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://joalex:17569323Jouu1n@cluster0.rzvef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db('myFirstDatabase');
  return next();
}

const middleware = nextConnect();
middleware.use(database);

export default middleware;
