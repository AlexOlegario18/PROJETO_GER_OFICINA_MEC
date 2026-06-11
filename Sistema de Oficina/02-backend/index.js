const express = require('express');
const cors = require('cors');

// 1. IMPORTAR AS ROTAS
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const osRoutes = require('./routes/osRoutes');

const app = express();

// 2. MIDDLEWARES
app.use(cors());
app.use(express.json()); 

// 3. DEFINIR OS PREFIXOS DAS ROTAS
app.use('/auth', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/os', osRoutes); // Certifique-se que o arquivo existe em ./routes/osRoutes.js

// Rota de teste
app.get('/', (req, res) => {
  res.send("🚀 Servidor da Oficina rodando liso!");
});

// 4. LIGAR O SERVIDOR (Atualizado para funcionar na Nuvem)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando com sucesso!`);
  console.log(`🔑 Auth: /auth | 🚗 Clientes: /clientes | 🛠️ OS: /os`);
});