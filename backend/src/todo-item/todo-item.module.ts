import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql'
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm'
import { Module } from '@nestjs/common'
import { TodoItemCreateDTO } from './todo-item.create.dto'
import { TodoItemDTO } from './todo-item.dto'
import { TodoItemEntity } from './todo-item.entity'
import { JwtAuthGuard } from '@/authorization/guards/jwt-auth.guard'
import { buildResolverOperationNames } from '@/common/graphql-name.util'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity])],
      resolvers: [
        {
          EntityClass: TodoItemEntity,
          DTOClass: TodoItemDTO,
          CreateDTOClass: TodoItemCreateDTO,
          ...buildResolverOperationNames('TodoItem', 'TodoItems', [JwtAuthGuard]),
        },
      ],
    }),
  ],
})
export class TodoItemModule {}