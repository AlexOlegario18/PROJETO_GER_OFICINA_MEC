# Sprint 3 – Modelagem do Sistema

## Objetivo
Representar a solução "Gestão de Oficina 2.0" por meio de modelos técnicos estruturados que auxiliem a compreensão do fluxo de Ordens de Serviço (OS) e apoiem as decisões de desenvolvimento front-end (React) e back-end (Node.js/MySQL).

## Modelos produzidos
* **Diagrama de Casos de Uso:** Mapeamento das permissões e interações do Mecânico (abertura de OS e lançamento de insumos) e do Administrador (auditoria, filtros e fechamento financeiro).
* **Diagrama de Componentes:** Estruturação da arquitetura em camadas, separando o Front-end reativo, a API de rotas do Back-end e a persistência de dados.
* **Modelo de Dados:** Estrutura relacional do banco de dados MariaDB/MySQL, contendo as tabelas `usuarios`, `clientes`, `veiculos` e `ordens_servico` com suas respectivas chaves primárias e estrangeiras.
* **Diagrama de Sequência:** Detalhamento do ciclo de vida e transição de estados da OS: *Aberta ➔ Em Andamento ➔ Aguardando Aprovação (Status Roxo) ➔ Finalizada*, garantindo a regra de que uma OS não pula de "Em Andamento" direto para "Finalizada" sem revisão do Admin.

## Relação com os requisitos

| Requisito | Modelo Correspondente | Justificativa |
| :--- | :--- | :--- |
| **RF01:** Alteração para "Aguardando Aprovação" | Diagrama de Sequência / Componentes | Valida a regra de negócio e a trava visual do status roxo no fluxo do sistema. |
| **RF02:** Persistência de peças e serviços | Modelo de Dados | Garante a integridade, relacionamentos e consistência das tabelas no banco de dados. |
| **RF03:** Dashboard do Administrador | Diagrama de Casos de Uso | Demonstra as permissões exclusivas do gestor para filtrar status e auditar o pátio. |

## Refinamentos realizados no backlog
Com base na modelagem do fluxo de aprovação, a história de usuário principal foi detalhada para refletir a regra do status intermediário:
* **História Original:** *"Como mecânico, quero finalizar a OS."*
* **História Atualizada/Refinada:** *"Como mecânico, quero enviar a Ordem de Serviço para aprovação, para que o administrador revise as peças utilizadas e valide o orçamento final, garantindo a transição obrigatória para o status 'Aguardando Aprovação' antes do encerramento."*

## Revisão da sprint
* **O que foi feito:** Modelagem e estruturação do banco de dados MySQL, criação das rotas de status no Node.js e renderização condicional de estados no React (sinalização na cor roxa).
* **Decisões tomadas:** Definição da cor roxa como padrão visual para identificar ordens pendentes de auditoria do administrador.
* **Próximos passos:** Implementar as travas de segurança finais no backend para impedir que o perfil de mecânico force a finalização de uma OS sem aprovação, e iniciar o módulo de fechamento financeiro.
