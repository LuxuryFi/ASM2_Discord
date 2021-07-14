import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatLog } from 'src/database/entities/chat.entity';
import { Message } from 'src/database/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
    constructor (
        @InjectRepository(ChatLog) chatlogRepository : Repository<ChatLog>,
    @InjectRepository(Message) messageRepository: Repository<Message>) {}




}