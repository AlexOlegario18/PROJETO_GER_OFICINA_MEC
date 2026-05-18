const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'oficina',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('A conexão com o banco foi perdida.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('O banco de dados não pode fornecer mais conexões.');
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Usuário ou senha inválidos.');
    }
  } else if (connection) {
    console.log('Conectado ao banco de dados com sucesso!');
    connection.release();
  }
});

module.exports = {
  pool,
  promisePool
};
