import { MongoClient } from 'mongodb'

let uri = "mongodb+srv://joalex:17569323Jouu1n@cluster0.rzvef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
let dbName = "myFirstDatabase"

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}