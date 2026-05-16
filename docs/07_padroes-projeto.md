# 07. Padrões de Projeto

## 👥 Alunos
* ALEXSANDER DAVI NAVES OLEGÁRIO
* EDSON MATEUS GONÇALVES
* MARIA LINA DA SILVA
* LUCAS DE JESUS GONÇALVES
* PEDRO OTAVIO DE CARVALHO NUNES

---

## 1. Objetivo
Apresentar os padrões de projeto considerados e aplicados na solução de gerenciamento da oficina mecânica, visando garantir a escalabilidade, manutenibilidade e a correta separação de conceitos no código.

---

## 2. Padrões selecionados

| Padrão | Onde será usado | Problema que resolve | Justificativa |
| :--- | :--- | :--- | :--- |
| **Singleton** | Na conexão com o banco de dados (`backend/src/config/database.js`). | Criação excessiva de conexões com o banco, gerando estouro de memória e lentidão. | Garante que exista apenas uma instância ativa da conexão com o MariaDB/MySQL em toda a aplicação. |
| **Observer** | No gerenciamento de estado do Frontend React (`useState` / `useEffect`). | Sincronização manual da interface com as mudanças de dados da API (ex: atualizar a tela com F5). | Permite que os componentes da tela reajam automaticamente quando o status da Ordem de Serviço mudar. |
| **Strategy** | Na validação de regras de negócio das Ordens de Serviço (ex: transição de status). | Acúmulo de estruturas `if/else` complexas e engessadas para validar permissões de usuários (Mecânico vs Admin). | Encapsula as regras de mudança de estado, facilitando a implementação de novos status ou travas financeiras. |

---

## 3. Exemplo de aplicação

**Padrão:** Strategy

* **Contexto:**
  O sistema possui dois perfis de usuários (`admin` e `mecanico`) cadastrados na tabela `usuarios`. O mecânico pode abrir ordens de serviço e lançar peças/mão de obra. No entanto, o sistema possui uma regra de negócio crítica: a transição da Ordem de Serviço para o status intermediário de aprovação (sinalizado pela cor **Roxa**) exige uma validação específica que impede o mecânico de fechar o caixa de forma direta, sendo esta uma atribuição exclusiva do Administrador.

* **Aplicação no projeto:**
  Isolamos as regras de validação de status da OS em estratégias separadas de acordo com o perfil logado. Quando o controlador de ordens de serviço (`OSController.js`) recebe uma requisição de atualização, ele delega a validação para a estratégia correspondente. Se o perfil for `mecanico` e tentar mudar o status direto para "Finalizada" sem passar pela trava de aprovação do orçamento, o sistema barra a operação.

* **Benefício esperado:**
  Elimina o acoplamento de código e a duplicação de validações nas rotas. Se futuramente a oficina criar um novo perfil (ex: "Gerente" ou "Atendente"), basta criar uma nova classe ou função de estratégia de validação sem alterar o código base que já funciona para o Mecânico e Admin.

---

## 4. Alternativas consideradas

| Alternativa | Motivo para não adoção |
| :--- | :--- |
| **Criar novas conexões MySQL por requisição** | Sobrecarregaria o servidor `10.4.32-MariaDB` em cenários de uso real por múltiplos mecânicos no pátio simultaneamente, reduzindo drasticamente a performance do sistema. |
| **Lógica de Status Fixa no Frontend** | Deixar as validações de transição de status da OS apenas no React (via JavaScript do cliente) comprometeria a segurança do sistema, pois um usuário mal-intencionado poderia burlar a interface e alterar o banco diretamente. |

---

## 5. Conclusão
A aplicação dos padrões de projeto selecionados eleva a maturidade técnica do sistema da oficina mecânica. O **Singleton** garante a eficiência no uso do banco de dados; o **Observer** entrega uma interface fluida e de excelente usabilidade para o usuário final; e o **Strategy** blinda as regras de negócio contra falhas humanas e acessos indevidos. Juntos, esses padrões asseguram que o software seja flexível o suficiente para sofrer manutenções e evoluções sem gerar impactos negativos na arquitetura existente.
