import { Repository } from '@core/repositories/repository';
import { TransactionEntity } from '@domains/transactions/entities/transaction.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository extends Repository<TransactionEntity> {
  constructor() {
    super(TransactionEntity);
  }

  getEntity(parameters: Partial<TransactionEntity>): TransactionEntity {
    return new TransactionEntity(parameters);
  }
}
