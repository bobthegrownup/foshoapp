import { EventEntity } from '@domains/events/entities/events.entity';
import { Service } from '@core/services/data/service';
import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../repositories/events.repository';

@Injectable()
export class EventsService extends Service<EventEntity> {
  constructor(private readonly eventsRepository: EventsRepository) {
    super(eventsRepository);
  }
}
