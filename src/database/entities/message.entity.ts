import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    content: string

    @CreateDateColumn()
    created_at: string
}
