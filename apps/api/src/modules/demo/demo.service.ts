import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemoRecord } from './demo.entity.js';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(DemoRecord)
    private readonly repository: Repository<DemoRecord>,
  ) {}

  findAll() {
    return this.repository.find({
      order: { createdAt: 'DESC' },
    });
  }

  create(title: string) {
    const record = this.repository.create({ title });
    return this.repository.save(record);
  }
}
