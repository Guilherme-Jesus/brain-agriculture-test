# Frontend - Brain Agriculture

![Status](https://img.shields.io/badge/status-Concluído-blue)

Esta é a aplicação de frontend para o projeto Brain Agriculture. Desenvolvida com **React**, ela fornece a interface de usuário para interagir com a API, permitindo o cadastro e gerenciamento de produtores, fazendas e culturas, além de exibir um dashboard analítico.

---

## ✨ Stack de Tecnologias

- **Framework:** [React](https://react.dev/) com [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Gerenciamento de Estado e Cache:** [Redux Toolkit](https://redux-toolkit.js.org/) com [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Estilização:** [Styled Components](https://styled-components.com/) (CSS-in-JS)
- **Formulários:** [React Hook Form](https://react-hook-form.com/) com [Zod](https://zod.dev/) para validação de esquemas.
- **Testes:** [Vitest](https://vitest.dev/) e [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Roteamento:** [React Router DOM](https://reactrouter.com/)
- **Arquitetura:** Atomic Design (com abordagem híbrida de feature-colocation)

---

## 🚀 Rodando o Projeto Localmente

**Pré-requisitos:**

- [Node.js](https://nodejs.org/) (v20 ou superior)
- A API do backend deve estar rodando (veja o README principal ou do backend).

**Passos para Execução:**

**1. Navegue até a pasta do frontend**
A partir da raiz do projeto (`/brain-agriculture-test`):

```bash
cd frontend
```

**2. Instale as Dependências**

```bash
npm install
```

**3. Inicie o Servidor de Desenvolvimento**

```bash
npm run dev
```

### Acesso à Aplicação

A aplicação estará disponível em: http://localhost:5173

---

## 🧪 Executando os Testes

O projeto utiliza Vitest e React Testing Library para testes unitários e de componentes, garantindo a confiabilidade da interface.

Para rodar todos os testes no terminal:

```bash
npm run test
```

---

## 🏗️ Estrutura do Projeto

A arquitetura do frontend segue uma abordagem híbrida do Atomic Design, priorizando a coesão de features (feature-colocation).

- `/src/components`: Contém componentes reutilizáveis e genéricos, divididos por complexidade (atoms, molecules, organisms, templates).
- `/src/pages`: Contém as features da aplicação. Cada pasta de feature (ex: PlantedCrops) agrupa todos os seus componentes específicos (página, formulários, listas) e estilos, promovendo alta coesão.
- `/src/store`: Configuração do Redux Toolkit, incluindo a definição da API (RTK Query) e slices de estado.
- `/src/schemas`: Contém os esquemas de validação do Zod, desacoplando as regras de negócio dos componentes.
- `/src/styles`: Estilos globais e configuração de tema para o Styled Components.
- `/src/test`: Configurações globais e utilitários para os testes.

```
frontend/src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── ...
├── pages/
│   ├── Dashboard/
│   ├── Farms/
│   ├── PlantedCrops/
│   │   ├── index.tsx             # A Página (Orquestrador)
│   │   ├── PlantedCropForm.tsx   # O Organismo de Formulário
│   │   └── PlantedCropsList.tsx  # O Organismo de Lista
│   └── Producers/
├── schemas/
├── store/
│   └── api/
├── styles/
└── test/
```

---

## 🔧 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento com hot-reload
npm run dev

# Compila o projeto para produção
npm run build

# Executa os testes unitários e de componentes
npm run test

# Inicia o linter para análise estática do código
npm run lint
```

---

## 👤 Autor

Guilherme Couto
