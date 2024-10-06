import {AppServer} from '../src/index'
import {describe, it} from "node:test";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
// import {after, before} from "mocha";
import {before, after} from "node:test";
import * as assert from "assert";
import {exec} from "node:child_process";


const request = require('supertest');

describe('Testes sobre à API de Cadastrar Novo Autor', async () => {
    let container: StartedPostgreSqlContainer

    before(async () => {
        container = await new PostgreSqlContainer()
            .withDatabase('livraria')
            .start();
        console.log(process.env)
    })
    after(async () => {
        await container.stop()
    })


    it('Deve cadastrar um Autor', async () => {

        const response = await request(AppServer).post('/autores').send({
            nome: 'Jordi H Silva',
            email: 'jordi.silva@email.com',
            descricao: 'alguma coisa que vale aqui'
        });

        assert.equal(response.status, 201)


        // const qtdAutoresCadastrados = (await testDataBase.connect()).getRepository(Autor).count();
        // assert.equal(qtdAutoresCadastrados,1)

    })
    it('Não deve cadastrar um Autor com email já existente', async () => {

        const response = await request(AppServer).post('/autores').send({
            nome: 'Jordi H Silva',
            email: 'jordi.silva@email.com',
            descricao: 'alguma coisa que vale aqui'
        });

        assert.equal(response.status, 422)
        assert.equal(response.body.message, 'Já existe cadastro de Autor com esse email')


        // const qtdAutoresCadastrados = (await testDataBase.connect()).getRepository(Autor).count();
        // assert.equal(qtdAutoresCadastrados,1)

    })
    it('Não deve cadastrar um Autor com email e descricao invalido', async () => {

        const response = await request(AppServer).post('/autores').send({
            nome: 'Jordi H Silva',
            email: 'jordi.silvaemail.com',
            descricao: 'alguma coisa que vale aqui alguma' +
                ' coisa que vale aquialguma coisa que vale aquialguma coisa ' +
                'que vale aquialguma coisa que vale aquialguma coisa que vale' +
                'aquialguma coisa que vale aquialguma coisa que vale aquialg' +
                'uma coisa que vale aqui'
        });

        assert.equal(response.status, 400)
        assert.equal(response.body.errors.length, 2)
        assert.equal(response.body.errors[0], 'Campo Email não estar em um formato valido')
        assert.equal(response.body.errors[1], 'O campo descricao deve ter no maximo o tamanho de 400 caracteres')


    })
    it('Não deve cadastrar um Autor com dados invalidos', async () => {

        const response = await request(AppServer).post('/autores').send({

        });

        assert.equal(response.status, 400)
        assert.equal(response.body.errors.length, 3)
        assert.equal(response.body.errors[0], 'Campo Nome não deve ser em branco')
        assert.equal(response.body.errors[0], 'Campo Email não deve ser em branco')
        assert.equal(response.body.errors[0], 'Campo Descricao não deve ser em branco')


        // const qtdAutoresCadastrados = (await testDataBase.connect()).getRepository(Autor).count();
        // assert.equal(qtdAutoresCadastrados,1)

    })


})