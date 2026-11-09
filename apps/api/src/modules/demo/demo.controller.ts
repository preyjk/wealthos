import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { DemoService } from './demo.service.js';

@Controller('demo-records')
export class DemoController {
  constructor(private readonly service: DemoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: { title?: string }) {
    if (typeof body?.title !== 'string' || !body.title.trim()) {
      throw new BadRequestException('Title is required');
    }

    return this.service.create(body.title.trim());
  }
}
