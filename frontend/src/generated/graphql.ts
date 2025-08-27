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
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AttributeValue = {
  __typename?: 'AttributeValue';
  attribute: Attribute;
  attributeId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Brand = {
  __typename?: 'Brand';
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  logo_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  productBrands?: Maybe<Array<Product>>;
  products: Array<Product>;
  slug: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
};

export type CreateAttributeDto = {
  name: Scalars['String']['input'];
};

export type CreateAttributeValueDto = {
  attributeId: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};

export type CreateBrandDto = {
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  logo_url?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCategoryDto = {
  name: Scalars['String']['input'];
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
  price: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
};

export type CreateProductVariantAttributeDto = {
  attributeId: Scalars['Int']['input'];
  valueId: Scalars['Int']['input'];
  variantId: Scalars['Int']['input'];
};

export type CreateProductVariantDto = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  productId: Scalars['Int']['input'];
  sku: Scalars['String']['input'];
  stock: Scalars['Int']['input'];
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
  createAttribute: Attribute;
  createAttributeValue: AttributeValue;
  createBrand: Brand;
  createCategory: Category;
  createPerfil: Perfil;
  createPost: Post;
  createProduct: Product;
  createProductVariant: ProductVariants;
  createProductVariantAttribute: ProductVariantAttribute;
  createUser: User;
  login: AuthResponse;
  logout: LogoutResponse;
  refreshTokens: AuthResponse;
  removeAttribute: Scalars['Boolean']['output'];
  removeAttributeValue: Scalars['Boolean']['output'];
  removeBrand: Scalars['Boolean']['output'];
  removeCategory: Scalars['Boolean']['output'];
  removePerfil: Scalars['Boolean']['output'];
  removePost: Scalars['Boolean']['output'];
  removeProduct: Scalars['Boolean']['output'];
  removeProductVariant: Scalars['Boolean']['output'];
  removeProductVariantAttribute: Scalars['Boolean']['output'];
  removeProductVariantAttributeByVariantAndAttribute: Scalars['Boolean']['output'];
  removeProductVariantAttributesByVariant: Scalars['Boolean']['output'];
  updateAttribute: Attribute;
  updateAttributeValue: AttributeValue;
  updateBrand: Brand;
  updateCategory: Category;
  updatePerfil: Perfil;
  updatePost: Post;
  updateProduct: Product;
  updateProductVariant: ProductVariants;
  updateProductVariantAttribute: ProductVariantAttribute;
  votePost: VoteResponse;
};


export type MutationCreateAttributeArgs = {
  createAttributeInput: CreateAttributeDto;
};


export type MutationCreateAttributeValueArgs = {
  createAttributeValueInput: CreateAttributeValueDto;
};


export type MutationCreateBrandArgs = {
  createBrandInput: CreateBrandDto;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryDto;
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


export type MutationCreateProductVariantArgs = {
  createVariantInput: CreateProductVariantDto;
};


export type MutationCreateProductVariantAttributeArgs = {
  createProductVariantAttributeInput: CreateProductVariantAttributeDto;
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


export type MutationRemoveAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveAttributeValueArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBrandArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
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


export type MutationRemoveProductVariantArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProductVariantAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProductVariantAttributeByVariantAndAttributeArgs = {
  attributeId: Scalars['Int']['input'];
  variantId: Scalars['Int']['input'];
};


export type MutationRemoveProductVariantAttributesByVariantArgs = {
  variantId: Scalars['Int']['input'];
};


export type MutationUpdateAttributeArgs = {
  id: Scalars['Int']['input'];
  updateAttributeInput: UpdateAttributeDto;
};


export type MutationUpdateAttributeValueArgs = {
  id: Scalars['Int']['input'];
  updateAttributeValueInput: UpdateAttributeValueDto;
};


export type MutationUpdateBrandArgs = {
  id: Scalars['Int']['input'];
  updateBrandInput: UpdateBrandDto;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Int']['input'];
  updateCategoryInput: UpdateCategoryDto;
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


export type MutationUpdateProductVariantArgs = {
  id: Scalars['Int']['input'];
  updateVariantInput: UpdateProductVariantDto;
};


export type MutationUpdateProductVariantAttributeArgs = {
  id: Scalars['Int']['input'];
  updateProductVariantAttributeInput: UpdateProductVariantAttributeDto;
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
  brands?: Maybe<Array<Brand>>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  variants: Array<ProductVariants>;
};

export type ProductVariantAttribute = {
  __typename?: 'ProductVariantAttribute';
  attribute: Attribute;
  attributeId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  value: AttributeValue;
  valueId: Scalars['Int']['output'];
  variant: ProductVariants;
  variantId: Scalars['Int']['output'];
};

export type ProductVariants = {
  __typename?: 'ProductVariants';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  product: Product;
  productId: Scalars['Int']['output'];
  sku: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  attribute: Attribute;
  attributeValue: AttributeValue;
  attributeValues: Array<AttributeValue>;
  attributeValuesByAttribute: Array<AttributeValue>;
  attributes: Array<Attribute>;
  brand: Brand;
  brands: Array<Brand>;
  categories: Array<Category>;
  category: Category;
  findAllPerfis: Array<Perfil>;
  findAllPosts: Array<Post>;
  findOnePerfil: Perfil;
  findOnePost: Post;
  getPerfilPermissions: Array<Scalars['String']['output']>;
  getPostEngagement: EngagementResponse;
  product: Product;
  productVariant: ProductVariants;
  productVariantAttribute: ProductVariantAttribute;
  productVariantAttributes: Array<ProductVariantAttribute>;
  productVariantAttributesByAttribute: Array<ProductVariantAttribute>;
  productVariantAttributesByVariant: Array<ProductVariantAttribute>;
  productVariants: Array<ProductVariants>;
  productVariantsByProduct: Array<ProductVariants>;
  products: Array<Product>;
  user: User;
  users: Array<User>;
};


export type QueryAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAttributeValueArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAttributeValuesByAttributeArgs = {
  attributeId: Scalars['Int']['input'];
};


export type QueryBrandArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
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


export type QueryProductVariantArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductVariantAttributeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductVariantAttributesByAttributeArgs = {
  attributeId: Scalars['Int']['input'];
};


export type QueryProductVariantAttributesByVariantArgs = {
  variantId: Scalars['Int']['input'];
};


export type QueryProductVariantsByProductArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type UpdateAttributeDto = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAttributeValueDto = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBrandDto = {
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  logo_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryDto = {
  name?: InputMaybe<Scalars['String']['input']>;
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
  price?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductVariantAttributeDto = {
  attributeId?: InputMaybe<Scalars['Int']['input']>;
  valueId?: InputMaybe<Scalars['Int']['input']>;
  variantId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductVariantDto = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
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

export type CreateBrandMutationVariables = Exact<{
  createBrandInput: CreateBrandDto;
}>;


export type CreateBrandMutation = { __typename?: 'Mutation', createBrand: { __typename?: 'Brand', id: string, name: string, slug: string, description?: string | null, logo_url?: string | null, website?: string | null, country?: string | null, is_active: boolean } };

export type UpdateBrandMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  updateBrandInput: UpdateBrandDto;
}>;


export type UpdateBrandMutation = { __typename?: 'Mutation', updateBrand: { __typename?: 'Brand', id: string, name: string, slug: string, description?: string | null, logo_url?: string | null, website?: string | null, country?: string | null, is_active: boolean } };

export type RemoveBrandMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveBrandMutation = { __typename?: 'Mutation', removeBrand: boolean };

export type RemovePerfilMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemovePerfilMutation = { __typename?: 'Mutation', removePerfil: boolean };

export type CreateProductMutationVariables = Exact<{
  createProductInput: CreateProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, description?: string | null, categoryId?: number | null, brandId?: number | null, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, brand?: { __typename?: 'Brand', id: string, name: string } | null } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  updateProductInput: UpdateProductDto;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string, name: string, description?: string | null, categoryId?: number | null, brandId?: number | null, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, brand?: { __typename?: 'Brand', id: string, name: string } | null } };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: boolean };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserRequest;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, createdAt: any } };

export type GetAllBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBrandsQuery = { __typename?: 'Query', brands: Array<{ __typename?: 'Brand', id: string, name: string, slug: string, description?: string | null, logo_url?: string | null, website?: string | null, country?: string | null, is_active: boolean }> };

export type GetBrandQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBrandQuery = { __typename?: 'Query', brand: { __typename?: 'Brand', id: string, name: string, slug: string, description?: string | null, logo_url?: string | null, website?: string | null, country?: string | null, is_active: boolean, products: Array<{ __typename?: 'Product', id: string, name: string }> } };

export type GetPerfilPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPerfilPermissionsQuery = { __typename?: 'Query', getPerfilPermissions: Array<string> };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, categoryId?: number | null, brandId?: number | null, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, brand?: { __typename?: 'Brand', id: string, name: string } | null, variants: Array<{ __typename?: 'ProductVariants', id: string, sku: string, price: number, stock: number, imageUrl?: string | null }> }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, description?: string | null, categoryId?: number | null, brandId?: number | null, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, brand?: { __typename?: 'Brand', id: string, name: string } | null, variants: Array<{ __typename?: 'ProductVariants', id: string, sku: string, price: number, stock: number, imageUrl?: string | null }> } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string }> };

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
export const CreateBrandDocument = gql`
    mutation CreateBrand($createBrandInput: CreateBrandDto!) {
  createBrand(createBrandInput: $createBrandInput) {
    id
    name
    slug
    description
    logo_url
    website
    country
    is_active
  }
}
    `;

