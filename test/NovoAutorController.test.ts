import {AppServer} from '../src/index'
import {describe, it} from "node:test";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
// import {after, before} from "mocha";
import {before, after} from "node:test";
import * as assert from "assert";


const request = require('supertest');

describe('Testes sobre à API de Cadastrar Novo Autor', async () => {
    let container: StartedPostgreSqlContainer

    before(async  ()=>{
        container = await new PostgreSqlContainer()
            .withDatabase('livraria')
            .start();
        process.env.POSTGRES_HOST = container.getHost()
        process.env.POSTGRES_PORT = container.getPort().toString()
        process.env.POSTGRES_USER = container.getDatabase()
        process.env.POSTGRES_PASSWORD = container.getUsername()
        process.env.POSTGRES_HOST = container.getPassword()
        process.load
    })
    after(async () => {
        await container.stop()
    })


    it('Deve cadastrar um Novo Autor', async () => {

        const response = await request(AppServer).post('/autores').send({
            nome: 'Jordi H Silva',
            email: 'jordi.silva@email.com',
            descricao: 'alguma coisa que vale aqui'
        });

        assert.equal(response.status, 201)


        // const qtdAutoresCadastrados = (await testDataBase.connect()).getRepository(Autor).count();
        // assert.equal(qtdAutoresCadastrados,1)

    })


})