import "reflect-metadata"
import { DataSource } from "typeorm"
import { Autor } from "../model/Autor"
import {properties} from "./ApplicationPropertiesConfig";

export const AppDataSourceConnection = new DataSource({
    type: "postgres",
    host: properties.POSTGRES_HOST,
    port: properties.POSTGRES_PORT,
    username: properties.POSTGRES_USER,
    password: properties.POSTGRES_PASSWORD,
    database: properties.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [Autor],
    migrations: [],
    subscribers: [],
})






