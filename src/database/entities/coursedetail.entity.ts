import { Subject } from "./subject.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Course } from "./course.entity";
import { Trainer } from "./trainer.entity";


@Entity()
export class CourseDetail {

    @ManyToOne(type => Course, {primary: true})
    @JoinColumn({name: "course_id"})
    course: Course

    @ManyToOne(type => Subject, {primary: true})
    @JoinColumn({name: "subject_id"})
    subject: Subject

    @ManyToOne(type => Trainer, {primary: true})
    @JoinColumn({name: "trainer_id"})
    trainer: Trainer

    @PrimaryColumn()
    course_id: number

    @PrimaryColumn()
    subject_id: number

    @PrimaryColumn()
    trainer_id: number
}