/**
 * __useCreateBrandMutation__
 *
 * To run a mutation, you first call `useCreateBrandMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateBrandMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateBrandMutation({
 *   variables: {
 *     createBrandInput: // value for 'createBrandInput'
 *   },
 * });
 */
export function useCreateBrandMutation(options: VueApolloComposable.UseMutationOptions<CreateBrandMutation, CreateBrandMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateBrandMutation, CreateBrandMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateBrandMutation, CreateBrandMutationVariables>(CreateBrandDocument, options);
}
export type CreateBrandMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateBrandMutation, CreateBrandMutationVariables>;
export const UpdateBrandDocument = gql`
    mutation UpdateBrand($id: Int!, $updateBrandInput: UpdateBrandDto!) {
  updateBrand(id: $id, updateBrandInput: $updateBrandInput) {
    id
    name
    slug
    description
    logo_url
    website
    country
    is_active
  }
}
    `;

/**
 * __useUpdateBrandMutation__
 *
 * To run a mutation, you first call `useUpdateBrandMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBrandMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateBrandMutation({
 *   variables: {
 *     id: // value for 'id'
 *     updateBrandInput: // value for 'updateBrandInput'
 *   },
 * });
 */
export function useUpdateBrandMutation(options: VueApolloComposable.UseMutationOptions<UpdateBrandMutation, UpdateBrandMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateBrandMutation, UpdateBrandMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateBrandMutation, UpdateBrandMutationVariables>(UpdateBrandDocument, options);
}
export type UpdateBrandMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateBrandMutation, UpdateBrandMutationVariables>;
export const RemoveBrandDocument = gql`
    mutation RemoveBrand($id: Int!) {
  removeBrand(id: $id)
}
    `;

