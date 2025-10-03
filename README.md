# Brain Agriculture - Desafio Técnico Fullstack

![Status](https://img.shields.io/badge/status-Concluído%20e%20Deploy%20Realizado-brightgreen)

Projeto fullstack desenvolvido como parte do desafio técnico da **Brain Agriculture**. A aplicação consiste em um sistema para gerenciamento de produtores rurais, suas fazendas e as culturas plantadas, culminando em um dashboard com dados agregados.

---

## 🚀 Aplicação no Ar (Live Demo)

A aplicação está hospedada e pode ser acessada pelos links abaixo:

-   **🖥️ Frontend (Vercel):** **[Clique aqui para acessar a aplicação](https://brain-agriculture-test-seven.vercel.app/)**
-   **⚙️ Backend API Docs (Render):** **[Clique aqui para acessar a documentação da API](https://brain-agriculture-api-c5cj.onrender.com/api-docs)**

*(Observação: O plano gratuito do Render pode fazer o backend "dormir" após um período de inatividade. O primeiro acesso à API pode levar até 30 segundos para carregar.)*

---

## ✨ Tecnologias Principais

-   **Backend:** Node.js, NestJS, TypeScript, TypeORM, PostgreSQL, Jest
-   **Frontend:** React, TypeScript, Vite, Redux Toolkit (com RTK Query), Styled Components, React Hook Form, Zod, Vitest
-   **Infraestrutura:** Docker, Vercel (Frontend Hosting), Render (Backend & Database Hosting)

---

##  LOCAL: Rodando o Projeto Completo

Para executar o projeto em sua máquina local, siga os passos abaixo.

**Pré-requisitos:**
-   [Node.js](https://nodejs.org/) (v20+)
-   [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose

**Passos:**

1.  **Clone o repositório** e entre na pasta.

2.  **Inicie o Backend e o Banco de Dados com Docker:**
    ```bash
    # Na raiz do projeto, use o compose de desenvolvimento
    docker-compose -f docker-compose.dev.yml up --build
    ```
    Isso iniciará a API na porta `3000` e o banco de dados local.

3.  **Inicie o Frontend:**
    ```bash
    # Em um novo terminal, navegue até a pasta do frontend
    cd frontend

    # Instale as dependências
    npm install

    # Inicie o servidor de desenvolvimento
    npm run dev
    ```

**Acesso Local:**
-   **Frontend:** `http://localhost:5173`
-   **Backend (API):** `http://localhost:3000`
- **Documentação da API (Swagger):** `http://localhost:3000/api-docs`


---

## 🏛️ Estrutura do Projeto

Este repositório está organizado como um monorepo:

-   **`/backend`**: Contém a API RESTful. Para detalhes sobre seus endpoints, testes e arquitetura, acesse o **[README do Backend](./backend/README.md)**.

-   **`/frontend`**: Contém a interface do usuário em React. Para detalhes sobre a arquitetura de componentes, testes e scripts, acesse o **[README do Frontend](./frontend/README.md)**.

---

## 👤 Autor

**Guilherme Couto**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilhermehcj/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Guilherme-Jesus)