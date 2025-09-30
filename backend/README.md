# API - Brain Agriculture

Esta é a API RESTful para o projeto Brain Agriculture, desenvolvida com **NestJS**.

A API é responsável por toda a lógica de negócio, incluindo o gerenciamento de produtores, fazendas, culturas e safras, além de fornecer dados agregados para o dashboard.

---

## 🛠️ Stack de Tecnologias

- **Framework:** [NestJS](https://nestjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) com [Docker](https://www.docker.com/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Testes:** [Jest](https://jestjs.io/) (Testes Unitários e de Integração/E2E)
- **Documentação:** [Swagger (OpenAPI)](https://swagger.io/)
- **Validação:** `class-validator` e validadores customizados.

---

## 🚀 Rodando o Projeto Localmente

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento da API. Todos os comandos devem ser executados a partir da **raiz do projeto** (`/brain-agriculture-test`).

### **Pré-requisitos**

- [Node.js](https://nodejs.org/) (v20 ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose

### **Passos para Execução**

**1. Clone o Repositório (se ainda não o fez)**

```bash
git clone https://github.com/Guilherme-Jesus/brain-agriculture-test.git
cd brain-agriculture-test
```

**2. Configure as Variáveis de Ambiente**
O projeto usa um arquivo .env para as configurações do banco de dados.

```bash
# Na raiz do projeto, copie o arquivo de exemplo
cp .env.example .env
```

O arquivo .env já vem com valores padrão para o ambiente Docker e não precisa de alterações para rodar localmente.

**3. Inicie os Serviços com Docker Compose**
Este comando irá construir a imagem do backend e iniciar os containers do NestJS e do Postgres em modo de desenvolvimento (com hot-reload).

```bash
docker-compose up --build
```

Use `--build` na primeira vez ou sempre que o Dockerfile ou package.json forem alterados.

Para iniciar nos próximos usos, basta `docker-compose up`.

Para parar os containers, pressione `Ctrl + C` no terminal.

### **Acesso à Aplicação**

- **URL Base da API:** http://localhost:3000
- **Documentação Interativa (Swagger):** http://localhost:3000/api-docs

Ao acessar a URL raiz, você será redirecionado para a documentação do Swagger, onde poderá explorar e testar todos os endpoints.

---

## 🧪 Executando os Testes

A aplicação possui uma suíte de testes unitários e de integração para garantir a qualidade do código.

**Para rodar todos os testes (unitários e E2E):**

```bash
# Navegue até a pasta do backend
cd backend

# Rode o comando de teste
npm run test
```

**Para rodar apenas os testes E2E:**

```bash
# Na pasta backend
npm run test:e2e
```

**Para gerar o relatório de cobertura de testes:**

```bash
# Na pasta backend
npm run test:cov
```

O relatório será gerado na pasta `/backend/coverage`.

---

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI em:

- **Desenvolvimento:** http://localhost:3000/api-docs

A documentação inclui:

- Descrição de todos os endpoints
- Parâmetros de entrada e saída
- Exemplos de requisições e respostas
- Testes interativos dos endpoints

---

## 🏗️ Estrutura do Projeto

```
backend/
├── dist/                 # Código compilado
├── src/
│   ├── cultures/         # Módulo de culturas
│   ├── dashboard/        # Módulo do dashboard
│   ├── farms/            # Módulo de fazendas
│   ├── harvests/         # Módulo de safras
│   ├── planted-crops/    # Módulo de culturas plantadas
│   ├── producers/        # Módulo de produtores
│   ├── common/           # Filtros e utilitários comuns
│   └── utils/            # Utilitários e validadores
├── test/                 # Testes E2E
├── Dockerfile            # Configuração do Docker
└── package.json          # Dependências e scripts
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev        # Inicia em modo desenvolvimento
npm run start:prod       # Inicia em modo produção

# Testes
npm run test             # Executa testes unitários
npm run test:e2e         # Executa testes E2E
npm run test:cov         # Gera relatório de cobertura

# Build
npm run build            # Compila o projeto
npm run start            # Inicia a aplicação compilada
```

---

## 👤 Autor

**Guilherme Couto**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilhermehcj/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Guilherme-Jesus)
