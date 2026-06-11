#!/bin/bash

# Script para inicializar o banco de dados localmente
# Este script cria o banco de dados e popula com dados de teste

echo "Inicializando o banco de dados da Oficina..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar se .env existe
if [ ! -f .env ]; then
  echo -e "${YELLOW}Arquivo .env não encontrado. Copiando de .env.example...${NC}"
  cp .env.example .env
  echo -e "${GREEN}Arquivo .env criado. Configure seus dados de conexão se necessário.${NC}"
fi

# Obter dados de conexão do .env
export $(cat .env | grep -v '#' | xargs)

echo -e "${YELLOW}Dados de conexão:${NC}"
echo "   Host: ${DB_HOST:-localhost}"
echo "   Usuário: ${DB_USER:-root}"
echo "   Banco: ${DB_NAME:-oficina}"
echo ""

# Criar banco se não existir
echo -e "${YELLOW}Criando banco de dados...${NC}"
mysql -h "${DB_HOST:-localhost}" -u "${DB_USER:-root}" "${DB_PASSWORD:+-p$DB_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME:-oficina};"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}Banco de dados criado/verificado com sucesso!${NC}"
else
  echo -e "${RED}Erro ao criar o banco de dados!${NC}"
  exit 1
fi

# Importar estrutura
echo -e "${YELLOW}Importando estrutura do banco...${NC}"
mysql -h "${DB_HOST:-localhost}" -u "${DB_USER:-root}" "${DB_PASSWORD:+-p$DB_PASSWORD}" "${DB_NAME:-oficina}" < Database/oficina.sql

if [ $? -eq 0 ]; then
  echo -e "${GREEN}Estrutura importada com sucesso!${NC}"
else
  echo -e "${RED}Erro ao importar a estrutura!${NC}"
  exit 1
fi

# Instalar dependências se node_modules não existir
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}Instalando dependências...${NC}"
  npm install
fi

# Executar seeder
echo -e "${YELLOW}Populando banco com dados de teste...${NC}"
npm run seed

if [ $? -eq 0 ]; then
  echo -e "${GREEN}Banco de dados inicializado com sucesso!${NC}"
  echo -e "${GREEN}Seu ambiente está pronto para desenvolvimento!${NC}"
else
  echo -e "${RED}Erro ao popular o banco de dados!${NC}"
  exit 1
fi
