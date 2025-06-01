# To-Do API - Desafio Técnico Backend

API REST para gerenciamento de tarefas pessoais, desenvolvida em NestJS + TypeScript.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) (TypeScript)
- [TypeORM](https://typeorm.io/) + SQLite (para desenvolvimento/teste local)
- [JWT](https://jwt.io/) (JSON Web Tokens)
- [Passport](https://www.passportjs.org/) + `passport-jwt` para autenticação
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) para hashing de senhas
- [Swagger](https://swagger.io/) + `swagger-ui-express` para documentação
- [class-validator](https://github.com/typestack/class-validator) e [class-transformer](https://github.com/typestack/class-transformer) para validação de dados e DTOs
- [dotenv](https://github.com/motdotla/dotenv) para variáveis de ambiente
- Jest para testes unitários
- Logger do NestJS para logs estruturados
- Postman para testes manuais

---

## 📦 Como rodar o projeto localmente

**Pré-requisitos:**
- Node.js (versão recomendada 18+)
- npm (gerenciador de pacotes)
- NestJS CLI (opcional, mas útil: `npm i -g @nestjs/cli`)

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <seu-repo>
   cd backend-challenge
   ```

2. **Instale as dependências:**
   ```bash
   npm install # ou npm i
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto (`backend-challenge`).
   - Copie o conteúdo de `.env.example` para `.env` e ajuste os valores conforme necessário.
   - Exemplo de `.env`:
     ```
     JWT_SECRET=uma_chave_secreta_segura
     DB_PATH=db.sqlite
     ```

4. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run start:dev
   ```
   O servidor estará rodando em `http://localhost:3000`.

---

## 🧪 Testando a API e Executando Testes

### **Testando Endpoints (Swagger / Postman)**
- Com o servidor rodando, acesse a documentação interativa do Swagger em: [http://localhost:3000/api](http://localhost:3000/api)
- Você pode usar o Swagger ou ferramentas como Postman/Insomnia para testar os endpoints.
- Para endpoints protegidos (como as tarefas), obtenha um token fazendo login (`POST /auth/login`) e use-o no header `Authorization: Bearer SEU_TOKEN_AQUI`.
- Uma coleção de Postman pode ser encontrada no arquivo `postman_collection.json` na raiz deste projeto (se aplicável).

### **Executando Testes Unitários**
- Para rodar os testes unitários (implementados para Tasks, Auth e Users Services):
  ```bash
  npm run test
  ```
- Para rodar em modo watch (monitora arquivos e roda testes automaticamente ao salvar):
  ```bash
  npm run test:watch
  ```
- Para ver a cobertura de testes:
  ```bash
  npm run test:cov
  ```

---

## 🔑 Endpoints principais

### **Autenticação**
- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login de usuário

### **Tarefas (protegidas por JWT)**
- `GET /tasks` — Listar tarefas do usuário logado (`GET /tasks?status=completed` para filtrar)
- `POST /tasks` — Criar tarefa
- `GET /tasks/:id` — Buscar tarefa por ID
- `PUT /tasks/:id` — Atualizar tarefa
- `DELETE /tasks/:id` — Excluir tarefa (soft delete)

---

## 🛠️ Decisões técnicas

- **NestJS:** Escolhido por sua arquitetura robusta, modular e facilidades com decorators e injeção de dependência, ideal para aplicações escaláveis.
- **TypeORM + SQLite:** Utilizado para a camada de acesso a dados. SQLite é ótimo para desenvolvimento local pela sua simplicidade e ausência de necessidade de um servidor de banco de dados externo. Em produção, seria recomendado um DB como PostgreSQL ou MySQL.
- **JWT e Passport:** Padrão de mercado para autenticação em APIs RESTful, garantindo segurança e statelessness.
- **bcryptjs:** Biblioteca segura para hashing de senhas, protegendo as credenciais dos usuários.
- **Validação de Dados:** Implementada utilizando `class-validator` e DTOs, garantindo que os dados recebidos estejam no formato esperado e sejam válidos.
- **Soft Delete:** Aplicado na exclusão de tarefas, mantendo o registro histórico no banco de dados em vez de remover fisicamente.
- **CORS:** Configurado especificamente para permitir requisições do frontend rodando em `http://localhost:8080` (pode ser ajustado em `src/main.ts`).
- **Testes Unitários:** Adicionados para as camadas de serviço principais, garantindo a lógica de negócio.
- **Logs Estruturados:** Implementados com o Logger do NestJS para melhor rastreamento e debug.

---

## 💡 Possíveis Próximos Passos e Melhorias

Este projeto já implementa as funcionalidades básicas do desafio, além de testes unitários, logs estruturados e documentação Swagger. Para ir além, algumas melhorias futuras podem incluir:

-   **Testes End-to-End (E2E):** Adicionar testes que simulam o fluxo completo do usuário através dos endpoints.
-   **Migrations do Banco de Dados:** Em vez de usar `synchronize: true`, criar scripts de migration para gerenciar as alterações no schema do banco de forma controlada.
-   **Tratamento de Erros Mais Granular:** Implementar handlers de exceção globais ou mais específicos para casos de erro, retornando mensagens padronizadas e úteis.
-   **Implementar Paginação e Filtros Avançados:** Para a listagem de tarefas, adicionar opções de paginação e filtros mais complexos além do status.
-   **Otimizações de Performance:** Analisar e otimizar consultas ao banco de dados ou gargalos na aplicação.
-   **Segurança Adicional:** Explorar tópicos como rate limiting, validação de input mais rigorosa, etc.
-   **Configuração para Produção:** Preparar o projeto para deploy em um ambiente de produção (ajustes no CORS, variáveis de ambiente, logs para arquivo, etc.).
-   **Integração com um Frontend:** Desenvolver uma interface web simples para consumir a API.

---

## 📄 Exemplo de .env

```
JWT_SECRET=uma_chave_secreta_segura
DB_PATH=db.sqlite
```

---

**Dúvidas?**  
Abra uma issue ou entre em contato!
