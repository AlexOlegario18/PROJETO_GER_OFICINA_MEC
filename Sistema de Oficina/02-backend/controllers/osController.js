const db = require('../config/db');

// --- 1. CRIAR NOVA OS ---
exports.criarOS = (req, res) => {
    const { cliente_id, veiculo_id, mecanico_id, descricao_problema, status, valor_total } = req.body;
    
    if (!cliente_id || !veiculo_id || !mecanico_id) {
        return res.status(400).json({ error: "Cliente, Veículo e Mecânico são obrigatórios!" });
    }

    const sql = `INSERT INTO ordens_servico 
                 (cliente_id, veiculo_id, mecanico_id, descricao_problema, status, valor_mao_de_obra) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    const valores = [
        cliente_id, 
        veiculo_id, 
        mecanico_id, 
        descricao_problema, 
        status || 'Aberta', 
        parseFloat(valor_total) || 0 
    ];

    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error("❌ Erro ao criar OS:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "OS criada com sucesso!", id: result.insertId });
    });
};

// --- 2. LISTAR TODAS AS OS (Com nomes de Clientes e Veículos) ---
exports.listarOS = (req, res) => {
    const { mecanico_id, cargo } = req.query;

    // Adicionado JOIN para pegar nomes reais em vez de apenas IDs
    let sql = `
        SELECT os.*, c.nome AS nome_cliente, v.modelo AS veiculo_modelo, v.placa 
        FROM ordens_servico os
        LEFT JOIN clientes c ON os.cliente_id = c.id
        LEFT JOIN veiculos v ON os.veiculo_id = v.id
    `;
    
    let params = [];

    // Lógica de cargo: Admin vê tudo, Mecânico vê apenas o seu ID
    if (cargo !== 'admin') {
        sql += " WHERE os.mecanico_id = ?";
        params.push(mecanico_id);
    }

    sql += " ORDER BY os.id DESC";

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("❌ Erro ao buscar OS:", err);
            return res.status(500).json({ error: "Erro ao listar ordens de serviço" });
        }
        res.json(results);
    });
};

// --- 3. ATUALIZAR PROGRESSO ---
exports.atualizarProgresso = (req, res) => {
    const { id } = req.params;
    const { 
        status, 
        servicos_executados, 
        pecas_substituidas, 
        observacoes_mecanico,
        valor_total 
    } = req.body;

    const sql = `UPDATE ordens_servico SET 
                 status = ?, 
                 servicos_executados = ?, 
                 pecas_substituidas = ?, 
                 observacoes_mecanico = ?,
                 valor_mao_de_obra = ?, 
                 data_saida = CASE WHEN ? = 'Finalizada' THEN NOW() ELSE data_saida END
                 WHERE id = ?`;

    const valores = [
        status, 
        servicos_executados || '', 
        pecas_substituidas || '', 
        observacoes_mecanico || '',
        parseFloat(valor_total) || 0, 
        status, 
        id
    ];

    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error("❌ Erro SQL ao atualizar:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "OS atualizada com sucesso!" });
    });
};

// --- 4. EXCLUIR ORDEM DE SERVIÇO ---
exports.excluirOS = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM ordens_servico WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("❌ Erro ao excluir OS:", err);
            return res.status(500).json({ error: "Erro ao excluir a OS do banco de dados." });
        }
        res.json({ message: "OS excluída com sucesso!" });
    });
};

// --- 5. HISTÓRICO POR CLIENTE ---
exports.historicoPorCliente = (req, res) => {
    const { clienteId } = req.params;
    const sql = `
        SELECT os.*, v.modelo, v.placa 
        FROM ordens_servico os
        JOIN veiculos v ON os.veiculo_id = v.id
        WHERE os.cliente_id = ?
        ORDER BY os.id DESC
    `;
    db.query(sql, [clienteId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};