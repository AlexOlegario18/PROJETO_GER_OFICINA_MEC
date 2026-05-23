# 08. Testes

## 👥 Equipe
* Alexsander Davi Naves Olegário
* Edson Mateus Gonçalves
* Maria Lina da Silva
* Lucas de Jesus Gonçalves
* Pedro Otavio de Carvalho Nunes

---

## 1. Estratégia de testes

A equipe validará a solução "Gestão de Oficina 2.0" de forma híbrida. Os testes de backend (API e persistência MySQL) serão validados via Postman para garantir o cumprimento das regras de negócio e travas de segurança. A interface em React será validada por meio de testes funcionais manuais e caixa-preta, focando na usabilidade, reatividade dos estados e renderização correta das cores de status.

### Objetivos
* Verificar se os requisitos foram atendidos;
* Identificar falhas;
* Garantir qualidade mínima do incremento.

---

## 2. Tipos de teste previstos

| Tipo de teste | Objetivo | Evidência esperada |
| :--- | :--- | :--- |
| **Teste funcional** | Validar se as regras de transição de status da OS funcionam. | Casos de teste executados e aprovação dos fluxos. |
| **Teste de interface** | Verificar a reatividade das cores (Status Roxo) e filtros. | Capturas de tela do Dashboard e comportamento dos componentes. |
| **Teste de integração** | Validar se a API Node.js grava e altera os dados corretamente no MySQL. | Registro de requisições HTTP e checagem de tabelas. |
| **Teste exploratório** | Identificar falhas não previstas ao forçar ações simultâneas. | Relato de problemas e abertura de bugs no backlog. |

---

## 3. Casos de teste

| ID | Requisito relacionado | Cenário | Entrada | Resultado esperado | Resultado obtido |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT01** | RF01 (Status Roxo) | Mecânico tenta avançar OS para revisão | Clique no botão "Concluir Serviço" na tela do mecânico. | A OS deve mudar para o status "Aguardando Aprovação" e o card deve ficar roxo no painel. | **Sucesso:** O estado foi alterado no React e a cor roxa foi renderizada com sucesso. |
| **CT02** | RF02 (Persistência) | Cadastro de nova OS com peças e serviços | Payload com `id_veiculo`, lista de peças e valores de mão de obra. | Os dados devem ser gravados nas tabelas associativas do MySQL calculando o valor total. | **Sucesso:** Registro persistido com integridade referencial e chaves estrangeiras. |
| **CT03** | RF01 (Segurança) | Usuário tenta burlar o fluxo saltando status | Requisição direta via Postman de "Em Andamento" para "Finalizada". | A API deve bloquear a requisição e retornar erro `400 Bad Request`. | **Sucesso:** A trava do backend impediu a finalização sem auditoria. |
| **CT04** | RF03 (Filtros) | Administrador busca veículo por placa no painel | Digitar a placa "ABC-1234" no campo de busca do Dashboard. | A tela deve ocultar as outras ordens e exibir apenas a OS do veículo buscado. | **Sucesso:** Filtro reativo atualizou a listagem instantaneamente. |

---

## 4. Critérios de aceitação dos testes

* Os testes devem estar alinhados aos requisitos (bloqueios de status e filtros de busca);
* Cada funcionalidade essencial (Mudança para Roxo, Bloqueio de Fechamento e Busca) deve ter evidência;
* Falhas identificadas devem ser registradas na seção de defeitos.

---

## 5. Registro de defeitos

| ID | Defeito | Severidade | Status | Ação tomada |
| :--- | :--- | :--- | :--- | :--- |
| **BUG01** | API permitia que mecânico forçasse o status "Finalizada" alterando o payload. | **Alta** | Corrigido | Adicionada validação por middleware no backend para rejeitar a transição direta. |
| **BUG02** | O card de "Aguardando Aprovação" piscava em azul antes de fixar na cor roxa. | **Média** | Corrigido | Ajustado o ciclo de vida do componente React (`useEffect`) para carregar o status correto logo no primeiro render. |

---

## 6. Evidências

* **Capturas de tela:** [Inserir aqui os prints das telas do sistema que vocês tirarem amanhã (ex: tela roxa e filtros)]
* **Links para execução:** Projeto executado localmente em ambiente de desenvolvimento (`localhost:3000`).
* **Registros em issues:** Vinculados às issues `#3` ([FEATURE] Refinamento da Interface e UX) e `#4` (Modelagem e Testes).

---

## 7. Exemplo resumido

O requisito **RF01 (Mudança de status e alerta visual)** será validado por meio do caso de teste **CT01**, no qual o mecânico realiza a conclusão de uma atividade prática na oficina, forçando o sistema a mover a Ordem de Serviço para o estado intermediário e obrigatório de "Aguardando Aprovação", sinalizado visualmente pela cor roxa no painel do administrador.# 08. Testes

