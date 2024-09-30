import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm"

@Entity()
export class Autor {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    nome: string

    @Column({
        type: "varchar",
        length: 200 ,
        nullable: false
    })
    descricao: string

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @CreateDateColumn()
    createdAt: Date


    constructor(nome: string,email: string, descricao: string) {
        this.nome = nome
        this.email = email
        this.descricao = descricao
    }
}
