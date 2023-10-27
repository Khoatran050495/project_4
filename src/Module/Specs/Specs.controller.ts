import { Body, Controller, Post } from '@nestjs/common';

import { SpecDTO } from './DTO/Specs.DTO';
import { SpecService } from './Specs.service';

@Controller('api/v1/specs')
export class SpecController {
  constructor(public SpecService: SpecService) {}

  @Post('/postallspec')
  postAllSpec(@Body() body: SpecDTO[]) {
    return this.SpecService.postAllSpec(body);
  }
}
