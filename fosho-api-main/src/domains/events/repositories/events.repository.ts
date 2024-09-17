import { Repository } from '@core/repositories/repository';
import { EventEntity } from '@domains/events/entities/events.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsRepository extends Repository<EventEntity> {
  constructor() {
    super(EventEntity);
  }

  getEntity(parameters: Partial<EventEntity>): EventEntity {
    return new EventEntity(parameters);
  }
}
