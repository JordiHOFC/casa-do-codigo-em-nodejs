import {EntityManager} from "typeorm";
import {Request, Response} from "express";
import {Autor} from "../model/Autor";
import {AppDataSourceConnection} from "../configuration/DatabaseConnection";
import {validationResult} from "express-validator";
import LoggerInstance from "../configuration/LoggerConfiguration";

class NovoAutorController {
    private entityManager: EntityManager

    constructor() {
        this.entityManager = AppDataSourceConnection.createEntityManager();
    }

    async cadastrar(req: Request, res: Response) {
        LoggerInstance.info('Starting NovoAutorController')
        const validationErros = validationResult(req)

        if (!validationErros.isEmpty()) {
            LoggerInstance.info('Finishing NovoAutorController')
            return res.status(400).json({errors: validationErros.array()})
        }

        const payload = req.body
        await this.entityManager.transaction(async (tx) => {
            let repository = tx.getRepository(Autor);

            const existeCadastroComEmail = await repository.existsBy({
                email: payload.email
            });

            if (existeCadastroComEmail) {
                LoggerInstance.info('Finishing NovoAutorController')
                res.status(422).json({messsage: "Já existe cadastro de Autor com esse email"})
                return
            }

            var autor = new Autor(payload.nome, payload.email, payload.descricao);
            await repository.save(autor)
            res.status(201);
            return
        })
        LoggerInstance.info('Finishing NovoAutorController')
        return res.send()
    }
}

export default NovoAutorController;