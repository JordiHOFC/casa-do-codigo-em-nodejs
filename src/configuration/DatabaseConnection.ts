import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import {Autor} from "../model/Autor"
import {Categoria} from "../model/Categoria";

const options: DataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [
        Autor,
        Categoria
    ],
    migrations: [],
    subscribers: [],
};

export  const AppDataSourceConnection = new DataSource(options)






