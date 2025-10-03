# Brain Agriculture - Desafio Técnico Fullstack

![Status Backend](https://img.shields.io/badge/status-Backend%20Concluído-brightgreen)
![Status Frontend](https://img.shields.io/badge/status-Frontend%20Concluído-blue)

Projeto fullstack desenvolvido como parte do desafio técnico da **Brain Agriculture**. A aplicação consiste em um sistema para gerenciamento de produtores rurais, suas fazendas e as culturas plantadas, culminando em um dashboard com dados agregados.

---

## 🚀 Rodando o Projeto Completo (Fullstack)

A maneira mais simples de executar toda a aplicação (Backend + Banco de Dados) é utilizando o Docker.

**Pré-requisitos:**

- [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose

**Passos:**

1.  **Clone o repositório** e entre na pasta.
2.  **Configure as variáveis de ambiente** do backend:
    ```bash
    # Na raiz do projeto, copie o arquivo de exemplo
    cp .env.example .env
    ```
3.  **Inicie os serviços com Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    Isso iniciará o container da API NestJS na porta `3000` e o banco de dados Postgres.

4.  **Inicie o Frontend separadamente:**

    ```bash
    # Em um novo terminal, navegue até a pasta do frontend
    cd frontend

    # Instale as dependências
    npm install

    # Inicie o servidor de desenvolvimento
    npm run dev
    ```

**Acesso:**

- **Frontend (Aplicação):** `http://localhost:5173`
- **Backend (API):** `http://localhost:3000`
- **Documentação da API (Swagger):** `http://localhost:3000/api-docs`

---

## 🏛️ Estrutura do Projeto

Este repositório está organizado como um monorepo, contendo os projetos de backend e frontend:

- **`/backend`**: Contém a API RESTful desenvolvida em **NestJS**. A API é responsável por todas as regras de negócio, validações e persistência de dados. Para instruções detalhadas, acesse o **[README do Backend](./backend/README.md)**.

- **`/frontend`**: Contém a aplicação de interface do usuário desenvolvida em **React**. O frontend consome a API para fornecer uma experiência interativa para o gerenciamento dos dados e visualização do dashboard. Para instruções detalhadas, acesse o **[README do Frontend](./frontend/README.md)**.

---

## ✨ Tecnologias Principais

- **Backend:** Node.js, NestJS, TypeScript, TypeORM, Jest
- **Frontend:** React, TypeScript, Vite, Redux Toolkit (com RTK Query), Styled Components, React Hook Form, Zod, Vitest, React Testing Library
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker

---

## 👤 Autor

### **Guilherme Couto**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilhermehcj/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Guilherme-Jesus)
