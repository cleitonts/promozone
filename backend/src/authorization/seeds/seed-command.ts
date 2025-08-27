import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { AuthorizationSeedService } from './authorization.seed';

/**
 * Comando para executar os seeds de autorização
 * Uso: npm run seed:authorization
 */
async function runAuthorizationSeeds() {
  console.log('🚀 Iniciando aplicação para executar seeds...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const seedService = app.get(AuthorizationSeedService);
    await seedService.seedAll();
    console.log('\n🎉 Seeds de autorização executados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runAuthorizationSeeds();
}

export { runAuthorizationSeeds };