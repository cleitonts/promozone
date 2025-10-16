# Seed Guide

This guide explains how to create, export, and run seed data in the backend (NestJS + TypeORM) using the module-based discovery implemented in the project.

## Overview

- Each feature module can provide a seed service with a `run` method to populate initial data.
- Modules export their seed using a shared token so the application can discover them automatically.
- The application runs seeds on startup when the environment variable `SEED=true` is set.

## Quick Start

1. From the backend directory, run:
   
   ```bash
   npm run seed
   ```
   
   This sets `SEED=true`, starts the app, and executes all seeds exported by modules.

## How It Works

- A shared token identifies seed providers exported by modules.
- On startup, the application checks modules for that token and executes a `run()` method if present.

Key files:
- Token used to export seed providers: `backend/src/seed/seed.token.ts`
- App module discovery and execution: `backend/src/app.module.ts`
- Example seed in the authorization module: `backend/src/authorization/seed/auth.seed.ts`
- Example token export in a module: `backend/src/authorization/auth.module.ts`

## Create a Seed in Your Module

Follow these steps inside your module (e.g., `products`, `tenant`, etc.):

1. Create a seed service with a `run()` method.
   - Inject any repositories you need with `@InjectRepository` and `TypeOrmModule.forFeature([...])` in your module.
   
   Example:
   
   ```ts
   import { Injectable } from '@nestjs/common'
   import { InjectRepository } from '@nestjs/typeorm'
   import { Repository } from 'typeorm'
   import { MyEntity } from '@/my-feature/my.entity'
   
   @Injectable()
   export class SeedService {
     constructor(
       @InjectRepository(MyEntity)
       private readonly myRepo: Repository<MyEntity>,
     ) {}
     
     async run(): Promise<void> {
       const count = await this.myRepo.count()
       if (count === 0) {
         await this.myRepo.save([{ /* initial data */ }])
       }
     }
   }
   ```

2. Export your seed via the shared token.
   
   In your module file:
   
   ```ts
   import { Module } from '@nestjs/common'
   import { TypeOrmModule } from '@nestjs/typeorm'
   import { MyEntity } from './my.entity'
   import { SeedService } from './seed/seed.service'
   import { SEEDER } from '@/seed/seed.token'
   
   @Module({
     imports: [TypeOrmModule.forFeature([MyEntity])],
     providers: [
       SeedService,
       { provide: SEEDER, useExisting: SeedService },
     ],
     exports: [SEEDER],
   })
   export class MyFeatureModule {}
   ```

3. Ensure your entity repositories are available in the seed service via `TypeOrmModule.forFeature([...])` in the module.

## Run All Seeds

- Use the provided command:
  
  ```bash
  npm run seed
  ```

- This sets `SEED=true` and triggers the seed discovery in `AppModule`. Each seed service found is executed by calling its `run()` method once.

## Alternative: Standalone Seed Runner (optional)

If you prefer running seeds without starting the HTTP server, you can create a standalone application context and invoke seeds manually.

- Example entrypoint: `backend/src/seed.ts`
- Command:
  
  ```bash
  ts-node -r tsconfig-paths/register src/seed.ts
  ```
  
Adjust the script to discover or call your seed services as needed.

## Troubleshooting

- Module not found for `@/...`: verify the `tsconfig.json` path alias and `ts-node` registration.
- Repository injection error: ensure `TypeOrmModule.forFeature([...])` includes your entity in the module that declares the seed service.
- Seed not running: confirm `SEED=true` is set (the `npm run seed` command already does this).
- `run()` does nothing: check your existence conditions (e.g., `count === 0`) and test data.

## Best Practices

- Keep seeds idempotent: running multiple times should not duplicate data.
- Use descriptive and meaningful names in English for all entities, fields, and services.
- Avoid seeding sensitive production-only data; use environment checks.
- Keep seed logic simple and focused on initial bootstrapping data.