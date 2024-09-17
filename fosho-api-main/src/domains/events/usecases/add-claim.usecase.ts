import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { AttendeesService } from '../services/attendees.service';
import { AddClaimDto } from '../dto/add-claim.dto';

interface AddClaim {
  eventId: string;
  dto: AddClaimDto;
}

@Injectable()
export class AddClaimUseCase {
  constructor(
    private readonly eventService: EventsService,
    private readonly attendeeService: AttendeesService,
  ) {}

  async execute({ eventId, dto }: AddClaim) {
    const event = await this.eventService.findOne({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    dto.attendeesId.map(async (attendeeId) => {
      const attendee = await this.attendeeService.findOne({
        where: {
          id: attendeeId,
        },
      });

      if (!attendee) {
        throw new NotFoundException('Attendee not found');
      }

      await this.attendeeService.update(attendeeId, {
        claimStatus: 'WAITING_CLAIM',
      });
    });
  }
}
