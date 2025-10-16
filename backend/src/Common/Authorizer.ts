import { Injectable } from '@nestjs/common';
import { CustomAuthorizer } from '@ptc-org/nestjs-query-graphql';
import { Filter } from '@ptc-org/nestjs-query-core';

type AuthenticatedUser = { id: number; username: string };
export type UserContext = { req: { user: AuthenticatedUser } };

@Injectable()
export class Authorizer<T> implements CustomAuthorizer<T> {
  authorize(context: UserContext): Promise<Filter<T>> {
    return Promise.resolve({ ownerId: { eq: context.req.user.id } }) as unknown as Promise<Filter<T>>;
  }

  authorizeRelation(relationName: string, context: UserContext): Promise<Filter<T>> {
    if (relationName === 'todoItem') {
      return Promise.resolve({ ownerId: { eq: context.req.user.id } }) as unknown as Promise<Filter<T>>;
    }
    return Promise.resolve({}) as unknown as Promise<Filter<T>>;
  }
}