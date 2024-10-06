import express from 'express';
import {CategoriaValidator} from "../validator/CategoriaValidator";
import NovaCategoriaController from "../controller/NovaCategoriaController";


const router = express.Router()
const novaCategoriaController = new NovaCategoriaController()

router.post('/categorias', CategoriaValidator, novaCategoriaController.cadastrar.bind(novaCategoriaController))

export default router