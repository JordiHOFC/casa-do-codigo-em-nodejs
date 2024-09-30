import express from 'express';
import {AutorValidator} from "../validator/AutorValidator";
import NovoAutorController from "../controller/NovoAutorController";


const router = express.Router()
const novoAutorController = new NovoAutorController()

router.post('/autores', AutorValidator, novoAutorController.cadastrar.bind(novoAutorController))

export default router