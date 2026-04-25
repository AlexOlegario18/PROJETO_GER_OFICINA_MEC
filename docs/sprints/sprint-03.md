# Sprint 3 - Modelagem do Sistema (Oficina Mecânica)

### 👥 Alunos
* ALEXSANDER DAVI NAVES OLEGÁRIO
* EDSON MATEUS GONÇALVES
* MARIA LINA DA SILVA
* LUCAS DE JESUS GONÇALVES

## 1. Definição da Aplicação
O sistema "Oficina 2.0" é uma solução web focada na gestão e controle de Ordens de Serviço (OS). O objetivo principal é digitalizar o fluxo de trabalho, garantindo que nenhum serviço seja finalizado sem a devida conferência administrativa.

* **Perfil Mecânico:** Responsável por registrar a mão de obra e peças utilizadas, encaminhando a OS para revisão.
* **Perfil Administrador:** Responsável pela auditoria das ordens enviadas, aprovação de orçamentos e fechamento financeiro.

## 2. Requisitos Funcionais (RFs)
Os modelos produzidos visam atender, prioritariamente, aos seguintes requisitos:
* **RF01:** O sistema deve permitir a alteração de status da OS para "Aguardando Aprovação".
* **RF02:** O sistema deve persistir dados de peças, serviços e responsáveis no banco de dados.
* **RF03:** O sistema deve apresentar um dashboard exclusivo para o Administrador com filtros de status.

## 3. Modelos Produzidos

### Modelo de Dados (MER)
Representa a arquitetura do banco de dados MySQL, demonstrando o relacionamento entre as tabelas de usuários, veículos e ordens de serviço.
![Modelo de Dados](./banco.png)

### Protótipo de Interface
Representa o front-end em React, destacando a visualização das OS com status "Aguardando Aprovação" (identificadas pela cor roxa).
![Tela do Sistema](./tela.png)

## 4. Relação com os Requisitos
* O **Modelo de Dados** garante o cumprimento do **RF02**, assegurando a integridade e persistência das informações.
* O **Protótipo de Interface** valida o **RF01** e **RF03**, demonstrando a interação do usuário com as novas regras de negócio.

## 5. Refinamentos realizados no backlog
Nesta sprint, refinamos a história de usuário **"Finalizar Ordem de Serviço"**. 
* **Antes:** A OS era encerrada diretamente pelo mecânico.
* **Após Refinamento:** Foi implementada uma regra de negócio onde a finalização pelo mecânico gera um status intermediário de "Aguardando Aprovação", exigindo a validação do Administrador para o encerramento definitivo.

## 6. Revisão da Sprint
* **O que foi feito:** Estruturação completa do banco de dados (MySQL), criação das rotas de atualização de status no Backend (Node.js) e integração do painel visual no Frontend (React).
* **Decisões tomadas:** Optou-se por uma sinalização visual distinta (cor roxa) para as OS que aguardam revisão, facilitando a tomada de decisão do gestor.
* **Próximos passos:** Desenvolvimento do módulo de emissão de relatórios e faturamento.
