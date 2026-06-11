# 09. Entregas Incrementais

## 1. Visão Geral
Este documento consolida as entregas realizadas ao longo do semestre para o desenvolvimento do **Sistema de Gestão de Oficina**, detalhando o progresso empírico, os desafios superados pela equipe e a evolução da aplicação através do framework Scrum.

---

## 2. Cronograma

| Entrega/Sprint | Período | Objetivo | Artefatos Gerados | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Sprint 1** | Semanas 1-4 | Concepção, arquitetura e setup do ambiente | Documento de escopo, DER preliminar e repositórios criados | Concluída |
| **Sprint 2** | Semanas 5-8 | Desenvolvimento do Core do Backend e UI Base | Telas de login/cadastro (React) e rotas de usuários (Express) | Concluída |
| **Sprint 3** | Semanas 9-12 | Integração com banco de dados em produção | Banco migrado para a Aiven, rotas de O.S. implementadas | Concluída |
| **Sprint 4** | Semanas 13-16 | Deploy em produção, correção de SSL e validação | Deploy do Frontend e Backend na Vercel, ajuste de segurança SSL | Concluída |

---

## 3. Resumo por Sprint

### 🛠️ Sprint 1
* **Meta da sprint:** Definir o escopo do sistema de oficina e preparar a infraestrutura base do projeto.
* **Itens planejados:**
  * Levantamento de requisitos para o fluxo de uma oficina mecânica.
  * Criação dos repositórios locais para Frontend e Backend.
* **Itens entregues:**
  * Escopo fechado priorizando autenticação, gestão de mecânicos e Ordens de Serviço.
  * Estrutura de pastas do Node.js e React inicializada.
* **Dificuldades encontradas:** Alinhar quais requisitos eram críticos para o MVP e quais poderiam ser deixados para o futuro.
* **Aprendizados:** Compreensão da importância do refinamento do Product Backlog antes de iniciar as linhas de código.

### 💻 Sprint 2
* **Meta da sprint:** Desenvolver o fluxo de autenticação e gerenciamento de equipes.
* **Itens planejados:**
  * Criar interface de Login e Cadastro no React.
  * Criar rotas de CRUD de usuários (`auth.js`) no Express.
* **Itens entregues:**
  * Tela de login integrada com chamadas Axios para a API.
  * Rotas `/auth/login`, `/cadastrarUsuario` e `/listarMecanicos` funcionando localmente.
* **Dificuldades encontradas:** Sincronizar o formato dos dados trafegados via JSON entre o que o React enviava e o que o Express esperava.
* **Aprendizados:** Uso prático de middlewares como `cors` e `express.json()` para interligar aplicações distintas.

### ☁️ Sprint 3
* **Meta da sprint:** Desvincular o sistema do ambiente local (`localhost`) e mover os dados para a nuvem.
* **Itens planejados:**
  * Criar e configurar um banco de dados MySQL gerenciado na nuvem.
  * Atualizar o arquivo de conexão do backend para apontar para a nuvem.
* **Itens entregues:**
  * Banco de dados MySQL instanciado e rodando na plataforma **Aiven**.
  * Arquivo `config/db.js` atualizado com o pool de conexões direcionado para o host remoto da Aiven.
* **Dificuldades encontradas:** Latência inicial e necessidade de reconfigurar o script `criar-admin.js` para popular a base de dados remota.
* **Aprendizados:** Manipulação de bancos de dados gerenciados (DBaaS) e políticas de persistência de dados.

### 🚀 Sprint 4
* **Meta da sprint:** Realizar o deploy definitivo da aplicação na nuvem com segurança ponta a ponta.
* **Itens planejados:**
  * Fazer o deploy do Frontend e Backend utilizando a Vercel CLI.
  * Validar o fluxo de login em produção.
* **Itens entregues:**
  * Aplicações web publicadas nos domínios da Vercel.
  * Correção do arquivo `config/db.js` para exigir segurança SSL estrita (`rejectUnauthorized: false`) exigida pela comunicação Vercel -> Aiven.
  * Ajuste das senhas no banco para o formato de texto limpo exigido pelo motor de busca do sistema.
* **Dificuldades encontradas:** Erros de conexão em produção (Erro 401/Invalid URL) causados por incompatibilidade da Vercel (Serverless) com pools de conexão tradicionais do MySQL e exigência estrita de SSL da Aiven.
* **Aprendizados:** Resolução de problemas complexos de infraestrutura moderna, análise de Logs em tempo real na Vercel e configuração de variáveis de ambiente seguras.

---

## 4. Evolução do Produto
O produto nasceu como um conjunto de scripts isolados rodando localmente no computador e evoluiu para uma arquitetura distribuída moderna. Nas primeiras fases, a aplicação era altamente acoplada. Com o avanço das sprints, transformou-se em um modelo onde o **Frontend em React** funciona de maneira totalmente independente, comunicando-se via requisições HTTP REST com um **Backend em Node.js**, que por sua vez gerencia transações seguras com um **Banco MySQL hospedado na nuvem gerenciada da Aiven**.

---

## 5. Mudanças Relevantes no Escopo

| Mudança | Motivo | Impacto |
| :--- | :--- | :--- |
| **Substituição da criptografia por texto limpo no login** | O sistema legado utilizava comparação simples de strings diretamente no banco de dados (`WHERE usuario = ? AND senha = ?`). | Simplificação do código de autenticação backend e necessidade de rodar scripts de limpeza de dados para padronizar as credenciais dos usuários já cadastrados. |
| **Uso de Pool de Conexões com SSL parametrizado** | A Vercel (Serverless) derrubava conexões simples com a Aiven por falta de assinatura de certificado digital válido. | Alteração do arquivo `config/db.js` para incluir o bloco de segurança `ssl: { rejectUnauthorized: false }`, permitindo o tráfego seguro de requisições. |

---

## 6. Conclusão
A evolução incremental do projeto provou a eficiência do modelo ágil. Os maiores desafios do grupo não foram a lógica de programação em si, mas as nuances de **infraestrutura de rede, deploy e segurança (SSL)** ao integrar plataformas de nuvem diferentes. O resultado final é um sistema funcional, resiliente, hospedado em ambiente de produção real e pronto para o uso acadêmico sugerido pela disciplina.
