# API for hydroponic monitoring App

## stack

- express
- sequelize for postgresql
- morgan as logger

## docker

If docker already installed on your machine, you can run command **docker-compose up -d** for running postgresql.

## Development

-   Copy `.env.example` to `.env`
-   Install package `npm install`
-   Start project `npm start` or dev mode with `npm run dev`

## sequelize cli

### create model and migrations

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

### run migrations

```
npx sequelize-cli db:migrate
```

### undo migrations

```
npx sequelize-cli db:migrate:undo
```

### create seeds

```
npx sequelize-cli seed:generate --name demo-user
```

### run seeds

```
npx sequelize-cli db:seed:all
```

### undo seeds

```
npx sequelize-cli db:seed:undo
```
