# Back-end pedidos mercado

## Tecnologias

##### Utilizado

  - Node
  - Knex
  - Typescript
  - Express
  - Node-Cache

## Como rodar

- Realizar o download do Node
- Rodar `npm install` e `npm start`

## Novas migrations
- `npx knex migrate:make nomeDaTabela`
- `npx knex migrate:latest`

## Rollback na ultima tabela(migrate) criada
- `npx knex migrate:rollback`

## Criar novo arquivo de seed
- `npx knex seed:make nome_seed`

## Colocar os dados em base
- `npx knex seed:run`