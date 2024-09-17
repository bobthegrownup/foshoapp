import { WithdrawDto } from '@domains/transactions/dto/withdraw.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { XcrowService } from '@core/services/xcrow/xcrow.service';
import { TransactionService } from '@domains/transactions/services/transaction.service';
import { EventsService } from '@domains/events/services/events.service';
import { TransactionStatus } from '@domains/transactions/entities/transaction.entity';

@Injectable()
export class WithdrawUseCase {
  constructor(
    private readonly eventsService: EventsService,
    private readonly xcrowService: XcrowService,
    private readonly transactionService: TransactionService,
  ) {}

  async execute(id: string, dto: WithdrawDto) {
    const event = await this.eventsService.findOne({
      where: { id },
      relations: {
        attendees: {
          asset: true,
        },
      },
    });

    if (!event) throw new NotFoundException('Event not found');

    const attendee = event.attendees.find(
      (attendee) =>
        attendee.walletAddress === dto.payer &&
        attendee.claimStatus === 'WAITING_CLAIM',
    );

    if (!attendee) throw new NotFoundException('Attendee not found');

    const amount =
      attendee.asset.amount / Math.pow(10, attendee.asset.decimals);

    const withdraw = await this.xcrowService.withdraw({
      payer: dto.payer,
      strategy: dto.strategy,
      vaultId: attendee.vaultId,
      token: {
        mintAddress: attendee.asset.mintAddress,
        amount,
      },
    });

    const transaction = await this.transactionService.create({
      assetId: attendee.assetId,
      vaultId: withdraw.vault_id,
      xcrowTransactionId: withdraw.transaction_id,
      status: TransactionStatus.PENDING,
    });

    return {
      transactionId: transaction.id,
      serializedTransaction: withdraw.serialized_transaction,
    };
  }
}
