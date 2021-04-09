import { AxiosResponse } from 'axios';
import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { ISubscriptionService } from './subscription.interface';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

@Injectable()
export class SubscriptionService implements ISubscriptionService {
  constructor(private readonly httpService: HttpService) {}

  async addSubscription(
    subscription: CreateSubscriptionDTO,
  ): Promise<SubscriptionDTO> {
    try {
      const response: AxiosResponse<any> = await this.httpService
        .post(process.env.SUBSCRIPTION_SERVICE_URL, subscription, {
          headers: { 'Content-Type': 'application/json' },
        })
        .toPromise();

      return response.data;
    } catch (e) {
      console.error(e);
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }

  async getAllSubscriptions(): Promise<SubscriptionDTO[]> {
    try {
      const response: AxiosResponse<any> = await this.httpService
        .get(process.env.SUBSCRIPTION_SERVICE_URL)
        .toPromise();

      return response.data;
    } catch (e) {
      console.error(e);
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }

  async cancelSubscription(id: string): Promise<SubscriptionDTO> {
    try {
      const response: AxiosResponse<any> = await this.httpService
        .delete(`${process.env.SUBSCRIPTION_SERVICE_URL}/${id}`)
        .toPromise();

      return response.data;
    } catch (e) {
      console.error(e);
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }

  async getSubscription(id: string): Promise<SubscriptionDTO> {
    try {
      const response: AxiosResponse<any> = await this.httpService
        .get(`${process.env.SUBSCRIPTION_SERVICE_URL}/${id}`)
        .toPromise();

      return response.data;
    } catch (e) {
      console.error(e);
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }
}
