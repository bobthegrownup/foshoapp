import { Module } from '@nestjs/common';
import { CalendarController } from './caledar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from './register.entity';
import { CalendarService } from './calendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEntity])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
