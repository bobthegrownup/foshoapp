import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { XcrowService } from '@core/services/xcrow/xcrow.service';
import { TransactionService } from '@domains/transactions/services/transaction.service';
import { RegisterEventDto } from '../dto/register-events.dto';
import { AttendeesService } from '../services/attendees.service';
import {
  TransactionEntity,
  TransactionStatus,
} from '@domains/transactions/entities/transaction.entity';

interface RegisterEvent {
  dto: RegisterEventDto;
  eventId: string;
}

@Injectable()
export class RegisterEventUseCase {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly eventsService: EventsService,
    private readonly attendeeService: AttendeesService,
    private readonly xcrowService: XcrowService,
  ) {}

  async execute({ dto, eventId }: RegisterEvent) {
    const transaction = await this.transactionService.findOne({
      where: {
        id: dto.transactionId,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const event = await this.eventsService.findOne({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.executeTransaction(transaction, dto);

    return await this.attendeeService.create({
      eventId,
      fullName: dto.fullName,
      twitter: dto.twitter,
      telegram: dto.telegram,
      email: dto.email,
      discord: dto.discord,
      walletAddress: dto.walletAddress,
      vaultId: transaction.vaultId,
      assetId: transaction.assetId,
      claimStatus: 'OPEN',
    });
  }

  private async executeTransaction(
    transaction: TransactionEntity,
    dto: RegisterEventDto,
  ) {
    try {
      await this.xcrowService.execute({
        vaultId: transaction.vaultId,
        transactionId: transaction.xcrowTransactionId,
        serializedTransaction: dto.serializedTransaction,
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
