const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function setupDatabase() {
  console.log('Starting MySQL database schema setup...');

  // Setup connection options (connecting without specifying database first)
  const connectionConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306'),
    multipleStatements: true // Allows multiple commands in one query block
  };

  try {
    // Connect to local MySQL server
    const connection = await mysql.createConnection(connectionConfig);
    console.log('Connected to MySQL server successfully.');

    // Ensure database exists and select it
    await connection.query('CREATE DATABASE IF NOT EXISTS chunchun_portfolio;');
    await connection.query('USE chunchun_portfolio;');

    // Run schema migrations for existing tables if they were created with DATE type
    try {
      await connection.query(`
        ALTER TABLE experience 
        MODIFY COLUMN start_date VARCHAR(50) NOT NULL, 
        MODIFY COLUMN end_date VARCHAR(50) NOT NULL;
      `);
      console.log('Migrated experience table date columns to VARCHAR(50).');
    } catch (e) {
      // Table may not exist yet or already migrated
    }

    try {
      await connection.query(`
        ALTER TABLE certifications 
        MODIFY COLUMN issue_date VARCHAR(50) NOT NULL;
      `);
      console.log('Migrated certifications table issue_date column to VARCHAR(50).');
    } catch (e) {
      // Table may not exist yet or already migrated
    }

    // Read database.sql file from workspace root
    const sqlFilePath = path.join(__dirname, '..', 'database.sql');
    
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`database.sql not found at path: ${sqlFilePath}`);
    }

    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('Reading database.sql schema script...');

    // Run the script
    await connection.query(sqlContent);
    console.log('MySQL Database "chunchun_portfolio" created and seeded successfully!');
    
    await connection.end();
    console.log('Database connection closed.');
    return true;
  } catch (error) {
    console.error('Database setup failed:', error.message);
    console.error('Make sure your MySQL server is running and credentials in server/.env are correct.');
    return false;
  }
}

// Execute if run directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
