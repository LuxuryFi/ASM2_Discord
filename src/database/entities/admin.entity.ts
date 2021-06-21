import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admin {
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

    @Column({default:'admin'})
    role_id : string

}
