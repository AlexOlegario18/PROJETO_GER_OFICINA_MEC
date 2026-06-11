const mysql = require('mysql2');

// Montamos a URL de conexão segura que a Aiven e a Vercel exigem
const connectionString = 'mysql://avnadmin:AVNS_LUYP_0qUXUevCJegg2C@mysql-1b8ebc75-alexolegariog-69f6.f.aivencloud.com:14792/defaultdb?ssl-mode=REQUIRED';

const db = mysql.createPool({
    uri: connectionString,
    waitForConnections: true,
    connectionLimit: 5, // Limite menor para funcionar bem na Vercel
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false // Permite que a Vercel contorne o certificado estrito da Aiven
    }
});

// Teste de conexão
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erro ao conectar ao MySQL na Nuvem:', err.message);
        return;
    }
    console.log('✅ Conectado com sucesso ao Banco de Dados da Oficina na Nuvem (Aiven)!');
    connection.release();
});

module.exports = db;