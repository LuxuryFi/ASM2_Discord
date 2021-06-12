import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Course } from "./course.entity";
import { CourseDetail } from "./coursedetail.entity";
import { Trainee } from "./trainee.entity";



@Entity()
export class Registration {
    @ManyToOne(type => Trainee, {primary: true, onDelete: 'CASCADE'})
    @JoinColumn({name: 'trainee_id'})
    trainee: Trainee

    @ManyToOne(type => CourseDetail, {primary: true})
    @JoinColumn(
        [
            {name: 'course_id', referencedColumnName: 'course_id'},
            {name: 'subject_id', referencedColumnName: 'subject_id'},
            {name: 'trainer_id', referencedColumnName: 'trainer_id'}
        ]
    )
    course_detail: CourseDetail

    @PrimaryColumn()
    trainee_id: number

    @PrimaryColumn()
    course_id: number

    @PrimaryColumn()
    subjectid: number

    @PrimaryColumn()
    trainer_id: number
}
