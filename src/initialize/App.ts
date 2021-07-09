import "reflect-metadata";
import {ConnectionMongoDb , Server} from "./index";

export class App {
  private server = new Server();
  private db = new ConnectionMongoDb()

  async appInitialize():Promise<Server>{

    await this.db.connect()
    this.server.init()
    return this.server
  }
}