/**
 * __useRemoveBrandMutation__
 *
 * To run a mutation, you first call `useRemoveBrandMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBrandMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveBrandMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBrandMutation(options: VueApolloComposable.UseMutationOptions<RemoveBrandMutation, RemoveBrandMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveBrandMutation, RemoveBrandMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RemoveBrandMutation, RemoveBrandMutationVariables>(RemoveBrandDocument, options);
}
export type RemoveBrandMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveBrandMutation, RemoveBrandMutationVariables>;
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
export const CreateProductDocument = gql`
    mutation CreateProduct($createProductInput: CreateProductDto!) {
  createProduct(createProductInput: $createProductInput) {
    id
    name
    description
    categoryId
    brandId
    createdAt
    category {
      id
      name
    }
    brand {
      id
      name
    }
  }
}
    `;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateProductMutation({
 *   variables: {
 *     createProductInput: // value for 'createProductInput'
 *   },
 * });
 */
export function useCreateProductMutation(options: VueApolloComposable.UseMutationOptions<CreateProductMutation, CreateProductMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateProductMutation, CreateProductMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
}
export type CreateProductMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: Int!, $updateProductInput: UpdateProductDto!) {
  updateProduct(id: $id, updateProductInput: $updateProductInput) {
    id
    name
    description
    categoryId
    brandId
    createdAt
    category {
      id
      name
    }
    brand {
      id
      name
    }
  }
}
    `;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateProductMutation({
 *   variables: {
 *     id: // value for 'id'
 *     updateProductInput: // value for 'updateProductInput'
 *   },
 * });
 */
export function useUpdateProductMutation(options: VueApolloComposable.UseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
}
export type UpdateProductMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductDocument = gql`
    mutation RemoveProduct($id: Int!) {
  removeProduct(id: $id)
}
    `;

/**
 * __useRemoveProductMutation__
 *
 * To run a mutation, you first call `useRemoveProductMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveProductMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRemoveProductMutation(options: VueApolloComposable.UseMutationOptions<RemoveProductMutation, RemoveProductMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveProductMutation, RemoveProductMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RemoveProductMutation, RemoveProductMutationVariables>(RemoveProductDocument, options);
}
export type RemoveProductMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveProductMutation, RemoveProductMutationVariables>;
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
export const GetAllBrandsDocument = gql`
    query GetAllBrands {
  brands {
    id
    name
    slug
    description
    logo_url
    website
    country
    is_active
  }
}
    `;

