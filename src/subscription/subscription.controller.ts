import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { ISubscriptionController } from './subscription.interface';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

@Controller('subscriptions')
@ApiTags('subscription')
export class SubscriptionController implements ISubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @ApiBody({ required: true, type: CreateSubscriptionDTO })
  @ApiResponse({ type: SubscriptionDTO })
  async addSubscription(
    @Body() subscription: CreateSubscriptionDTO,
  ): Promise<SubscriptionDTO> {
    return await this.subscriptionService.addSubscription(subscription);
  }

  @Get()
  async getAllSubscriptions(): Promise<SubscriptionDTO[]> {
    return this.subscriptionService.getAllSubscriptions();
  }

  @Delete('/:id')
  async cancelSubscription(@Param('id') id: string): Promise<SubscriptionDTO> {
    return this.subscriptionService.cancelSubscription(id);
  }

  @Get('/:id')
  async getSubscription(@Param('id') id: string): Promise<SubscriptionDTO> {
    return this.subscriptionService.getSubscription(id);
  }
}
