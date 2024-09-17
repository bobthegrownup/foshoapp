import { ModuleMetadata } from '@nestjs/common';
import { TransactionService } from '@domains/transactions/services/transaction.service';
import { TransactionRepository } from '@domains/transactions/repositories/transaction.repository';
import { DepositUseCase } from '@domains/transactions/usecases/deposit.usecase';
import { TransactionController } from '@domains/transactions/controllers/transaction.controller';
import { WithdrawUseCase } from '@domains/transactions/usecases/withdraw.usecase';

export const transactionProvider: ModuleMetadata = {
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    DepositUseCase,
    WithdrawUseCase,
  ],
};
