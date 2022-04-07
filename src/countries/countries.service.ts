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
    return this.countriesRepository.find();
  }
}
