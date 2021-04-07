import { SubscriptionService } from './subscription.service';
import { SubscriptionGateway } from './subscription.gateway';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService;
  let subscriptionGateway: SubscriptionGateway;

  beforeEach(() => {
    subscriptionGateway = new SubscriptionGateway();
    subscriptionService = new SubscriptionService(subscriptionGateway);
  });

  describe('get all subscription', () => {
    it('should return []', async () => {
      jest
        .spyOn(subscriptionGateway, 'getAllSubscriptions')
        .mockImplementation(() => Promise.resolve([]));

      expect(await subscriptionService.getAllSubscriptions()).toEqual([]);
    });
  });

  describe('get subscription detail', () => {
    it('should return the subscription object', async () => {
      const subscription: SubscriptionDTO = {
        consent: true,
        dateOfBirth: Date.now(),
        email: 'some@email.com',
        firstName: 'Some Name',
        gender: 'Male',
        id: 'someId',
        newsletterId: 'someNewsletterId',
      };

      jest
        .spyOn(subscriptionGateway, 'getSubscription')
        .mockImplementation(() => Promise.resolve(subscription));

      expect(await subscriptionService.getSubscription('someId')).toEqual(
        subscription
      );
    });
  });

  describe('create subscription', () => {
    it('should return the subscription created', async () => {
      const subscriptionRequest: CreateSubscriptionDTO = {
        consent: true,
        dateOfBirth: Date.now(),
        email: 'some@email.com',
        firstName: 'Some Name',
        gender: 'Male',
        newsletterId: 'someNewsletterId',
      };

      const subscription: SubscriptionDTO = {
        ...subscriptionRequest,
        id: 'someId',
      };

      jest
        .spyOn(subscriptionGateway, 'addSubscription')
        .mockImplementation(() => Promise.resolve(subscription));

      expect(
        await subscriptionService.addSubscription(subscriptionRequest)
      ).toEqual(subscription);
    });
  });

  describe('cancel subscription', () => {
    it('should return the subscription cancelled', async () => {
      const subscription: SubscriptionDTO = {
        id: 'someId',
        consent: true,
        dateOfBirth: Date.now(),
        email: 'some@email.com',
        firstName: 'Some Name',
        gender: 'Male',
        newsletterId: 'someNewsletterId',
      };

      jest
        .spyOn(subscriptionGateway, 'cancelSubscription')
        .mockImplementation(() => Promise.resolve(subscription));

      expect(await subscriptionService.cancelSubscription('someId')).toEqual(
        subscription
      );
    });
  });
});
