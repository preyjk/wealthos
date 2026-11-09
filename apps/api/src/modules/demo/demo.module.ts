import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DemoRecord } from './demo.entity.js';
import { DemoService } from './demo.service.js';
import { DemoController } from './demo.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([DemoRecord])],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
