import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RegisterEntity } from './register.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './register.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly registerRepository: Repository<RegisterEntity>,
  ) {}

  register(calendarId: string, dto: RegisterDto) {
    return this.registerRepository.save({
      ...dto,
      calendarId,
    });
  }
}
