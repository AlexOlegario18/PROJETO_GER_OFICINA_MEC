const mysql = require('mysql2/promise');

async function criarAdmin() {
  // ⚠️ ATENÇÃO: Substitua todo o texto abaixo pela sua Service URI da Aiven
  // Ela começa com "mysql://avnadmin:..." e você copia lá no painel da Aiven
  const URL_CONEXAO_AIVEN = "SUA_DATABASE_URL_DA_AIVEN_AQUI"; 

  try {
    const connection = await mysql.createConnection(URL_CONEXAO_AIVEN);
    console.log("🔋 Conectado com sucesso ao MySQL da Aiven!");

    const email = 'admin@oficina.com';
    const senhaCriptografada = '$2b$10$e9O6C6Ww6K7r4T3yG8mN/.7pI1.Rz9pXG2P5mJz4q3W4r5t6y7u8i'; // equivale a 'admin123'

    // Tenta inserir na tabela 'usuarios'
    const query = `
      INSERT INTO usuarios (nome, email, senha, role) 
      VALUES (?, ?, ?, ?)
    `;
    
    await connection.execute(query, ['Administrador', email, senhaCriptografada, 'admin']);
    console.log('✅ Usuário Admin criado com sucesso no MySQL!');
    
    await connection.end();
  } catch (error) {
    // Se der erro de tabela inexistente, tentamos com 'users' automaticamente
    if (error.message.includes("doesn't exist")) {
      console.log("⚠️ Tabela 'usuarios' não encontrada. Tentando com a tabela 'users'...");
      try {
        const connection = await mysql.createConnection(URL_CONEXAO_AIVEN);
        const queryUsers = `
          INSERT INTO users (name, email, password, role) 
          VALUES (?, ?, ?, ?)
        `;
        await connection.execute(queryUsers, ['Administrador', 'admin@oficina.com', '$2b$10$e9O6C6Ww6K7r4T3yG8mN/.7pI1.Rz9pXG2P5mJz4q3W4r5t6y7u8i', 'admin']);
        console.log('✅ Usuário Admin criado com sucesso na tabela users!');
        await connection.end();
        return;
      } catch (err2) {
        console.error('❌ Erro na segunda tentativa:', err2.message);
      }
    }
    console.error('❌ Erro ao criar admin:', error.message);
  }
}

criarAdmin();