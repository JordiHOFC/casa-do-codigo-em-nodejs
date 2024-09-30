import express from "express";
import actuator from "express-actuator";
import bodyParser from "body-parser";
import routes from "./configuration/RouterBindConfiguration";

const appServer = express()
const options: actuator.Options = {
    basePath: '/management',
    infoGitMode: 'simple',
};

appServer.use(bodyParser.urlencoded({extended: false}));
appServer.use(bodyParser.json());
appServer.use(actuator(options));
routes(appServer)

export const AppServer = appServer