import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AssetEntity } from '@domains/assets/entities/asset.entity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  EXECUTED = 'EXECUTED',
  FAILED = 'FAILED',
}

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  assetId: string;

  @Column()
  vaultId: string;

  @Column()
  xcrowTransactionId: string;

  @Column()
  status: TransactionStatus;

  @ManyToOne(() => AssetEntity, (asset) => asset.transaction, { cascade: true })
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  constructor(props: Partial<TransactionEntity>) {
    const entity = plainToInstance(TransactionEntity, props);
    Object.assign(this, entity);
  }
}
