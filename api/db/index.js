const { Pool } = require('pg')

const pool = new Pool({
    host: 'yoda',
    user: 'energydash',
    database: 'energydash',
    password: 'energydash',
    max: 20
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}
