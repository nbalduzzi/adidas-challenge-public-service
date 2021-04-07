import { Injectable } from '@nestjs/common';
import { ISubscriptionGateway } from './subscription.interface';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

@Injectable()
export class SubscriptionGateway implements ISubscriptionGateway {
  async addSubscription(
    subscription: CreateSubscriptionDTO,
  ): Promise<SubscriptionDTO> {
    try {
      const response: Response = await fetch(process.env.SUBSCRIPTION_API_URL, {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'someAuthToken',
        },
      });

      if (!response.ok) throw response.statusText;
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  async getAllSubscriptions(): Promise<SubscriptionDTO[]> {
    try {
      const response: Response = await fetch(process.env.SUBSCRIPTION_API_URL, {
        headers: { Authorization: 'someAuthToken' },
      });

      if (!response.ok) throw response.statusText;
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  async cancelSubscription(id: string): Promise<SubscriptionDTO> {
    try {
      const response: Response = await fetch(
        `${process.env.SUBSCRIPTION_API_URL}/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: 'someAuthToken' },
        },
      );

      if (!response.ok) throw response.statusText;
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  async getSubscription(id: string): Promise<SubscriptionDTO> {
    try {
      const response: Response = await fetch(
        `${process.env.SUBSCRIPTION_API_URL}/${id}`,
        {
          headers: { Authorization: 'someAuthToken' },
        },
      );

      if (!response.ok) throw response.statusText;
      return await response.json();
    } catch (e) {
      throw e;
    }
  }
}
