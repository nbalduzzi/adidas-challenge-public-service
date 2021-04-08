import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { ISubscriptionController } from './subscription.interface';
import { CreateSubscriptionDTO, SubscriptionDTO } from './subscription.model';

@Controller('subscriptions')
@ApiTags('subscriptions')
export class SubscriptionController implements ISubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @ApiResponse({ type: SubscriptionDTO, status: 201 })
  @ApiBody({ required: true, type: CreateSubscriptionDTO })
  async addSubscription(
    @Body() subscription: CreateSubscriptionDTO,
  ): Promise<SubscriptionDTO> {
    return await this.subscriptionService.addSubscription(subscription);
  }

  @Get()
  @ApiResponse({ type: [SubscriptionDTO], status: 200 })
  async getAllSubscriptions(): Promise<SubscriptionDTO[]> {
    return await this.subscriptionService.getAllSubscriptions();
  }

  @Delete('/:id')
  @ApiResponse({ type: SubscriptionDTO, status: 200 })
  @ApiParam({
    required: true,
    allowEmptyValue: false,
    type: String,
    name: 'id',
  })
  async cancelSubscription(@Param('id') id: string): Promise<SubscriptionDTO> {
    return await this.subscriptionService.cancelSubscription(id);
  }

  @Get('/:id')
  @ApiResponse({ type: SubscriptionDTO, status: 200 })
  @ApiParam({
    required: true,
    allowEmptyValue: false,
    type: String,
    name: 'id',
  })
  async getSubscription(@Param('id') id: string): Promise<SubscriptionDTO> {
    return await this.subscriptionService.getSubscription(id);
  }
}
