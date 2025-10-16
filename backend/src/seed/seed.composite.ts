import { Injectable, INestApplicationContext } from '@nestjs/common'
import { ModulesContainer, ModuleRef } from '@nestjs/core'
import { SEEDER } from '@/seed/seed.token'

@Injectable()
export class SeedComposite {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly modulesContainer: ModulesContainer,
  ) {}

  async run(app: INestApplicationContext): Promise<void> {
    for (const [, module] of this.modulesContainer.entries()) {
      const provider: any = (module as any).providers?.get?.(SEEDER)
      const instance = provider?.instance
      if (instance && typeof instance.run === 'function') {
        await instance.run()
      }
    }
  }
}