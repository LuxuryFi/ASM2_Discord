import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    course_name : string

    @Column()
    course_description: string

    @ManyToOne(type => Category)
    @JoinColumn({name: "category_id"})
    category:Category

    @Column()
    category_id: number
}
