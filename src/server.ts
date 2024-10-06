import {AppDataSourceConnection} from "./configuration/DatabaseConnection"
import {Server} from "http";
import { AppServer } from "./index";

const dotenv = require('dotenv');
dotenv.config()

const serverPort = process.env.SERVER_PORT || 3009
let httpServer: Server;


AppDataSourceConnection.initialize().then(async () => {
    httpServer = AppServer.listen(serverPort,()=>{
        console.log(`Server started in port ${serverPort} !!`)
    })
    console.log("Database started !!")
}).catch(error => console.log(error))


process.on('SIGINT', () => {
    console.log('** Receive SIGINT');
    httpServer.close(() => {
        console.log('** HTTP server closed');
    });
});