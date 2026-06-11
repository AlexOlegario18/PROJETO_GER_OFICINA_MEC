const express = require('express');
const router = express.Router();
const osController = require('../controllers/osController');

router.post('/criar', osController.criarOS);               // POST /os/criar
router.get('/listar', osController.listarOS);              // GET /os/listar
router.put('/:id/progresso', osController.atualizarProgresso); // PUT /os/1/progresso
router.delete('/:id', osController.excluirOS);             // DELETE /os/1
router.get('/historico/:clienteId', osController.historicoPorCliente); // GET /os/historico/5

module.exports = router;