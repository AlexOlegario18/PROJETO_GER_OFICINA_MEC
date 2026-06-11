const db = require('../config/db');

// --- LOGIN ---
exports.login = (req, res) => {
    const { usuario, senha } = req.body;
    
    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?";
    
    db.query(sql, [usuario, senha], (err, results) => {
        if (err) return res.status(500).json({ error: "Erro no banco." });
        
        if (results.length > 0) {
            const user = results[0];

            if (user.status === 'inativo') {
                return res.status(403).json({ message: "Sua conta está desativada. Procure o administrador." });
            }
            
            res.json({ 
                message: "Sucesso", 
                id: user.id,
                nome: user.nome,
                tipo: user.tipo 
            });
        } else {
            res.status(401).json({ message: "Usuário ou senha incorretos" });
        }
    });
};

// --- CADASTRAR (AJUSTADO PARA O SEU NOVO FORMULÁRIO) ---
exports.cadastrarUsuario = (req, res) => {
    // Esse console.log vai mostrar no terminal do VS CODE o que chegou do React
    console.log("DADOS RECEBIDOS DO FRONTEND:", req.body);

    const { nome, usuario, senha, tipo, especialidade } = req.body;
    
    const sql = "INSERT INTO usuarios (nome, usuario, senha, tipo, especialidade, status) VALUES (?, ?, ?, ?, ?, 'ativo')";
    
    db.query(sql, [nome, usuario, senha, tipo, especialidade], (err, result) => {
        if (err) {
            // ISSO AQUI VAI TE MOSTRAR O ERRO REAL NO TERMINAL DO BACKEND
            console.error("❌ ERRO DO MYSQL:", err.message); 
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Sucesso!" });
    });
};
// --- LISTAR TODOS (PARA A TABELA DE USUÁRIOS) ---
exports.listarMecanicos = (req, res) => {
    const sql = "SELECT id, nome, usuario, tipo, especialidade, status FROM usuarios ORDER BY id DESC";
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar usuários." });
        res.json(results);
    });
};

// --- ATUALIZAR STATUS (ATIVAR/DESATIVAR) ---
exports.atualizarStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    const sql = "UPDATE usuarios SET status = ? WHERE id = ?";
    
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("ERRO AO MUDAR STATUS:", err);
            return res.status(500).json({ error: "Erro no banco" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json({ message: "Sucesso!", novoStatus: status });
    });
};

// --- EXCLUIR ---
exports.excluirUsuario = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuário excluído!" });
    });
};
// --- ATUALIZAR USUÁRIO (NOME, LOGIN, SENHA, TIPO, ESPECIALIDADE) ---
exports.atualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nome, usuario, senha, tipo, especialidade } = req.body;

    let sql;
    let params;

    if (senha && senha.trim() !== "") {
        sql = "UPDATE usuarios SET nome = ?, usuario = ?, senha = ?, tipo = ?, especialidade = ? WHERE id = ?";
        params = [nome, usuario, senha, tipo, especialidade, id];
    } else {
        sql = "UPDATE usuarios SET nome = ?, usuario = ?, tipo = ?, especialidade = ? WHERE id = ?";
        params = [nome, usuario, tipo, especialidade, id];
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("❌ ERRO AO ATUALIZAR USUÁRIO:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Usuário atualizado com sucesso!" });
    });
};
