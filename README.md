# PromoZone

A modern full-stack application for promotion management built with Vue.js 3 and NestJS.

## Project Structure

This project is divided into two main parts:

```
promozone/
├── backend/          # NestJS GraphQL API
├── frontend/         # Vue.js 3 application with Vuetify
└── README.md         # This file
```

## Technology Stack

### Backend
- **NestJS**: Modern Node.js framework
- **GraphQL**: API with auto-generated schema
- **TypeORM**: Database ORM with PostgreSQL/SQLite support
- **TypeScript**: Type-safe development

### Frontend
- **Vue.js 3**: Progressive JavaScript framework
- **Vuetify**: Material Design component library
- **TypeScript**: Type-safe development
- **GraphQL Code Generator**: Auto-generated types and composables

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (optional, SQLite is default)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database configuration
```

4. Start development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000` with GraphQL Playground at `http://localhost:3000/graphql`.

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Generate GraphQL types:
```bash
npx graphql-codegen --config codegen.yml
```

4. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Features

### Current Features
- ✅ User management (CRUD operations)
- ✅ GraphQL API with auto-generated schema
- ✅ Flexible database configuration (PostgreSQL/SQLite)
- ✅ Type-safe development with TypeScript
- ✅ Modern UI with Vuetify components

### Planned Features
- 🔄 Role-Based Access Control (RBAC)
- 🔄 Product management
- 🔄 Promotion system
- 🔄 Multi-tenancy support
- 🔄 User profiles and authentication

## Language Standards

**This project enforces English as the mandatory language for all code and documentation.**

Please refer to [CODING_STANDARDS.md](./CODING_STANDARDS.md) for detailed language requirements and coding standards.

### Key Requirements:
- All code (variables, functions, classes, comments) must be in English
- Error messages and validation text must be in English
- Documentation and README files must be in English
- Database schema elements must use English naming

The only exception is direct communication with stakeholders in their preferred language.

## Development Guidelines

### Code Conventions
- **ALL CODE MUST BE WRITTEN IN ENGLISH**: Variable names, function names, documentation, etc.
- **NO CODE COMMENTS ALLOWED**: Code must be self-documenting through descriptive naming
- Use TypeScript for strong typing
- Follow established patterns in each respective framework

### GraphQL Development
- Always use `npx graphql-codegen` to generate types
- Organize queries in `frontend/src/graphql/queries/`
- Organize mutations in `frontend/src/graphql/mutations/`

### Backend Development
- Use NestJS decorators for guards and validations
- Implement permission validation in resolvers
- Follow naming pattern: `entity.resolver.ts`, `entity.service.ts`

## Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md) (when available)

## License

This project is [MIT licensed](LICENSE).
