import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    sub_name : string

    @Column({default: "TOPUP AND BTEC"})
    sub_description: string
}
