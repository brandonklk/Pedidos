import { Knex } from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('price',14,2).notNullable();
        table.string('description');
        //Adicionar QR
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('products');
}
