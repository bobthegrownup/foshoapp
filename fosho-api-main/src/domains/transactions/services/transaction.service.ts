import { Service } from '@core/services/data/service';
import { TransactionEntity } from '@domains/transactions/entities/transaction.entity';
import { TransactionRepository } from '@domains/transactions/repositories/transaction.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService extends Service<TransactionEntity> {
  constructor(private readonly transactionRepository: TransactionRepository) {
    super(transactionRepository);
  }
}
