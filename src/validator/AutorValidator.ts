import {body} from "express-validator";

export const AutorValidator = [
    body('nome', 'Campo Nome não deve ser em branco').not().isEmpty(),
    body('email', 'Campo Email não deve ser em branco').not().isEmpty(),
    body('email', 'Campo Email não estar em um formato valido').isEmail(),
    body('descricao', 'Campo Descricao não deve ser em branco').not().isEmpty(),
    body('descricao', 'O campo descricao deve ter no maximo o tamanho de 400 caracteres').isLength({max: 400}),
]


