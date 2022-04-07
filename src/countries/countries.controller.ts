import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { Country } from './entities';
import { CountriesService } from './countries.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOkResponse({
    type: [Country],
  })
  findAll() {
    return this.countriesService.findAll();
  }
}
