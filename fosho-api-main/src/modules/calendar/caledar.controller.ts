import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { calendar } from './calendar';
import { CalendarService } from './calendar.service';
import { RegisterDto } from './register.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  async show() {
    return calendar;
  }

  @Post(':calendarId/register')
  async register(
    @Param('calendarId') calendarId: string,
    @Body() dto: RegisterDto,
  ) {
    return this.calendarService.register(calendarId, dto);
  }
}
