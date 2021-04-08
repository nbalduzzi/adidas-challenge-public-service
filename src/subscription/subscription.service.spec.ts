import { of, throwError } from 'rxjs';
import { HttpService } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    subscriptionService = new SubscriptionService(httpService);
  });

  describe('get all subscription', () => {
    describe('on http service success', () => {
      it('should return []', async () => {
        jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
          of({
            data: [],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
          }),
        );

        expect(await subscriptionService.getAllSubscriptions()).toEqual([]);
      });
    });

    describe('on http service fails', () => {
      it('should throw error', async () => {
        jest.spyOn(httpService, 'get').mockReturnValue(
          throwError({
            status: 500,
            message: 'Internal Server Error',
          }),
        );

        subscriptionService
          .getAllSubscriptions()
          .catch((e) => expect(e.message).toMatch('Internal Server Error'));
      });
    });
  });

  describe('get subscription detail', () => {
    describe('on http service success', () => {
      it('should return the subscription object', async () => {
        const subscription: SubscriptionDTO = {
          consent: true,
          dateOfBirth: new Date().toISOString(),
          email: 'some@email.com',
          firstName: 'Some Name',
          gender: 'Male',
          id: 'someId',
          newsletterId: 'someNewsletterId',
        };

        jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
          of({
            data: subscription,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
          }),
        );

        expect(await subscriptionService.getSubscription('someId')).toEqual(
          subscription,
        );
      });
    });

    describe('on http service fails', () => {
      it('should throw error', async () => {
        jest.spyOn(httpService, 'get').mockReturnValue(
          throwError({
            status: 500,
            message: 'Internal Server Error',
          }),
        );

        subscriptionService
          .getSubscription('someId')
          .catch((e) => expect(e.message).toMatch('Internal Server Error'));
      });
    });
  });

  describe('create subscription', () => {
    describe('on http service success', () => {
      it('should return the subscription created', async () => {
        const subscriptionRequest: CreateSubscriptionDTO = {
          consent: true,
          dateOfBirth: new Date().toISOString(),
          email: 'some@email.com',
          firstName: 'Some Name',
          gender: 'Male',
          newsletterId: 'someNewsletterId',
        };

        const subscription: SubscriptionDTO = {
          ...subscriptionRequest,
          id: 'someId',
        };

        jest.spyOn(httpService, 'post').mockImplementationOnce(() =>
          of({
            data: subscription,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
          }),
        );

        expect(
          await subscriptionService.addSubscription(subscriptionRequest),
        ).toEqual(subscription);
      });
    });

    describe('on http service fails', () => {
      it('should throw error', async () => {
        jest.spyOn(httpService, 'post').mockReturnValue(
          throwError({
            status: 500,
            message: 'Internal Server Error',
          }),
        );

        subscriptionService
          .addSubscription({
            consent: true,
            dateOfBirth: new Date().toISOString(),
            email: 'some@email.com',
            firstName: 'Some Name',
            gender: 'Male',
            newsletterId: 'someNewsletterId',
          })
          .catch((e) => expect(e.message).toMatch('Internal Server Error'));
      });
    });
  });

  describe('cancel subscription', () => {
    describe('on http service success', () => {
      it('should return the subscription cancelled', async () => {
        const subscription: SubscriptionDTO = {
          id: 'someId',
          consent: true,
          dateOfBirth: new Date().toISOString(),
          email: 'some@email.com',
          firstName: 'Some Name',
          gender: 'Male',
          newsletterId: 'someNewsletterId',
        };

        jest.spyOn(httpService, 'delete').mockImplementationOnce(() =>
          of({
            data: subscription,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
          }),
        );

        expect(await subscriptionService.cancelSubscription('someId')).toEqual(
          subscription,
        );
      });
    });

    describe('on http service fails', () => {
      it('should throw error', async () => {
        jest.spyOn(httpService, 'delete').mockReturnValue(
          throwError({
            status: 500,
            message: 'Internal Server Error',
          }),
        );

        subscriptionService
          .cancelSubscription('someId')
          .catch((e) => expect(e.message).toMatch('Internal Server Error'));
      });
    });
  });
});
