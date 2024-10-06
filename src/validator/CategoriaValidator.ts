import {body} from "express-validator";

export const CategoriaValidator = [
    body('nome', 'Campo Nome não deve ser em branco').not().isEmpty()
]


