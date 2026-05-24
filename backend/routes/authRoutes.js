const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Log para depuração (Remova após resolver o erro)
// Isso vai mostrar no seu terminal se as funções foram carregadas corretamente
console.log("Funções disponíveis no authController:", Object.keys(authController));

// --- POST ---
router.post('/login', authController.login);
router.post('/cadastrar', authController.cadastrarUsuario); 

// --- GET ---
router.get('/usuarios', authController.listarMecanicos);

// --- PUT ---
// 1. Rota mais específica primeiro
router.put('/usuarios/:id', authController.atualizarUsuario);

// 2. Outra rota específica
router.put('/status/:id', authController.atualizarStatus);

// --- DELETE ---
// Rota genérica sempre por último
router.delete('/:id', authController.excluirUsuario);

module.exports = router;