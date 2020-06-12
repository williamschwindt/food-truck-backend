
exports.up = async function(knex) {
    await knex.schema.table('stores', table => {
        table.text('city_state')
    })
};

exports.down = async function(knex) {
    await knex.schema.table('stores', table => {
        table.dropColumn('city_state')
    })
};
