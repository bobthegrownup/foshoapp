import { Repository } from '@core/repositories/repository';
import { Injectable } from '@nestjs/common';
import { AttendeeEntity } from '../entities/attendees.entity';

@Injectable()
export class AttendeesRepository extends Repository<AttendeeEntity> {
  constructor() {
    super(AttendeeEntity);
  }

  getEntity(parameters: Partial<AttendeeEntity>): AttendeeEntity {
    return new AttendeeEntity(parameters);
  }
}
