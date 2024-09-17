import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TransactionService } from '@domains/transactions/services/transaction.service';
import { XcrowService } from '@core/services/xcrow/xcrow.service';
import { AttendeesService } from '../services/attendees.service';
import { EventsService } from '../services/events.service';
import {
  TransactionEntity,
  TransactionStatus,
} from '@domains/transactions/entities/transaction.entity';

interface Claim {
  eventId: string;
  walletAddress: string;
  transactionId: string;
  serializedTransaction: string;
}

@Injectable()
export class ClaimUseCase {
  constructor(
    private readonly eventService: EventsService,
    private readonly transactionService: TransactionService,
    private readonly xcrowService: XcrowService,
    private readonly attendeeService: AttendeesService,
  ) {}

  async execute(dto: Claim) {
    const event = await this.eventService.findOne({
      where: {
        id: dto.eventId,
      },
      relations: {
        attendees: true,
      },
    });

    if (!event) throw new NotFoundException('Event not found');

    const attendee = event.attendees.find(
      (attendee) =>
        attendee.walletAddress === dto.walletAddress &&
        attendee.claimStatus === 'WAITING_CLAIM',
    );

    if (!attendee) throw new Error('Attendee is not eligible for claim');

    const transaction = await this.transactionService.findOne({
      where: {
        id: dto.transactionId,
      },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    await this.executeTransaction(transaction, dto, attendee.vaultId);

    await this.attendeeService.update(attendee.id, {
      claimStatus: 'CLAIMED',
    });

    return {
      ok: true,
    };
  }

  private async executeTransaction(
    transaction: TransactionEntity,
    dto: Claim,
    vaultId: string,
  ) {
    try {
      await this.xcrowService.execute({
        serializedTransaction: dto.serializedTransaction,
        transactionId: transaction.xcrowTransactionId,
        vaultId,
      });

      await this.transactionService.update(transaction.id, {
        status: TransactionStatus.EXECUTED,
      });
    } catch (e) {
      await this.transactionService.update(transaction.id, {
        status: TransactionStatus.FAILED,
      });
      throw new InternalServerErrorException('Failed to execute transaction');
    }
  }
}
