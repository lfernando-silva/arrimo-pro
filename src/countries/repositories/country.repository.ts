import { EntityRepository, Repository } from 'typeorm';
import { Country } from '../entities';

@EntityRepository(Country)
export default class CountryRepository extends Repository<Country> {}
