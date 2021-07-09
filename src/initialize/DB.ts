import "reflect-metadata";
import { mongoConnectionOptions } from '../configs'
import { connect } from "mongoose"
export class ConnectionMongoDb {

  async connect() {
    await connect(process.env.URI, mongoConnectionOptions)
      .then(connection => {
        console.log("DB Conected")
      }).catch(err => { console.log(err) })

  }
}
