import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';

import { XcrowService } from '@core/services/xcrow/xcrow.service';
import { HealthController } from '@core/controllers/health.controller';

const providers = [XcrowService];

@Module({
  controllers: [HealthController],
  imports: [InfraModule],
  providers: providers,
  exports: providers,
})
export class CoreModule {}
