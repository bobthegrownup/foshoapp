import { Module } from '@nestjs/common';
import { DatabaseModule } from '@core/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
})
export class InfraModule {}
