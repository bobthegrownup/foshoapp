import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AttendeeEntity } from './attendees.entity';

// transformer
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  walletAddress: string;

  @Column('numeric', {
    precision: 6,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column()
  eventTimestamp: Date;

  @OneToMany(() => AttendeeEntity, (attendee) => attendee.event)
  attendees: AttendeeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  constructor(props: Partial<EventEntity>) {
    const entity = plainToInstance(EventEntity, props);
    Object.assign(this, entity);
  }
}
