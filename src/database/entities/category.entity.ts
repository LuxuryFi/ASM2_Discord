import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    category_name : string

    @Column()
    category_description : string
}
