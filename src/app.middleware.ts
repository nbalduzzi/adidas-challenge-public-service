import { HttpService, Injectable, NestMiddleware } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { NextFunction } from 'express';

@Injectable()
export class BearerMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}
  use(_: Request, __: Response, next: NextFunction) {
    const token: string = sign(
      {
        origin: 'adidas-challenge-public-service',
        resource: '/subscriptions',
        timestamp: Date.now(),
      },
      process.env.SECRET,
      { algorithm: 'HS256' },
    );

    this.httpService.axiosRef.interceptors.request.use((request) => {
      request.headers = {
        ...request.headers,
        authorization: `Bearer ${token}`,
      };

      return request;
    });

    return next();
  }
}
