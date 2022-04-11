import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities';
import { SubscriptionsService } from './subscriptions.service';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Subscription,
  })
  @ApiBadRequestResponse()
  async create(@Body() data: CreateSubscriptionDto) {
    return this.subscriptionsService.create(data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async list() {
    return [];
  }
}
