import {MigrationInterface, QueryRunner} from "typeorm";

export class anluon1623485464697 implements MigrationInterface {
    name = 'anluon1623485464697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `admin` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role_id` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `category_description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `course` (`id` int NOT NULL AUTO_INCREMENT, `course_name` varchar(255) NOT NULL, `course_description` varchar(255) NOT NULL, `category_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subject` (`id` int NOT NULL AUTO_INCREMENT, `sub_name` varchar(255) NOT NULL, `sub_description` varchar(255) NOT NULL DEFAULT 'TOPUP AND BTEC', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `trainer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role_id` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `course_detail` (`course_id` int NOT NULL, `subject_id` int NOT NULL, `trainer_id` int NOT NULL, PRIMARY KEY (`course_id`, `subject_id`, `trainer_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `trainee` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role_id` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `registration` (`trainee_id` int NOT NULL, `course_id` int NOT NULL, `subjectid` int NOT NULL, `trainer_id` int NOT NULL, `subject_id` int NOT NULL, PRIMARY KEY (`trainee_id`, `course_id`, `subjectid`, `trainer_id`, `subject_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `staff` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role_id` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `course` ADD CONSTRAINT `FK_2f133fd8aa7a4d85ff7cd6f7c98` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `course_detail` ADD CONSTRAINT `FK_85f3d59bbbda6045068211c8dfe` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `course_detail` ADD CONSTRAINT `FK_885f2ad2245ebc0a5efc1735a27` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `course_detail` ADD CONSTRAINT `FK_f14b9b38b764b8108a952db9673` FOREIGN KEY (`trainer_id`) REFERENCES `trainer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `registration` ADD CONSTRAINT `FK_217612dfc5d6ff916a95419179a` FOREIGN KEY (`trainee_id`) REFERENCES `trainee`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `registration` ADD CONSTRAINT `FK_3a95040d7340d62923cad5be701` FOREIGN KEY (`course_id`, `subject_id`, `trainer_id`) REFERENCES `course_detail`(`course_id`,`subject_id`,`trainer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `registration` DROP FOREIGN KEY `FK_3a95040d7340d62923cad5be701`");
        await queryRunner.query("ALTER TABLE `registration` DROP FOREIGN KEY `FK_217612dfc5d6ff916a95419179a`");
        await queryRunner.query("ALTER TABLE `course_detail` DROP FOREIGN KEY `FK_f14b9b38b764b8108a952db9673`");
        await queryRunner.query("ALTER TABLE `course_detail` DROP FOREIGN KEY `FK_885f2ad2245ebc0a5efc1735a27`");
        await queryRunner.query("ALTER TABLE `course_detail` DROP FOREIGN KEY `FK_85f3d59bbbda6045068211c8dfe`");
        await queryRunner.query("ALTER TABLE `course` DROP FOREIGN KEY `FK_2f133fd8aa7a4d85ff7cd6f7c98`");
        await queryRunner.query("DROP TABLE `staff`");
        await queryRunner.query("DROP TABLE `registration`");
        await queryRunner.query("DROP TABLE `trainee`");
        await queryRunner.query("DROP TABLE `course_detail`");
        await queryRunner.query("DROP TABLE `trainer`");
        await queryRunner.query("DROP TABLE `subject`");
        await queryRunner.query("DROP TABLE `course`");
        await queryRunner.query("DROP TABLE `category`");
        await queryRunner.query("DROP TABLE `admin`");
    }

}
