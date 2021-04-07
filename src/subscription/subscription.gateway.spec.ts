import * as fetchMock from 'fetch-mock';
import { SubscriptionGateway } from './subscription.gateway';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

describe('SubscriptionGateway', () => {
  let subscriptionGateway: SubscriptionGateway;

  beforeEach(() => (subscriptionGateway = new SubscriptionGateway()));
  afterEach(() => fetchMock.restore());

  describe('get all subscription', () => {
    describe('on success fetch', () => {
      it('should return []', async () => {
        fetchMock.get('http://localhost:3001/subscriptions', []);
        expect(await subscriptionGateway.getAllSubscriptions()).toEqual([]);
      });
    });

    describe('on fail fetch', () => {
      it('should throw error', async () => {
        fetchMock.get('http://localhost:3001/subscriptions', 500);

        await subscriptionGateway
          .getAllSubscriptions()
          .catch((e) => expect(e).toMatch('Internal Server Error'));
      });
    });
  });

  describe('get subscription detail', () => {
    describe('on success fetch', () => {
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

        fetchMock.get('http://localhost:3001/subscriptions/someId', {
          status: 200,
          body: subscription,
        });

        expect(await subscriptionGateway.getSubscription('someId')).toEqual(
          subscription
        );
      });
    });

    describe('on fail fetch', () => {
      it('should throw error', async () => {
        fetchMock.get('http://localhost:3001/subscriptions/someId', 500);

        await subscriptionGateway
          .getSubscription('someId')
          .catch((e) => expect(e).toMatch('Internal Server Error'));
      });
    });
  });

  describe('create subscription', () => {
    describe('on success fetch', () => {
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

        fetchMock.post('http://localhost:3001/subscriptions', subscription);

        expect(
          await subscriptionGateway.addSubscription(subscriptionRequest)
        ).toEqual(subscription);
      });
    });

    describe('on fail fetch', () => {
      it('should throw error', async () => {
        const subscriptionRequest: CreateSubscriptionDTO = {
          consent: true,
          dateOfBirth: Date.now(),
          email: 'some@email.com',
          firstName: 'Some Name',
          gender: 'Male',
          newsletterId: 'someNewsletterId',
        };

        fetchMock.post('http://localhost:3001/subscriptions', 500);

        await subscriptionGateway
          .addSubscription(subscriptionRequest)
          .catch((e) => expect(e).toMatch('Internal Server Error'));
      });
    });
  });

  describe('cancel subscription', () => {
    describe('on success fetch', () => {
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

        fetchMock.delete(
          'http://localhost:3001/subscriptions/someId',
          subscription
        );

        expect(await subscriptionGateway.cancelSubscription('someId')).toEqual(
          subscription
        );
      });
    });

    describe('on fail fetch', () => {
      it('should throw error', async () => {
        const subscriptionRequest: CreateSubscriptionDTO = {
          consent: true,
          dateOfBirth: Date.now(),
          email: 'some@email.com',
          firstName: 'Some Name',
          gender: 'Male',
          newsletterId: 'someNewsletterId',
        };

        fetchMock.delete('http://localhost:3001/subscriptions/someId', 500);

        await subscriptionGateway
          .cancelSubscription('someId')
          .catch((e) => expect(e).toMatch('Internal Server Error'));
      });
    });
  });
});
