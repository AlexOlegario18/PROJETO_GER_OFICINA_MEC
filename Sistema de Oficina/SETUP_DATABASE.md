## 📋 Pré-requisitos

- **MySQL**
- **Node.js** (v14+) e **npm** instalados
- Acesso ao MySQL localmente (recomendado usuário `root`)

## ⚡ Quickstart (Recomendado)

### Windows
Se você está em Windows, execute o script de setup:

```bash
cd backend/scripts
setup-db.bat
```

Este script irá automaticamente:
1. ✅ Criar arquivo `.env` se não existir
2. ✅ Criar o banco de dados
3. ✅ Importar a estrutura de tabelas
4. ✅ Instalar dependências Node
5. ✅ Popular com dados de teste

### Linux/Mac
```bash
cd backend/scripts
chmod +x setup-db.sh
./setup-db.sh
```

## 🛠️ Instalação Manual

Se preferir fazer manualmente ou o script automático não funcionar:

### 1. Configurar variáveis de ambiente

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` com seus dados:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=oficina
DB_PORT=3306
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar o banco de dados

```bash
mysql -u root -p
```

No prompt do MySQL:
```sql
CREATE DATABASE oficina;
EXIT;
```

### 4. Importar estrutura

```bash
mysql -u root -p oficina < ../Database/oficina.sql
```

### 5. Popular com dados de teste

```bash
npm run seed
```

## 📊 Scripts disponíveis

No diretório `backend`, você pode usar:

| Comando | Descrição |
|---------|-----------|
| `npm run seed` | Popular banco com dados de teste |
| `npm run dev` | Iniciar servidor em modo desenvolvimento (com nodemon) |
| `npm start` | Iniciar servidor em produção |

## 🌱 O que é inserido pelo Seeder?

O script `seeds/seeder.js` popula o banco com dados realistas de teste:

### Usuários (5)
- 1 Administrador
- 4 Mecânicos com especialidades diferentes

### Clientes (5)
- 3 clientes pessoas físicas
- 2 empresas de transporte/logística

### Veículos (7)
- Vários modelos e marcas
- Carros, caminhonetes e caminhões

### Ordens de Serviço (6)
- Diferentes status (Aberta, Em Andamento, Finalizada)
- Serviços variados (revisão, reparo, diagnóstico)

## 🔄 Resetar o banco

Para limpar e repopular o banco com dados de teste:

```bash
cd backend
npm run seed
```

O script irá:
- Limpar todas as tabelas automaticamente
- Desativar verificação de chaves estrangeiras
- Reinserir dados de teste
- Reativar verificação de integridade

## 🔐 Credenciais de Teste

Após rodar o seeder, você pode fazer login com:

**Admin:**
- Usuário: `admin`
- Senha: `123`

**Mecânico:**
- Usuário: `joao@email.com`
- Senha: `123`

## ⚠️ Solução de Problemas

### "MySQL command not found"
MySQL não está no PATH do seu sistema. Adicione a pasta `bin` do MySQL ao PATH ou use o caminho completo.

### "Access denied for user 'root'@'localhost'"
Sua senha do MySQL está diferente. Edite o `.env` com a senha correta.

### "Database already exists"
Se o banco já existe, o script irá apenas usar a estrutura existente. Execute `npm run seed` para limpar e repopular.

### "Erro ao executar seeder"
Verifique se:
1. `.env` está configurado corretamente
2. MySQL está rodando
3. O banco foi criado e a estrutura foi importada

## 📚 Arquivos importantes

```
backend/
├── config/
│   └── db.js              # Configuração de conexão com MySQL
├── seeds/
│   └── seeder.js          # Script que popula o banco
├── scripts/
│   ├── setup-db.sh        # Script de setup para Linux/Mac
│   └── setup-db.bat       # Script de setup para Windows
├── .env.example           # Template de variáveis de ambiente
└── package.json           # Dependências e scripts
```

## 🚀 Próximas etapas

Após configurar o banco:

1. Instale as dependências do frontend:
   ```bash
   cd frontend
   npm install
   ```

2. Inicie o servidor backend:
   ```bash
   cd backend
   npm run dev
   ```

3. Em outro terminal, inicie o frontend:
   ```bash
   cd frontend
   npm run dev
   ```

4. Acesse a aplicação em `http://localhost:5173`

