import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from '@domains/transactions/entities/transaction.entity';
import { AttendeeEntity } from '@domains/events/entities/attendees.entity';

@Entity('assets')
export class AssetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mintAddress: string;

  @Column()
  symbol: string;

  @Column()
  imageUrl: string;

  @Column()
  amount: number;

  @Column()
  decimals: number;

  @OneToOne(() => AttendeeEntity, (attendee) => attendee.asset)
  attendee: AttendeeEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.asset)
  transaction: TransactionEntity;
}
