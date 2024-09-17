import { Module } from '@nestjs/common';
import { ServiceProvider } from '@core/service-provider';
import { CoreModule } from '@core/core.module';
import { EventsProvider } from './events/events.provider';
import { transactionProvider } from './transactions/transaction.provider';

const serviceProvider = ServiceProvider.buildByProviders([
  EventsProvider,
  transactionProvider,
]);
serviceProvider.addImport(CoreModule);

@Module(serviceProvider.getModule())
export class DomainModule {}
