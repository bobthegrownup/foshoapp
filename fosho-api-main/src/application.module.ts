import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { DomainModule } from '@domains/domain.module';

@Module({
  imports: [CoreModule, DomainModule],
})
export class ApplicationModule {}
