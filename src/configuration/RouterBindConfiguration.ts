import AutorRouter from "../router/AutorRouter";
import {Express} from "express";
import CategoriaRouter from "../router/CategoriaRouter";

const routes = (app: Express) => {
    app.use(AutorRouter)
    app.use(CategoriaRouter)
}

export default routes