## 👥 Equipe
* Alexsander Davi Naves Olegário
* Edson Mateus Gonçalves
* Maria Lina da Silva
* Lucas de Jesus Gonçalves
* Pedro Otavio de Carvalho Nunes

---

## 1. Estratégia de testes

A equipe validará a solução "Gestão de Oficina 2.0" de forma híbrida. Os testes de backend (API e persistência MySQL) serão validados via Postman para garantir o cumprimento das regras de negócio e travas de segurança. A interface em React será validada por meio de testes funcionais manuais e caixa-preta, focando na usabilidade, reatividade dos estados e renderização correta das cores de status.

### Objetivos
* Verificar se os requisitos foram atendidos;
* Identificar falhas;
* Garantir qualidade mínima do incremento.

---

## 2. Tipos de teste previstos

| Tipo de teste | Objetivo | Evidência esperada |
| :--- | :--- | :--- |
| **Teste funcional** | Validar se as regras de transição de status da OS funcionam. | Casos de teste executados e aprovação dos fluxos. |
| **Teste de interface** | Verificar a reatividade das cores (Status Roxo) e filtros. | Capturas de tela do Dashboard e comportamento dos componentes. |
| **Teste de integração** | Validar se a API Node.js grava e altera os dados corretamente no MySQL. | Registro de requisições HTTP e checagem de tabelas. |
| **Teste exploratório** | Identificar falhas não previstas ao forçar ações simultâneas. | Relato de problemas e abertura de bugs no backlog. |

---

## 3. Casos de teste

| ID | Requisito relacionado | Cenário | Entrada | Resultado esperado | Resultado obtido |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CT01** | RF01 (Status Roxo) | Mecânico tenta avançar OS para revisão | Clique no botão "Concluir Serviço" na tela do mecânico. | A OS deve mudar para o status "Aguardando Aprovação" e o card deve ficar roxo no painel. | **Sucesso:** O estado foi alterado no React e a cor roxa foi renderizada com sucesso. |
| **CT02** | RF02 (Persistência) | Cadastro de nova OS com peças e serviços | Payload com `id_veiculo`, lista de peças e valores de mão de obra. | Os dados devem ser gravados nas tabelas associativas do MySQL calculando o valor total. | **Sucesso:** Registro persistido com integridade referencial e chaves estrangeiras. |
| **CT03** | RF01 (Segurança) | Usuário tenta burlar o fluxo saltando status | Requisição direta via Postman de "Em Andamento" para "Finalizada". | A API deve bloquear a requisição e retornar erro `400 Bad Request`. | **Sucesso:** A trava do backend impediu a finalização sem auditoria. |
| **CT04** | RF03 (Filtros) | Administrador busca veículo por placa no painel | Digitar a placa "ABC-1234" no campo de busca do Dashboard. | A tela deve ocultar as outras ordens e exibir apenas a OS do veículo buscado. | **Sucesso:** Filtro reativo atualizou a listagem instantaneamente. |

---

## 4. Critérios de aceitação dos testes

* Os testes devem estar alinhados aos requisitos (bloqueios de status e filtros de busca);
* Cada funcionalidade essencial (Mudança para Roxo, Bloqueio de Fechamento e Busca) deve ter evidência;
* Falhas identificadas devem ser registradas na seção de defeitos.

---

## 5. Registro de defeitos

| ID | Defeito | Severidade | Status | Ação tomada |
| :--- | :--- | :--- | :--- | :--- |
| **BUG01** | API permitia que mecânico forçasse o status "Finalizada" alterando o payload. | **Alta** | Corrigido | Adicionada validação por middleware no backend para rejeitar a transição direta. |
| **BUG02** | O card de "Aguardando Aprovação" piscava em azul antes de fixar na cor roxa. | **Média** | Corrigido | Ajustado o ciclo de vida do componente React (`useEffect`) para carregar o status correto logo no primeiro render. |

---

## 6. Evidências

* **Capturas de tela:** [Inserir aqui os prints das telas do sistema que vocês tirarem amanhã (ex: tela roxa e filtros)]
* **Links para execução:** Projeto executado localmente em ambiente de desenvolvimento (`localhost:3000`).
* **Registros em issues:** Vinculados às issues `#3` ([FEATURE] Refinamento da Interface e UX) e `#4` (Modelagem e Testes).

---

## 7. Exemplo resumido

O requisito **RF01 (Mudança de status e alerta visual)** será validado por meio do caso de teste **CT01**, no qual o mecânico realiza a conclusão de uma atividade prática na oficina, forçando o sistema a mover a Ordem de Serviço para o estado intermediário e obrigatório de "Aguardando Aprovação", sinalizado visualmente pela cor roxa no painel do administrador.
