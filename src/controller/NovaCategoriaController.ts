import {EntityManager} from "typeorm";
import {Request, Response} from "express";
import {Autor} from "../model/Autor";
import {AppDataSourceConnection} from "../configuration/DatabaseConnection";
import {validationResult} from "express-validator";
import LoggerInstance from "../configuration/LoggerConfiguration";
import {Categoria} from "../model/Categoria";

class NovaCategoriaController {
    private entityManager: EntityManager
    private appDataSourceConnection

    constructor() {
        this.appDataSourceConnection = AppDataSourceConnection;
        this.entityManager = this.appDataSourceConnection.createEntityManager();

    }

    async cadastrar(req: Request, res: Response) {
        LoggerInstance.info('Starting NovaCategoriaController')

        const validationErros = validationResult(req)

        if (!validationErros.isEmpty()) {
            LoggerInstance.info('Finishing NovaCategoriaController')
            return res.status(400).json({errors: validationErros.array()})
        }
        const payload = req.body

        this.appDataSourceConnection.initialize().then(async ()=>{
            await this.entityManager.transaction(async (tx) => {
                let repository = tx.getRepository(Categoria);

                const existeCadastroComNome = await repository.existsBy({
                    nome: payload.nome
                });

                if (existeCadastroComNome) {
                    LoggerInstance.info('Finishing NovaCategoriaController')
                    res.status(422).json({message: "Já existe cadastro de Categoria com este nome"})
                    return
                }

                var categoria = new Categoria(payload.nome);
                await repository.save(categoria)
                res.status(201);
                return
            })
            LoggerInstance.info('Finishing NovaCategoriaController')
            return
        })

       return res.send()
    }
}

export default NovaCategoriaController;