import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Attribute = {
  __typename?: 'Attribute';
  attributeValues: Array<AttributeValue>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type AttributeValue = {
  __typename?: 'AttributeValue';
  attribute: Attribute;
  attributeId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
};

export type CreatePostRequest = {
  content: Scalars['String']['input'];
  currentPrice: Scalars['Float']['input'];
  discountPercentage: Scalars['Float']['input'];
  originalPrice: Scalars['Float']['input'];
  originalUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProductDto = {
  brandId?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateRequest = {
  name: Scalars['String']['input'];
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateUserRequest = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  perfilId: Scalars['String']['input'];
};

export type EngagementResponse = {
  __typename?: 'EngagementResponse';
  percentage: Scalars['Int']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPerfil: Perfil;
  createPost: Post;
  createProduct: Product;
  createUser: User;
  login: AuthResponse;
  logout: LogoutResponse;
  refreshTokens: AuthResponse;
  removePerfil: Scalars['Boolean']['output'];
  removePost: Scalars['Boolean']['output'];
  removeProduct: Scalars['Boolean']['output'];
  updatePerfil: Perfil;
  updatePost: Post;
  updateProduct: Product;
  votePost: VoteResponse;
};


export type MutationCreatePerfilArgs = {
  createPerfilInput: CreateRequest;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostRequest;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductDto;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserRequest;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRefreshTokensArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRemovePerfilArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdatePerfilArgs = {
  id: Scalars['String']['input'];
  updatePerfilInput: UpdateRequest;
};


export type MutationUpdatePostArgs = {
  id: Scalars['String']['input'];
  updatePostInput: UpdatePostRequest;
};


export type MutationUpdateProductArgs = {
  id: Scalars['Int']['input'];
  updateProductInput: UpdateProductDto;
};


export type MutationVotePostArgs = {
  postId: Scalars['String']['input'];
  voteType: Scalars['String']['input'];
};

export type Perfil = {
  __typename?: 'Perfil';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Scalars['String']['output']>>;
  users: Array<User>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentPrice: Scalars['Float']['output'];
  discountPercentage: Scalars['Float']['output'];
  downvotes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  originalPrice: Scalars['Float']['output'];
  originalUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  upvotes: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Brand>;
  brandId?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  variants: Array<ProductVariants>;
};

export type ProductVariants = {
  __typename?: 'ProductVariants';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  product: Product;
  productId: Scalars['Int']['output'];
  sku: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllPerfis: Array<Perfil>;
  findAllPosts: Array<Post>;
  findOnePerfil: Perfil;
  findOnePost: Post;
  getPerfilPermissions: Array<Scalars['String']['output']>;
  getPostEngagement: EngagementResponse;
  product: Product;
  products: Array<Product>;
  user: User;
  users: Array<User>;
};


export type QueryFindOnePerfilArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOnePostArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPostEngagementArgs = {
  postId: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type UpdatePostRequest = {
  content?: InputMaybe<Scalars['String']['input']>;
  currentPrice?: InputMaybe<Scalars['Float']['input']>;
  discountPercentage?: InputMaybe<Scalars['Float']['input']>;
  originalPrice?: InputMaybe<Scalars['Float']['input']>;
  originalUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductDto = {
  brandId?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRequest = {
  name: Scalars['String']['input'];
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  perfil?: Maybe<Perfil>;
  posts: Array<Post>;
};

export type VoteResponse = {
  __typename?: 'VoteResponse';
  downvotes: Scalars['Int']['output'];
  upvotes: Scalars['Int']['output'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', message: string } };

export type RefreshTokensMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type RemovePerfilMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemovePerfilMutation = { __typename?: 'Mutation', removePerfil: boolean };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserRequest;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, createdAt: any } };

export type GetPerfilPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPerfilPermissionsQuery = { __typename?: 'Query', getPerfilPermissions: Array<string> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, createdAt: any }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, createdAt: any } };


export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    refreshToken
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    message
  }
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokensDocument = gql`
    mutation RefreshTokens($refreshToken: String!) {
  refreshTokens(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRefreshTokensMutation({
 *   variables: {
 *     refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokensMutation(options: VueApolloComposable.UseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
}
export type RefreshTokensMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RemovePerfilDocument = gql`
    mutation RemovePerfil($id: String!) {
  removePerfil(id: $id)
}
    `;

/**
 * __useRemovePerfilMutation__
 *
 * To run a mutation, you first call `useRemovePerfilMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemovePerfilMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemovePerfilMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRemovePerfilMutation(options: VueApolloComposable.UseMutationOptions<RemovePerfilMutation, RemovePerfilMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemovePerfilMutation, RemovePerfilMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RemovePerfilMutation, RemovePerfilMutationVariables>(RemovePerfilDocument, options);
}
export type RemovePerfilMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemovePerfilMutation, RemovePerfilMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserRequest!) {
  createUser(createUserInput: $createUserInput) {
    id
    email
    createdAt
  }
}
    `;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *     createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(options: VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateUserMutation, CreateUserMutationVariables>;
export const GetPerfilPermissionsDocument = gql`
    query GetPerfilPermissions {
  getPerfilPermissions
}
    `;

/**
 * __useGetPerfilPermissionsQuery__
 *
 * To run a query within a Vue component, call `useGetPerfilPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPerfilPermissionsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPerfilPermissionsQuery();
 */
export function useGetPerfilPermissionsQuery(options: VueApolloComposable.UseQueryOptions<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables>(GetPerfilPermissionsDocument, {}, options);
}
export function useGetPerfilPermissionsLazyQuery(options: VueApolloComposable.UseQueryOptions<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables>(GetPerfilPermissionsDocument, {}, options);
}
export type GetPerfilPermissionsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetPerfilPermissionsQuery, GetPerfilPermissionsQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  users {
    id
    email
    createdAt
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a Vue component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllUsersQuery();
 */
export function useGetAllUsersQuery(options: VueApolloComposable.UseQueryOptions<GetAllUsersQuery, GetAllUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllUsersQuery, GetAllUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllUsersQuery, GetAllUsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, {}, options);
}
export function useGetAllUsersLazyQuery(options: VueApolloComposable.UseQueryOptions<GetAllUsersQuery, GetAllUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllUsersQuery, GetAllUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllUsersQuery, GetAllUsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, {}, options);
}
export type GetAllUsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  user(id: $id) {
    id
    email
    createdAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a Vue component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUserQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetUserQuery(variables: GetUserQueryVariables | VueCompositionApi.Ref<GetUserQueryVariables> | ReactiveFunction<GetUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);
}
export function useGetUserLazyQuery(variables?: GetUserQueryVariables | VueCompositionApi.Ref<GetUserQueryVariables> | ReactiveFunction<GetUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);
}
export type GetUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUserQuery, GetUserQueryVariables>;