import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Spesc } from './DB/Specs.entity';
import { SpecDTO } from './DTO/Specs.DTO';

@Injectable()
export class SpecService {
  constructor(
    @InjectRepository(Spesc) private specsRepository: Repository<Spesc>,
  ) {}

  async postAllSpec(data: SpecDTO[]) {
    try {
      this.specsRepository.create(data);
      await this.specsRepository.save(data);

      return { message: 'success' };
    } catch (error) {
      console.log(error);
    }
  }
}
