
exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.text('username').notNull().unique()
        table.text('password').notNull()
        table.text('user_type').notNull()
    })

    await knex.schema.createTable('stores', (table) => {
        table.increments('id')
        table.text('store_name').notNull()
        table.text('store_address').notNull().unique()
        table.text('city_state')
    })

    await knex.schema.createTable('items', (table) => {
        table.increments('id')
        table.text('name').notNull().unique()
        table.integer('price').notNull()
    })

    await knex.schema.createTable('stores_items', (table) => {
        table.integer('store_id')
            .references('id')
            .inTable('stores')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('item_id')
            .references('id')
            .inTable('items')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.primary(['store_id', 'item_id'])
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('stores_items')
    await knex.schema.dropTableIfExists('items')
    await knex.schema.dropTableIfExists('stores')
    await knex.schema.dropTableIfExists('users')
};
