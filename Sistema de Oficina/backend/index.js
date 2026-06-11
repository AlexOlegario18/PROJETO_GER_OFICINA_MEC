const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const osControllers = require('./controllers/osControllers');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ message: 'API Oficina Mecânica funcionando' }));

app.use('/auth', authRoutes);

app.post('/os', osControllers.criarOS);
app.get('/os', osControllers.listarOS);
app.put('/os/:id', osControllers.atualizarProgresso);
app.delete('/os/:id', osControllers.excluirOS);
app.get('/os/cliente/:clienteId', osControllers.historicoPorCliente);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
