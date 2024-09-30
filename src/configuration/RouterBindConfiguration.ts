import AutorRouter from "../router/AutorRouter";
import {Express} from "express";

const routes = (app: Express) => {
    app.use(AutorRouter)
}

export default routes