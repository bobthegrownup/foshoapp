import { Injectable } from '@nestjs/common';
import { XcrowService } from '@core/services/xcrow/xcrow.service';
import { DepositDto } from '@domains/transactions/dto/deposit.dto';
import { TransactionService } from '@domains/transactions/services/transaction.service';
import { TransactionStatus } from '@domains/transactions/entities/transaction.entity';

@Injectable()
export class DepositUseCase {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly xcrowService: XcrowService,
  ) {}

  async execute(depositDto: DepositDto) {
    const response = await this.xcrowService.deposit(depositDto);

    const amount = this.convertAmount(
      response.asset.amount,
      response.asset.decimals,
    );

    const transaction = await this.transactionService.create({
      vaultId: response.vault_id,
      xcrowTransactionId: response.transaction_id,
      status: TransactionStatus.PENDING,
      asset: {
        amount: response.asset.amount,
        decimals: response.asset.decimals,
        symbol: response.asset.symbol,
        imageUrl: response.asset.logo_uri,
        mintAddress: response.asset.token,
      },
    });

    return {
      transactionId: transaction.id,
      serializedTransaction: response.serialized_transaction,
    };
  }

  convertAmount(amount: number, decimals: number): number {
    return amount / Math.pow(10, decimals);
  }
}
