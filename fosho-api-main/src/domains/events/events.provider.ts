import { ModuleMetadata } from '@nestjs/common';
import { EventsService } from '@domains/events/services/events.service';
import { CreateEventUseCase } from '@domains/events/usecases/create-events.usecase';
import { RegisterEventUseCase } from '@domains/events/usecases/register-events.usecase';
import { ClaimUseCase } from '@domains/events/usecases/claim.usecase';
import { AttendeesService } from './services/attendees.service';
import { AddClaimUseCase } from './usecases/add-claim.usecase';
import { EventsRepository } from './repositories/events.repository';
import { AttendeesRepository } from './repositories/attendees.repository';
import { EventsController } from './controllers/events.controller';

export const EventsProvider: ModuleMetadata = {
  controllers: [EventsController],
  providers: [
    EventsService,
    AttendeesService,
    EventsRepository,
    AttendeesRepository,
    CreateEventUseCase,
    RegisterEventUseCase,
    AddClaimUseCase,
    ClaimUseCase,
  ],
};
