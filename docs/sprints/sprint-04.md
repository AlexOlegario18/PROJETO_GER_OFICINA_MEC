### 🚀 Sprint 4 (Atual/Finalizada)
* **Meta da sprint:** Mover o sistema para a nuvem (Banco e Aplicação) e realizar o deploy definitivo com segurança ponta a ponta.
* **Itens planejados:**
  * Configurar banco de dados MySQL na nuvem (Aiven).
  * Realizar o deploy do Frontend e Backend na Vercel via CLI.
  * Resolver problemas de TLS/SSL entre a infraestrutura Serverless e a nuvem gerenciada.
* **Itens entregues:**
  * Banco de dados MySQL instanciado na **Aiven**.
  * Aplicações web publicadas com sucesso nos domínios da Vercel.
  * Correção do arquivo `config/db.js` para exigir segurança SSL estrita (`rejectUnauthorized: false`) e parametrização correta das credenciais de acesso para o fluxo de autenticação.
* **Dificuldades encontradas:** Erros de conexão em produção (como Erro 401 e Invalid URL nos logs) causados por incompatibilidade da Vercel (Serverless) com pools de conexão tradicionais do MySQL e a exigência estrita de SSL por parte da Aiven.
* **Aprendizados:** Resolução de problemas complexos de infraestrutura de nuvem, análise de Logs em tempo real no painel da Vercel e configuração de conexões seguras em ambientes distribuídos.
