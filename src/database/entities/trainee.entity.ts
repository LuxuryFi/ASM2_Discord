import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Trainee {
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

    @Column({default: 'trainee'})
    role_id : string
}
