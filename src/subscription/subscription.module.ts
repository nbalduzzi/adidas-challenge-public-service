import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionGateway } from './subscription.gateway';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionGateway],
})
export class SubscriptionModule {}
