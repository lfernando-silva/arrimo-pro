import { faker } from '@faker-js/faker';
import { Country } from '../../countries/entities';

export function generateSubscription(country: Country) {
  return {
    email: faker.internet.email(),
    subscriberName: faker.name.findName(),
    frequency: 'weekly',
    countryId: country.id,
  };
}

export function generateSubscriptions(country: Country, length = 10) {
  return Array.from({ length }, () => generateSubscription(country));
}
