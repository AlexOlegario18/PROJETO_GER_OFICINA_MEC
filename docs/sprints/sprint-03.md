# Sprint 3 - Modelagem do Sistema (Oficina Mecânica)
### 👥 ALUNOS
* **ALEXSANDER DAVI NAVES OLEGÁRIO**
* **EDSON MATEUS GONÇALVES**
* **MARIA LINA DA SILVA**
* **LUCAS DE JESUS GONÇALVES**

## 1. Definição da Aplicação
O sistema é uma plataforma web para gestão de ordens de serviço. 
- **Mecânicos:** Registram consertos e mudam status para "Aguardando Aprovação".
- **Administradores:** Visualizam OS pendentes e finalizam o processo.

## 2. Modelos Produzidos
### Modelo de Dados
Representa como as informações de usuários e ordens de serviço estão organizadas.
![Modelo de Dados](./banco.png)

### Protótipo de Interface
Representa a tela de gestão onde o Admin visualiza as OS enviadas pelo mecânico.
![Tela do Sistema](./tela.png)

## 3. Relação com os Requisitos
- O **Modelo de Dados** atende ao requisito de persistência de status da OS.
- O **Protótipo** atende ao requisito de interface diferenciada para o Administrador.

## 4. Refinamentos e Revisão
- **Refinamento:** Detalhamos a história de usuário "Finalizar OS" para incluir uma trava: a OS só fecha após aprovação do Admin.
- **O que foi feito:** Banco de dados estruturado, rotas de backend criadas e frontend integrado.
