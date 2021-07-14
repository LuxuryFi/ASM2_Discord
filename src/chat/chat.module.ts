import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatLog } from 'src/database/entities/chat.entity';
import { Message } from 'src/database/entities/message.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatLog,Message])
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
