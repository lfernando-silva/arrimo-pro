import { EntityRepository, Repository } from 'typeorm';
import { Subscription } from '../entities';

@EntityRepository(Subscription)
export default class SubscriptionRepository extends Repository<Subscription> {}
