import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Country } from './entities';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountryRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Country, CountryRepository])],
  controllers: [CountriesController],
  providers: [CountriesService, CountryRepository],
})
export class CountriesModule {}
