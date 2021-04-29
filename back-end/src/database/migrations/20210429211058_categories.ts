import { Knex } from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('parent_id').unsigned();
        table.foreign('parent_id').references('id')
            .inTable('categories').onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('categories');
}