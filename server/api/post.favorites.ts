import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

export default async function (event: any) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'favorite_beers',
    Promise: bluebird,
  })

  try {
    const [rows, fields] = await connection.execute(
      'INSERT INTO favorite_beers (beer_id, favorite_date) VALUES (?, ?)',
      [event.beer_id, event.favorite_date]
    )

    return {
      beers: rows,
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      error: 'An error occurred while inserting the beer.',
    }
  } finally {
    connection.end()
  }
}