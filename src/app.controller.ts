import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('health-check')
  @Get('/ping')
  getPing(): string {
    return this.appService.getPing();
  }
}
