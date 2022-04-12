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

export function generateUser() {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password,
    name: faker.name.findName(),
    confirm: password,
  };
}

export function generateSubscriptions(country: Country, length = 10) {
  return Array.from({ length }, () => generateSubscription(country));
}
