import { Injectable } from '@nestjs/common';
import { ISubscriptionService } from './subscription.interface';
import { SubscriptionGateway } from './subscription.gateway';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

@Injectable()
export class SubscriptionService implements ISubscriptionService {
  constructor(private readonly subscriptionGateway: SubscriptionGateway) {}

  async addSubscription(
    subscription: CreateSubscriptionDTO,
  ): Promise<SubscriptionDTO> {
    return await this.subscriptionGateway.addSubscription(subscription);
  }

  async getAllSubscriptions(): Promise<SubscriptionDTO[]> {
    return this.subscriptionGateway.getAllSubscriptions();
  }

  async cancelSubscription(id: string): Promise<SubscriptionDTO> {
    return this.subscriptionGateway.cancelSubscription(id);
  }

  async getSubscription(id: string): Promise<SubscriptionDTO> {
    return this.subscriptionGateway.getSubscription(id);
  }
}
