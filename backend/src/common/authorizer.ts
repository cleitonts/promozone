import { Injectable } from '@nestjs/common';
import { AuthorizationContext, CustomAuthorizer } from '@ptc-org/nestjs-query-graphql';
import { Filter } from '@ptc-org/nestjs-query-core';
import { IUserPayloadResponse } from '@/authorization/auth.interface';

export type UserContext = { req: { user: IUserPayloadResponse } };

@Injectable()
export class Authorizer<T> implements CustomAuthorizer<T> {
  authorize(context: UserContext, authorizationContext?: AuthorizationContext): Promise<Filter<T>> {
    if (authorizationContext?.readonly) {
      return Promise.resolve({});
    }

    return Promise.resolve({ ownerId: { eq: context.req.user.userId } }) as unknown as Promise<Filter<T>>;
  }

  authorizeRelation(relationName: string, context: UserContext): Promise<Filter<T>> {
    if (relationName === 'todoItem') {
      return Promise.resolve({ ownerId: { eq: context.req.user.userId } }) as unknown as Promise<Filter<T>>;
    }
    return Promise.resolve({}) as unknown as Promise<Filter<T>>;
  }
}