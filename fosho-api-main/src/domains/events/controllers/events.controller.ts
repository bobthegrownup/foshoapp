import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateEventUseCase } from '@domains/events/usecases/create-events.usecase';

import { RegisterEventUseCase } from '@domains/events/usecases/register-events.usecase';
import { ClaimDto } from '@domains/events/dto/claim.dto';
import { ClaimUseCase } from '@domains/events/usecases/claim.usecase';
import { AddClaimUseCase } from '../usecases/add-claim.usecase';
import { CreateEventDto } from '../dto/create-events.dto';
import { RegisterEventDto } from '../dto/register-events.dto';
import { AddClaimDto } from '../dto/add-claim.dto';
import { EventsService } from '../services/events.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly registerEventUseCase: RegisterEventUseCase,
    private readonly addClaimCase: AddClaimUseCase,
    private readonly claimUseCase: ClaimUseCase,
  ) {}

  @Post('create-event')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.createEventUseCase.execute(createEventDto);
  }

  @Get()
  async getEvents() {
    return this.eventsService.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  @Get('/:id')
  async getEventById(@Param('id') id: string) {
    return this.eventsService.findOne({
      where: {
        id,
      },
      relations: {
        attendees: {
          asset: true,
        },
      },
    });
  }

  @Post('/:eventId/register')
  async registerEvent(
    @Param('eventId') eventId: string,
    @Body() dto: RegisterEventDto,
  ) {
    return this.registerEventUseCase.execute({
      eventId,
      dto,
    });
  }

  @Post('/:eventId/add-claim')
  async addClaim(@Param('eventId') eventId: string, @Body() dto: AddClaimDto) {
    return this.addClaimCase.execute({
      eventId,
      dto,
    });
  }

  @Post('/:id/claim')
  async claim(@Param('id') id: string, @Body() dto: ClaimDto) {
    return this.claimUseCase.execute({
      eventId: id,
      ...dto,
    });
  }
}
