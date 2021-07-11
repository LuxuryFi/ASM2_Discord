import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admin {
    @PrimaryGeneratedColumn() //declare primary column with auto increment id
    id: number

    @Column() //declare normal column
    name: string

    @Column()
    avatar: string

    @Column()
    phone: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({default:'admin'}) //declare column with default value 'admin'
    role_id : string

}
