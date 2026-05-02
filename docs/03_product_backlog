# 03. Product Backlog

## 1. Visão geral
O Product Backlog reúne as funcionalidades essenciais para o funcionamento do AutoFlow OS, desde a autenticação até a finalização técnica e financeira das ordens de serviço.

## 2. Estratégia de priorização
Os itens foram priorizados utilizando o critério de **Caminho Crítico**: primeiro as funcionalidades que permitem a existência da OS (Abertura e Login), seguidas pelo fluxo de trabalho do mecânico e, por fim, o fechamento administrativo.

---

## 3. Backlog do produto
| ID | Tipo | Item do backlog | Descrição | Prioridade | Critérios de aceitação | Estimativa | Sprint prevista |
|---|---|---|---|---|---|---|---|
| PB01 | História de Usuário | Autenticação por Cargo | Como usuário, quero logar para acessar meu painel específico (Admin/Mecânico). | Alta | Login redireciona para a tela correta baseada no `tipoUsuario`. | 5 pts | Sprint 1 |
| PB02 | História de Usuário | Gestão de OS (Admin) | Como administrador, quero abrir uma OS para designar serviços aos mecânicos. | Alta | Formulário salva cliente, veículo e descrição do problema no banco. | 8 pts | Sprint 1 |
| PB03 | História de Usuário | Painel do Mecânico | Como mecânico, quero visualizar minhas OS para iniciar os reparos. | Alta | Lista mostra apenas ordens vinculadas ao ID do mecânico logado. | 5 pts | Sprint 2 |
| PB04 | Requisito Técnico | Fluxo de Status | Como sistema, quero gerenciar os estados da OS (Aberta a Finalizada). | Alta | Status deve mudar para "Aguardando" ao ser enviado pelo mecânico. | 3 pts | Sprint 2 |
| PB05 | Melhoria | Identificação Visual | Como usuário, quero ver cores nos status para identificar a urgência. | Média | Cores específicas para: Aberta (Azul), Andamento (Amarelo), Aguardando (Roxo). | 2 pts | Sprint 3 |
| PB06 | História de Usuário | Fechamento Financeiro | Como administrador, quero inserir o valor total para finalizar a OS. | Média | Campo de valor total e mudança de status para "Finalizada" (Verde). | 3 pts | Sprint 3 |

---

## 4.  história de usuário
**US03 - Apontamento Técnico (Mecânico)** Como **mecânico**, quero **registrar as peças e serviços executados**, para **enviar o laudo técnico para aprovação do gestor**.

**Critérios de aceitação:**
- O sistema deve permitir digitar texto nos campos "Serviços" e "Peças";
- Ao clicar em "Finalizar e Enviar", o status deve mudar para **Aguardando**;
- O campo de valor total deve estar bloqueado para o mecânico.

---

## 5. Observações
- O backlog reflete a necessidade de separação de responsabilidades (Mecânico detalha, Admin precifica).
- A estimativa em pontos (Story Points) leva em conta a complexidade da integração Front-end/Back-end.
- Itens concluídos são validados em reuniões via Discord.
