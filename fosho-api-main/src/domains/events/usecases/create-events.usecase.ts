import { Injectable } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-events.dto';

@Injectable()
export class CreateEventUseCase {
  constructor(private readonly eventService: EventsService) {}

  async execute(dto: CreateEventDto) {
    return await this.eventService.create({
      name: dto.name,
      location: dto.location,
      description: dto.description,
      content: dto.content,
      walletAddress: dto.walletAddress,
      amount: dto.amount,
      eventTimestamp: dto.eventTimestamp,
    });
  }
}
