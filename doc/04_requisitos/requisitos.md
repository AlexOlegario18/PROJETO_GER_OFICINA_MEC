# 04. Requisitos

## 1. Levantamento de requisitos
Os requisitos foram identificados através da **análise do problema** de comunicação em oficinas mecânicas, somada a **discussões em grupo** mediadas pelo Discord. Observamos a necessidade de uma ferramenta que separasse o esforço técnico do mecânico da responsabilidade financeira do administrador, utilizando o fluxo de estados (status) como principal guia.

---

## 2. Requisitos funcionais
| ID | Requisito funcional | Descrição | Prioridade |
|---|---|---|---|
| RF01 | Autenticação por Nível | O sistema deve permitir o login diferenciado para Administradores e Mecânicos. | Alta |
| RF02 | Registro de Laudo Técnico | O Mecânico deve registrar serviços executados e peças utilizadas em cada OS. | Alta |
| RF03 | Gestão de Status Visual | O sistema deve alterar e exibir cores para cada status (Aberta, Em Andamento, Aguardando, Finalizada). | Alta |
| RF04 | Atribuição de Mecânico | O Administrador deve poder vincular um mecânico específico a uma Ordem de Serviço. | Média |
| RF05 | Fechamento Financeiro | O Administrador deve inserir o valor total e encerrar a OS, bloqueando edições posteriores. | Alta |

---

## 3. Requisitos não funcionais
| ID | Requisito não funcional | Descrição | Categoria |
|---|---|---|---|
| RNF01 | Interface Responsiva | O sistema deve ser utilizável em desktops e tablets (uso no pátio da oficina). | Usabilidade |
| RNF02 | Tempo de Resposta | A atualização de status deve ser refletida nos painéis em menos de 2 segundos. | Desempenho |
| RNF03 | Persistência de Dados | O sistema deve garantir que rascunhos de laudos não sejam perdidos ao trocar de tela. | Segurança |
| RNF04 | Padronização Visual | O sistema deve seguir uma paleta de cores consistente para estados de urgência. | Usabilidade |

---

## 4. Regras de negócio
| ID | Regra | Descrição |
|---|---|---|
| RN01 | Bloqueio de Valor | O Mecânico nunca poderá visualizar ou editar o campo de "Valor Total" da OS. |
| RN02 | Fluxo de Aprovação | Uma OS só pode ser "Finalizada" se o status anterior for "Aguardando Aprovação". |
| RN03 | Visibilidade Segregada | O Mecânico só visualiza as Ordens de Serviço que foram atribuídas ao seu ID. |

---

## 5. Critérios de aceitação por funcionalidade
### Funcionalidade: Fluxo de Aprovação (Status Roxo)
- O sistema deve exibir o botão "Enviar para Aprovação" apenas para OS em "Em Andamento".
- Ao clicar, o status no banco de dados deve mudar para "Aguardando".
- No painel do Admin, a OS deve aparecer destacada com a cor roxa.

---

## 6. Casos de uso ou cenários
### Caso de uso: Finalizar Laudo Técnico
**Atores:** Mecânico  
**Objetivo:** Registrar o trabalho realizado e liberar a OS para faturamento.  
**Fluxo principal:** 1. Mecânico acessa seu painel e seleciona uma OS "Em Andamento".  
2. Digita os serviços feitos e as peças trocadas.  
3. Clica em "Finalizar e Enviar para Admin".  
4. O sistema valida os campos, salva os dados e altera o status para "Aguardando".

**Fluxos alternativos:** - O mecânico clica em "Salvar Rascunho": o sistema salva os textos, mas mantém o status em "Em Andamento".

---

## 7. Rastreabilidade
| Problema | Backlog | Requisito | Modelagem (Diagrama) |
|---|---|---|---|
| Falha na comunicação técnica | PB03 | RF02 | UC: Registrar Laudo Técnico |
| Erro na precificação final | PB06 | RF05 | UC: Definir Valor e Finalizar |
| Falta de rastreio do status | PB04 | RF03 | UC: Consultar Status OS |

## 8. Modelagem Visual
![Diagrama de Caso de Uso](./diagrama_caso_de_uso.png)