/**
 * __useGetAllBrandsQuery__
 *
 * To run a query within a Vue component, call `useGetAllBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBrandsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllBrandsQuery();
 */
export function useGetAllBrandsQuery(options: VueApolloComposable.UseQueryOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(GetAllBrandsDocument, {}, options);
}
export function useGetAllBrandsLazyQuery(options: VueApolloComposable.UseQueryOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllBrandsQuery, GetAllBrandsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(GetAllBrandsDocument, {}, options);
}
export type GetAllBrandsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAllBrandsQuery, GetAllBrandsQueryVariables>;
export const GetBrandDocument = gql`
    query GetBrand($id: Int!) {
  brand(id: $id) {
    id
    name
    slug
    description
    logo_url
    website
    country
    is_active
    products {
      id
      name
    }
  }
}
    `;

/**
 * __useGetBrandQuery__
 *
 * To run a query within a Vue component, call `useGetBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetBrandQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetBrandQuery(variables: GetBrandQueryVariables | VueCompositionApi.Ref<GetBrandQueryVariables> | ReactiveFunction<GetBrandQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetBrandQuery, GetBrandQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBrandQuery, GetBrandQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBrandQuery, GetBrandQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, variables, options);
}
export function useGetBrandLazyQuery(variables?: GetBrandQueryVariables | VueCompositionApi.Ref<GetBrandQueryVariables> | ReactiveFunction<GetBrandQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetBrandQuery, GetBrandQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBrandQuery, GetBrandQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBrandQuery, GetBrandQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, variables, options);
}
export type GetBrandQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetBrandQuery, GetBrandQueryVariables>;
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
export const GetAllProductsDocument = gql`
    query GetAllProducts {
  products {
    id
    name
    description
    categoryId
    brandId
    createdAt
    category {
      id
      name
    }
    brand {
      id
      name
    }
    variants {
      id
      sku
      price
      stock
      imageUrl
    }
  }
}
    `;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a Vue component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllProductsQuery();
 */
export function useGetAllProductsQuery(options: VueApolloComposable.UseQueryOptions<GetAllProductsQuery, GetAllProductsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllProductsQuery, GetAllProductsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllProductsQuery, GetAllProductsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, {}, options);
}
export function useGetAllProductsLazyQuery(options: VueApolloComposable.UseQueryOptions<GetAllProductsQuery, GetAllProductsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllProductsQuery, GetAllProductsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllProductsQuery, GetAllProductsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, {}, options);
}
export type GetAllProductsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: Int!) {
  product(id: $id) {
    id
    name
    description
    categoryId
    brandId
    createdAt
    category {
      id
      name
    }
    brand {
      id
      name
    }
    variants {
      id
      sku
      price
      stock
      imageUrl
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a Vue component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetProductQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetProductQuery(variables: GetProductQueryVariables | VueCompositionApi.Ref<GetProductQueryVariables> | ReactiveFunction<GetProductQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetProductQuery, GetProductQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProductQuery, GetProductQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProductQuery, GetProductQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, variables, options);
}
export function useGetProductLazyQuery(variables?: GetProductQueryVariables | VueCompositionApi.Ref<GetProductQueryVariables> | ReactiveFunction<GetProductQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetProductQuery, GetProductQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProductQuery, GetProductQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProductQuery, GetProductQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, variables, options);
}
export type GetProductQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetProductQuery, GetProductQueryVariables>;
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  categories {
    id
    name
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a Vue component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAllCategoriesQuery();
 */
export function useGetAllCategoriesQuery(options: VueApolloComposable.UseQueryOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, {}, options);
}
export function useGetAllCategoriesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, {}, options);
}
export type GetAllCategoriesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
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