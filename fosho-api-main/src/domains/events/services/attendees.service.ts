import { Service } from '@core/services/data/service';
import { Injectable } from '@nestjs/common';
import { AttendeeEntity } from '../entities/attendees.entity';
import { AttendeesRepository } from '../repositories/attendees.repository';

@Injectable()
export class AttendeesService extends Service<AttendeeEntity> {
  constructor(private readonly eventsRepository: AttendeesRepository) {
    super(eventsRepository);
  }
}
