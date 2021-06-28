import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/database/entities/subject.entity';
import { SubjectService } from 'src/subject/subject.service';
import { CrawlController } from './crawl.controller';
import { CrawlService } from './crawl.service';

@Module({
  imports:[TypeOrmModule.forFeature([Subject])],
  controllers: [CrawlController],
  providers: [CrawlService,SubjectService]
})
export class CrawlModule {}
