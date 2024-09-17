import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('registers')
export class RegisterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  calendarId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  twitter: string;

  @Column()
  telegram: string;
}
