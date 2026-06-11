# 🛠️ Sistema de Gestão de Oficina 2.0

> Template oficial e consolidação do Trabalho Final da disciplina de Engenharia de Software. Projeto concluído, validado e publicado em ambiente de produção (Cloud).

---

## ☁️ Infraestrutura de Produção (Referências)
Para garantir a segurança e a integridade da aplicação, os links diretos de acesso foram omitidos de forma a mitigar acessos indevidos e proteger as cotas de consumo do banco de dados. O ecossistema está implantado nas seguintes plataformas:
* **Interface Web (Frontend):** Publicado em ambiente de hospedagem estática e otimizada na plataforma **Vercel**.
* **API de Serviços (Backend):** Implantado sob arquitetura Serverless na plataforma **Vercel Functions**.
* **Banco de Dados Relacional:** Instanciado em um cluster gerenciado de alta disponibilidade na **Aiven Cloud** (MySQL).

---

## 1. Identificação do Projeto

* **Nome do projeto:** GESTÃO DE OFICINA 2.0
* **Problema escolhido:** Falta de centralização, desorganização operacional, acúmulo de papelada e ausência de histórico de manutenções em pequenas e médias oficinas mecânicas.
* **Instituição:** Universidade Federal de Lavras (UFLA)
* **Turma/Semestre:** Engenharia de Software (GAC188 - 2026/1)
* **Docente:** Prof. Dr. Johnatan Alves de Oliveira

### 👥 Integrantes do Grupo e Papéis Scrum
* **ALEXSANDER DAVI NAVES OLEGÁRIO** — Scrum Master & Backend Developer
* **EDSON MATEUS GONÇALVES** — Product Owner & Frontend Developer
* **MARIA LINA DA SILVA** — Full-Stack Developer & Documentação
* **LUCAS DE JESUS GONÇALVES** — Quality Assurance (Testes) & DBA
* **PEDRO OTAVIO DE CARVALHO NUNES** — Frontend Developer & UI/UX Specialist

---

## 2. Objetivo do Trabalho
Desenvolver uma solução de software robusta para a gestão de ordens de serviço e fluxos de trabalho automotivos, aplicando de forma rigorosa e prática os conceitos de Engenharia de Software ministrados ao longo do semestre.

O projeto foi construído e evoluiu por meio de **entregas incrementais (4 Sprints)**, cobrindo:
* Processos de software baseados no framework **Scrum**.
* Engenharia de Requisitos e escrita de User Stories.
* Modelagem conceitual e relacional de dados.
* Padrões de arquitetura e decisões de projeto voltados para a nuvem (*Cloud Native*).
* Estratégias de testes e validação em ambiente de produção.

---

## 3. Estrutura e Organização do Repositório
O repositório está organizado de forma a separar claramente a documentação do Scrum, os relatórios acadêmicos e o código-fonte da aplicação:
.
├── README.md                           # Este arquivo de identificação e guia do projeto
├── .gitignore                          # Filtro de arquivos locais e credenciais do Node/React
├── docs/                               # Documentação técnica detalhada das entregas (.md)
│   ├── 01_problema_e_visao_do_produto.md
│   ├── 02_scrum_e_organizacao_do_grupo.md
│   ├── 03_product_backlog.md
│   ├── 04_requisitos.md
│   ├── 05_modelagem.md
│   ├── 06_arquitetura_e_projeto.md
│   ├── 07_padroes_de_projeto.md
│   ├── 08_testes.md
│   ├── 09_entregas_incrementais.md    # Relatório final das 4 sprints concluídas
│   └── 10_apresentacao_final.md       # Slides e roteiro de encerramento
├── sprints/                            # Histórico de acompanhamento dos ciclos do Scrum
│   ├── sprint_01.md                    # Planejamento e retrospectiva da Sprint 1
│   ├── sprint_02.md                    # Planejamento e retrospectiva da Sprint 2
│   ├── sprint_03.md                    # Planejamento e retrospectiva da Sprint 3
│   └── sprint_04.md                    # Planejamento e retrospectiva da Sprint 4 (Final)
└── sistema de oficina/                 # Diretório centralizador do código-fonte
├── frontend/                       # Aplicação cliente desenvolvida em React.js
└── backend/                        # API Rest e regras de negócio em Node.js

---

## 4. Fluxo de Trabalho com Scrum
A equipe adaptou as cerimônias tradicionais do Scrum para o dinamismo do ecossistema acadêmico, mapeando todo o progresso através de ferramentas digitais.

* **GitHub Projects & Issues:** Utilizados como a ferramenta oficial de *Kanban*, transformando o Product Backlog em Issues acionáveis categorizadas por User Stories, Tarefas técnicas e Relatórios de Bugs.
* **Sprints Dinâmicas:** Divisão do calendário letivo em ciclos incrementais onde cada Sprint gerava um incremento de software testável e funcional.
* **Critérios de Pronto (DoD):** Uma tarefa só foi considerada concluída quando codificada, validada localmente, integrada com o banco em nuvem e publicada na Vercel sem quebras no fluxo de autenticação.

---

## 5. Matriz de Entregas Previstas e Consolidadas

| Entrega | Foco Principal | Arquivo-Base | Status |
| :--- | :--- | :--- | :--- |
| **Entrega 1** | Problema, Visão do Produto e Organização | `docs/01_...` e `docs/02_...` | **Concluído** |
| **Entrega 2** | Product Backlog Priorizado e Requisitos | `docs/03_...` e `docs/04_...` | **Concluído** |
| **Entrega 3** | Modelagem de Dados e DER | `docs/05_modelagem.md` | **Concluído** |
| **Entrega 4** | Arquitetura, Decisões de Projeto e Padrões | `docs/06_...` e `docs/07_...` | **Concluído** |
| **Entrega 5** | Estratégia de Testes, Cobertura e Evidências | `docs/08_testes.md` | **Concluído** |
| **Final** | Entregas Incrementais e Slides de Apresentação | `docs/09_...` e `docs/10_...` | **Concluído** |

---

## 6. Stack Tecnológica Utilizada
Para garantir a modularidade e a escalabilidade exigidas nos critérios de avaliação de arquitetura, o ecossistema foi projetado de forma desacoplada:

* **Frontend:** Single Page Application (SPA) estruturada em **React.js** com comunicação assíncrona baseada na biblioteca Axios.
* **Backend:** RESTful API construída sobre a plataforma **Node.js** com framework **Express.js**, garantindo respostas rápidas sob o modelo Serverless.
* **Banco de Dados:** **MySQL** relacional gerenciado na nuvem, parametrizado com pools de conexões estáveis e segurança criptográfica **SSL/TLS obrigatória** para comunicação entre servidores.

---

## 7. Critérios de Qualidade Atendidos
1. **Rastreabilidade Total:** Alinhamento direto entre as dores do negócio levantadas no problema, os requisitos funcionais descritos na modelagem e os testes de fim-a-fim efetuados nas rotas de login e ordens de serviço.
2. **Histórico de Commits:** Commits granulares, explicativos e frequentes demonstrando o esforço contínuo e a autoria orgânica de todos os membros do grupo.
3. **Segurança Avançada:** Tratamento rigoroso de variáveis de ambiente (`.env`), impedindo a exposição pública de credenciais de bancos de dados remotos no GitHub.
