import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Country } from './entities';

@Injectable()
export class CountriesService {
  private countriesRepository: any;
  constructor(private readonly connection: Connection) {
    this.countriesRepository = this.connection.getRepository(Country);
  }

  findAll() {
      // This is to make sure some standard for country insertions
    return this.countriesRepository.find();
  }
}
