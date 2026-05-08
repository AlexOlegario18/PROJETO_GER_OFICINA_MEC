# 06. Arquitetura e Projeto

## 👥 Alunos
* ALEXSANDER DAVI NAVES OLEGÁRIO
* EDSON MATEUS GONÇALVES
* MARIA LINA DA SILVA
* LUCAS DE JESUS GONÇALVES
* PEDRO OTAVIO DE CARVALHO NUNES

---

## 1. Visão arquitetural
A solução adota uma estrutura moderna que separa a interface do utilizador da lógica de processamento e do armazenamento de dados, permitindo manutenções isoladas e maior segurança nas regras de negócio.

**Estilo arquitetural adotado:**
- **Cliente-Servidor / MVC em camadas**

**Justificativa:**
Esta arquitetura foi escolhida para garantir que o **Frontend (React)** foque na experiência do utilizador, enquanto o **Backend (Node.js)** centraliza as regras críticas, como a trava de segurança que permite apenas ao Administrador aprovar orçamentos. O uso de **MySQL** como camada de persistência garante a integridade dos dados históricos da oficina.

---

## 2. Estrutura em alto nível
### Camadas ou módulos
| Camada/Módulo | Responsabilidade |
|---|---|
| **Apresentação** | Interface Web em React para interação do Mecânico (laudos) e Admin (dashboard financeiro). |
| **Aplicação** | API Node.js/Express que gere as rotas, autenticação e fluxo de estados da OS. |
| **Domínio** | Lógica de negócio que define os status das ordens (Aberto, Aguardando Aprovação, Finalizado). |
| **Persistência** | Base de dados MySQL responsável por armazenar clientes, veículos e itens de serviço. |

---

## 3. Principais decisões de projeto
| Decisão | Motivação | Impacto |
|---|---|---|
| **Status Intermediário (Roxo)** | Garantir que nenhum serviço seja cobrado sem conferência do Admin. | Maior controlo financeiro e redução de erros humanos no caixa. |
| **Comunicação REST/JSON** | Necessidade de uma troca de dados leve entre Frontend e Backend. | Sistema mais ágil e facilidade para futuras expansões (ex: App Mobile). |

---

## 4. Tecnologias previstas
| Tecnologia | Finalidade | Justificativa |
|---|---|---|
| **React** | Interface | Permite criar uma interface dinâmica e responsiva para os mecânicos no pátio. |
| **Node.js** | API | Alta performance no processamento de requisições simultâneas. |
| **MySQL** | Base de dados | Solução robusta e amplamente utilizada para dados relacionais e históricos. |

---

## 5. Riscos técnicos
| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Falha de ligação com a API | Média | Alta | Implementação de tratamento de erros no Frontend com avisos ao utilizador. |
| Inconsistência de status da OS | Baixa | Médio | Validações rigorosas no Backend antes de qualquer alteração na base de dados. |

---

## 6. Exemplo resumido
> Será adotada uma arquitetura cliente-servidor organizada em camadas (MVC), separando a interface em React, a lógica de negócio em Node.js e a persistência em MySQL, visando facilitar a manutenção, garantir a segurança das transições de status e permitir a evolução incremental do sistema.
