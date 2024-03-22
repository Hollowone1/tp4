import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

export default defineEventHandler(async (event) => {
    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'favorite_beers',
    Promise: bluebird,
})

const [rows, fields] = await connection.execute(
"SELECT * FROM favorite_beers WHERE status = ?", [ 'OK' ] )

    return {
        beers: rows
    }
});