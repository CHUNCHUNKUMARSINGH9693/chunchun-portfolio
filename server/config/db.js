const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'chunchun_portfolio',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper to check connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Database Connected Successfully!');
    connection.release();
    return true;
  } catch (error) {
    console.error('MySQL Database Connection Failed:', error.message);
    console.error('Make sure you have created the database: "chunchun_portfolio" and your credentials in server/.env are correct.');
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};
