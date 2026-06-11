const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// --- POST ---
// Rota para cadastrar cliente e veículo juntos
router.post('/cadastrar', clienteController.cadastrarCompleto);

// --- GET ---
// Rota para listar a frota completa (Admin)
router.get('/veiculos-todos', clienteController.listarTodosVeiculos);

// Rota para buscar sugestões de nomes no input de pesquisa
router.get('/sugestoes', clienteController.sugestoesClientes);

// Rota para listar apenas veículos
router.get('/veiculos', clienteController.listarVeiculos);

// Rota para buscar veículos de um cliente específico (id do cliente)
router.get('/:id/veiculos', clienteController.buscarVeiculosPorCliente);

// --- PUT (ATUALIZAÇÃO) ---
// Rota para editar os dados do cliente e do veículo
// Acessada via: PUT http://localhost:3001/clientes/[ID_DO_CLIENTE]
router.put('/:id', clienteController.atualizarCliente);

// --- DELETE ---
// Rota para excluir cliente (remove veículo em cascata se configurado)
router.delete('/:id', clienteController.excluirCliente);

module.exports = router;