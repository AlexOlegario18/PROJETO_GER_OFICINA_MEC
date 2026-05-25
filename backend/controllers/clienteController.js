const db = require('../config/db');

// 1. Cadastro de Cliente + Veículo (Já estava completo, mantido)
exports.cadastrarCompleto = (req, res) => {
    const { nome, cpf_cnpj, telefone, email, endereco, placa, marca, modelo, ano, cor, km, combustivel } = req.body;
    const sqlCliente = "INSERT INTO clientes (nome, cpf_cnpj, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sqlCliente, [nome, cpf_cnpj, telefone, email, endereco], (err, result) => {
        if (err) return res.status(500).json({ error: "Erro ao salvar cliente: " + err.message });

        const clienteId = result.insertId;
        const sqlVeiculo = "INSERT INTO veiculos (cliente_id, placa, marca, modelo, ano, cor, km, combustivel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const valoresVeiculo = [clienteId, placa?.toUpperCase().trim(), marca, modelo, parseInt(ano) || 0, cor, parseInt(km) || 0, combustivel];

        db.query(sqlVeiculo, valoresVeiculo, (errV) => {
            if (errV) return res.status(500).json({ error: "Erro ao salvar veículo: " + errV.message });
            res.status(201).json({ message: "Sucesso!", clienteId });
        });
    });
};

// 2. ATUALIZAR CLIENTE E VEÍCULO (AGORA COMPLETO COM TODOS OS CAMPOS)
exports.atualizarCliente = (req, res) => {
    const { id } = req.params;
    const { 
        nome, cpf_cnpj, telefone, email, endereco, // Dados do Cliente
        placa, marca, modelo, ano, cor, km, combustivel // Dados do Veículo
    } = req.body;

    // 1º Passo: Atualizar TODOS os dados do Cliente
    const sqlCliente = "UPDATE clientes SET nome = ?, cpf_cnpj = ?, telefone = ?, email = ?, endereco = ? WHERE id = ?";
    db.query(sqlCliente, [nome, cpf_cnpj, telefone, email, endereco, id], (err) => {
        if (err) return res.status(500).json({ error: "Erro ao atualizar dados do cliente." });

        // 2º Passo: Atualizar TODOS os dados do Veículo
        const sqlVeiculo = `
            UPDATE veiculos 
            SET placa = ?, marca = ?, modelo = ?, ano = ?, cor = ?, km = ?, combustivel = ? 
            WHERE cliente_id = ?
        `;
        const valoresVeiculo = [
            placa?.toUpperCase().trim(), 
            marca, 
            modelo, 
            parseInt(ano) || 0, 
            cor, 
            parseInt(km) || 0, 
            combustivel, 
            id
        ];

        db.query(sqlVeiculo, valoresVeiculo, (errV) => {
            if (errV) return res.status(500).json({ error: "Erro ao atualizar dados do veículo." });
            res.json({ message: "Cadastro completo atualizado com sucesso!" });
        });
    });
};

// 3. Listar Frota Completa (Atualizado para trazer os novos campos para o Front-end)
// No arquivo controllers/clienteController.js
exports.listarTodosVeiculos = (req, res) => {
  // O SQL PRECISA unir as duas tabelas para o nome aparecer
  const sql = `
    SELECT 
      v.id, 
      v.placa, 
      v.marca, 
      v.modelo, 
      c.nome, 
      c.telefone 
    FROM veiculos v
    INNER JOIN clientes c ON v.cliente_id = c.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Erro no SQL:", err);
      return res.status(500).json(err);
    }
    res.json(result); 
  });
};

// 4. Listar Veículos (Simples)
exports.listarVeiculos = (req, res) => {
    db.query("SELECT * FROM veiculos", (err, results) => {
        if (err) return res.status(500).json({ error: "Erro ao listar." });
        res.json(results);
    });
};

// 5. Excluir Cliente (Mantido)
exports.excluirCliente = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM veiculos WHERE cliente_id = ?", [id], (err) => {
        db.query("DELETE FROM clientes WHERE id = ?", [id], (errC) => {
            if (errC) return res.status(500).json({ error: "Erro ao excluir." });
            res.json({ message: "Removido!" });
        });
    });
};

// 6. Sugestões para busca (Mantido)
exports.sugestoesClientes = (req, res) => {
    const { busca } = req.query;
    const sql = "SELECT id, nome, cpf_cnpj FROM clientes WHERE nome LIKE ? LIMIT 5";
    db.query(sql, [`%${busca}%`], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// 7. Buscar veículos de um cliente específico (Mantido)
exports.buscarVeiculosPorCliente = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM veiculos WHERE cliente_id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar veículos." });
        res.json(results);
    });
};
