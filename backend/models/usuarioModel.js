const db = require('../config/db');

const Usuario = {
  buscarPorUsername: (usuario, callback) => {
    // Usamos 'usuario' porque é o nome da coluna na sua tabela
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';
    db.query(query, [usuario], callback);
  }
};

module.exports = Usuario;