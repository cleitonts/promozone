import { CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export function createModuleContextGuard(moduleName: string): Type<CanActivate> {
  @Injectable()
  class ModuleContextGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const ctx = GqlExecutionContext.create(context)
      const req = ctx.getContext().req as Record<string, unknown> | undefined
      if (req) {
        ;(req as Record<string, unknown>).moduleName = moduleName
      }
      return true
    }
  }

  return mixin(ModuleContextGuard)
}