# 10.0. Apresentação Final — Gestão Oficina 2.0

Este repositório contém a documentação e os arquivos de suporte para a apresentação final da disciplina de **Engenharia de Software** da Universidade Federal de Lavras (**UFLA**), ministrada pelo **Professor Johnatan**.

---

## 📁 Materiais de Apoio e Entregáveis
* 📄 **Slides Oficiais da Apresentação (PDF):** [slides_apresentacao_ufla.pdf](./slides_apresentacao_ufla.pdf)
* 🌐 **Ambiente de Produção (API Live):** [oficina-backend-rust.vercel.app](https://oficina-backend-rust.vercel.app)
* 💻 **Código-Fonte do Projeto:** [GitHub - PROJETO_GER_OFICINA_MEC](https://github.com/AlexOlegario18/PROJETO_GER_OFICINA_MEC)

---

## 1. Objetivo da Apresentação
Apresentar o problema escolhido no ecossistema de oficinas mecânicas, a solução de software desenvolvida (**Gestão Oficina 2.0**), a evolução incremental ao longo das Sprints e a aplicação rigorosa dos conceitos de Engenharia de Software da disciplina.

---

## 2. Estrutura Estratégica da Apresentação

1. **Contexto e Problema:** Fragmentação de dados em oficinas mecânicas analógicas e falta de históricos unificados.
2. **Justificativa da Solução:** Migração SaaS para nuvem, escalabilidade serverless e segurança da informação (*Zero Hardcoding*).
3. **Visão do Produto:** Sistema centralizado para emissão de Ordens de Serviço (OS) e persistência íntegra.
4. **Organização do Grupo com Scrum:** Divisão de papéis claros (SM, PO, Devs, QA, DBA) e Sprints quinzenais.
5. **Principais Requisitos:** Mapeamento de CRUDs de clientes/OS (funcionais) e isolamento de secrets/conexão SSL (não-funcionais).
6. **Modelagem:** Diagrama Entidade-Relacionamento (ER) e dicionário de dados focado no MySQL.
7. **Arquitetura e Decisões de Projeto:** Topologia baseada em Node.js + Express na Vercel conectados à nuvem gerenciada da Aiven MySQL.
8. **Padrões Utilizados:** Implementação de MVC (Model-View-Controller), Middlewares e Connection Pool.
9. **Estratégia e Evidências de Testes:** Homologação de rotas pelo setor de QA e 100% de mascaramento de variáveis de ambiente (`.env`).
10. **Demonstração do Produto/Incremento:** Validação da API e requisições em tempo real.
11. **Lições Aprendidas:** Resolução de conflitos de Git Flow e tratamento de certificados TLS/SSL entre nuvens.
12. **Conclusão:** Fechamento acadêmico e técnico.

---

## 👥 Organização do Grupo e Atribuições
* **Alexsander Davi Naves Olegário** — Scrum Master & Full-stack Developer
* **Edson Mateus Gonçalves** — Product Owner & Frontend Developer
* **Maria Lina da Silva** — Full-Stack Developer & Documentação Técnica
* **Lucas de Jesus Gonçalves** — Quality Assurance (QA) & DBA
* **Pedro Otavio de Carvalho Nunes** — Frontend Developer & UI/UX Specialist

---

## 3. Conclusão do Grupo
> O grupo conclui que a solução proposta pelo **Gestão Oficina 2.0** atende de forma integral ao problema selecionado em nível acadêmico e comercial, demonstrando de forma clara a aplicação prática dos conteúdos de Engenharia de Software e o uso coerente de Scrum durante todo o ciclo de desenvolvimento do semestre.

---

## 📊 Checklist Final de Verificação antes de Subir
- [x] Todos os integrantes revisaram e sabem apresentar sua respectiva parte.
- [x] Arquivo PDF da apresentação anexado no repositório.
- [x] Links da API Vercel e rotas totalmente funcionais.
- [x] Ambiente e dados de teste preparados para a demonstração ao vivo.
- [x] Tempo de apresentação ensaiado dentro do limite estabelecido pelo Prof. Johnatan.
