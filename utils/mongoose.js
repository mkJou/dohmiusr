import { collection } from "firebase/firestore";
import { connect, connection } from "mongoose";

const conn = {
    isConnected: false
}

export const dbConnect = async () => {

    if (conn.isConnected) return;

    const db = await connect("mongodb+srv://joalex:17569323Jouu1n@cluster0.rzvef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

    conn.isConnected = db.connections[0].readyState;
    console.log(db.connection.db.databaseName)
}

export const db = connection;

db.on("connected", () => {
    console.log('Database connected')
})

db.on("error", (err) => {
    console.log('Database error:', err)
})
