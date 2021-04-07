import { Injectable } from '@nestjs/common';
import { rejects } from 'node:assert';
import { resolve } from 'node:path';
import { ISubscriptionGateway } from './subscription.interface';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

@Injectable()
export class SubscriptionGateway implements ISubscriptionGateway {
  async addSubscription(
    subscription: CreateSubscriptionDTO
  ): Promise<SubscriptionDTO> {
    try {
      const response: Response = await fetch(
        'http://localhost:3001/subscriptions',
        {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: { 'Content-Type': 'application/json', Authorization: '' },
        }
      );

      if (!response.ok) throw response.statusText;
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  async getAllSubscriptions(): Promise<SubscriptionDTO[]> {
    try {
      const response: Response = await fetch(
        'http://localhost:3001/subscriptions',
        {
          headers: { Authorization: '' },
        }
      );

      if (!response.ok) throw response.statusText;
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  async cancelSubscription(id: string): Promise<SubscriptionDTO> {
    try {
      const response: Response = await fetch(
        `http://localhost:3001/subscriptions/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: '' },
        }
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
        `http://localhost:3001/subscriptions/${id}`,
        {
          headers: { Authorization: '' },
        }
      );

      if (!response.ok) throw response.statusText;
      return await response.json();
    } catch (e) {
      throw e;
    }
  }
}
