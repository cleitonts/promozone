import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SeedComposite } from '@/seed/seed.composite'

async function runAllSeeds(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule)
  const composite = app.get(SeedComposite)
  await composite.run(app)
  await app.close()
}

void runAllSeeds()