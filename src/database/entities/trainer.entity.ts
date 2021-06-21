import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Trainer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    avatar: string

    @Column()
    phone: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({default:'trainer'})
    role_id : string



}
