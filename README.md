# Subscriptions API

## Description

Test API using [Nest](https://github.com/nestjs/nest) framework and [TypeORM](https://typeorm.io/#/).

## Installation

```bash
$ yarn
```

## Running database (docker)

```bash
# See .env files to manage database credentials
$ docker-compose ]--env-file path/to/envfile] up -d newsletter
```

## Running the app

```bash
# development
$ yarn start
# watch mode
$ yarn start:dev
# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test
# e2e tests
$ yarn test:e2e
# test coverage
$ yarn test:cov
```

## Migrations

This application uses [TypeORM](https://typeorm.io/#/) to manage database queries and migrations.

```bash
# build and run migrations
$ yarn db:migrate

# build and rollback migration (one per command run)
$ yarn db:migrate:rollback
```

## Contact

- Author - [Luiz Fernando](https://github.com/lfernando-silva/)

## License

This app is [MIT licensed](LICENSE).
