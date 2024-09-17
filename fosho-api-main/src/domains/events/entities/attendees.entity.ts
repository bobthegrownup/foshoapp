import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { EventEntity } from './events.entity';
import { AssetEntity } from '@domains/assets/entities/asset.entity';

@Entity('attendees')
export class AttendeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventId: string;

  @Column()
  fullName: string;

  @Column()
  walletAddress: string;

  @Column()
  twitter: string;

  @Column()
  telegram: string;

  @Column()
  email: string;

  @Column()
  discord: string;

  @CreateDateColumn()
  registeredAt: Date;

  @Column()
  claimStatus: string;

  @Column()
  vaultId: string;

  @Column()
  assetId: string;

  @ManyToOne(() => EventEntity, (event) => event.attendees)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @OneToOne(() => AssetEntity, (asset) => asset.attendee)
  @JoinColumn({ name: 'asset_id' })
  asset: AssetEntity;

  constructor(props: Partial<AttendeeEntity>) {
    const entity = plainToInstance(AttendeeEntity, props);
    Object.assign(this, entity);
  }
}
