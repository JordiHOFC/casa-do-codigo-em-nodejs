import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm"

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        unique: true
    })
    nome: string

    @CreateDateColumn()
    createdAt: Date


    constructor(nome: string) {
        this.nome = nome
    }
}
