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

export type AddUserToTenantInput = {
  roleId: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type AssignPermissionToRoleInput = {
  permissionId: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
};

export type AssignRoleToUserInput = {
  roleId: Scalars['String']['input'];
  tenantId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
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

export type CreatePermissionInput = {
  action: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isGlobal?: Scalars['Boolean']['input'];
  resource: Scalars['String']['input'];
  tenantId?: InputMaybe<Scalars['String']['input']>;
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

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isGlobal?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTenantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<TenantSettingsInput>;
  slug: Scalars['String']['input'];
};

export type CreateUserRequest = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  perfilId: Scalars['String']['input'];
};

export type EffectivePermissionType = {
  __typename?: 'EffectivePermissionType';
  action: Scalars['String']['output'];
  name: Scalars['String']['output'];
  resource: Scalars['String']['output'];
};

export type EngagementResponse = {
  __typename?: 'EngagementResponse';
  percentage: Scalars['Int']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToTenant: Scalars['Boolean']['output'];
  assignPermissionToRole: Scalars['Boolean']['output'];
  assignRoleToUser: Scalars['Boolean']['output'];
  createAttribute: Attribute;
  createAttributeValue: AttributeValue;
  createBrand: Brand;
  createCategory: Category;
  createPerfil: Perfil;
  createPermission: Permission;
  createPost: Post;
  createProduct: Product;
  createProductVariant: ProductVariants;
  createProductVariantAttribute: ProductVariantAttribute;
  createRole: Role;
  createTenant: Tenant;
  createUser: User;
  deletePermission: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteTenant: Scalars['Boolean']['output'];
  login: AuthResponse;
  logout: LogoutResponse;
  refreshTokens: AuthResponse;
  removeAttribute: Scalars['Boolean']['output'];
  removeAttributeValue: Scalars['Boolean']['output'];
  removeBrand: Scalars['Boolean']['output'];
  removeCategory: Scalars['Boolean']['output'];
  removePerfil: Scalars['Boolean']['output'];
  removePermissionFromRole: Scalars['Boolean']['output'];
  removePost: Scalars['Boolean']['output'];
  removeProduct: Scalars['Boolean']['output'];
  removeProductVariant: Scalars['Boolean']['output'];
  removeProductVariantAttribute: Scalars['Boolean']['output'];
  removeProductVariantAttributeByVariantAndAttribute: Scalars['Boolean']['output'];
  removeProductVariantAttributesByVariant: Scalars['Boolean']['output'];
  removeRoleFromUser: Scalars['Boolean']['output'];
  removeUserFromTenant: Scalars['Boolean']['output'];
  renewAccessToken: AuthResponse;
  updateAttribute: Attribute;
  updateAttributeValue: AttributeValue;
  updateBrand: Brand;
  updateCategory: Category;
  updatePerfil: Perfil;
  updatePermission: Permission;
  updatePost: Post;
  updateProduct: Product;
  updateProductVariant: ProductVariants;
  updateProductVariantAttribute: ProductVariantAttribute;
  updateRole: Role;
  updateTenant: Tenant;
  votePost: VoteResponse;
};


export type MutationAddUserToTenantArgs = {
  input: AddUserToTenantInput;
};


export type MutationAssignPermissionToRoleArgs = {
  input: AssignPermissionToRoleInput;
};


export type MutationAssignRoleToUserArgs = {
  input: AssignRoleToUserInput;
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


export type MutationCreatePermissionArgs = {
  input: CreatePermissionInput;
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


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateTenantArgs = {
  input: CreateTenantInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserRequest;
};


export type MutationDeletePermissionArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTenantArgs = {
  id: Scalars['String']['input'];
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


export type MutationRemovePermissionFromRoleArgs = {
  input: AssignPermissionToRoleInput;
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


export type MutationRemoveRoleFromUserArgs = {
  input: AssignRoleToUserInput;
};


export type MutationRemoveUserFromTenantArgs = {
  input: RemoveUserFromTenantInput;
};


export type MutationRenewAccessTokenArgs = {
  accessToken: Scalars['String']['input'];
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


export type MutationUpdatePermissionArgs = {
  input: UpdatePermissionInput;
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


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateTenantArgs = {
  input: UpdateTenantInput;
};


export type MutationVotePostArgs = {
  postId: Scalars['String']['input'];
  voteType: Scalars['String']['input'];
};

export type Perfil = {
  __typename?: 'Perfil';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type Permission = {
  __typename?: 'Permission';
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  resource: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  me: User;
  permission?: Maybe<Permission>;
  permissions: Array<Permission>;
  product: Product;
  productVariant: ProductVariants;
  productVariantAttribute: ProductVariantAttribute;
  productVariantAttributes: Array<ProductVariantAttribute>;
  productVariantAttributesByAttribute: Array<ProductVariantAttribute>;
  productVariantAttributesByVariant: Array<ProductVariantAttribute>;
  productVariants: Array<ProductVariants>;
  productVariantsByProduct: Array<ProductVariants>;
  products: Array<Product>;
  role?: Maybe<Role>;
  roles: Array<Role>;
  tenant?: Maybe<Tenant>;
  tenants: Array<Tenant>;
  user: User;
  userInfo: UserInfoResponse;
  userPermissions: Array<Scalars['String']['output']>;
  userRoles: Array<Role>;
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


export type QueryPermissionArgs = {
  id: Scalars['String']['input'];
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


export type QueryRoleArgs = {
  id: Scalars['String']['input'];
};


export type QueryTenantArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserPermissionsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserRolesArgs = {
  userId: Scalars['String']['input'];
};

export type RemoveUserFromTenantInput = {
  roleId: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isGlobal: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  tenant?: Maybe<Tenant>;
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  owner: User;
  settings?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TenantSettingsInput = {
  customization?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Scalars['String']['input']>;
  integrations?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
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

export type UpdatePermissionInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isGlobal?: InputMaybe<Scalars['Boolean']['input']>;
  resource?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isGlobal?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTenantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<TenantSettingsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  perfil?: Maybe<Perfil>;
  posts: Array<Post>;
};

export type UserInfoResponse = {
  __typename?: 'UserInfoResponse';
  currentTenantId?: Maybe<Scalars['String']['output']>;
  permissions: Array<EffectivePermissionType>;
  roles: Array<Role>;
  tenants: Array<Tenant>;
  user: User;
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

export type RenewAccessTokenMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
}>;


export type RenewAccessTokenMutation = { __typename?: 'Mutation', renewAccessToken: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

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

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryDto;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  updateCategoryInput: UpdateCategoryDto;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: string, name: string } };

export type RemoveCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: boolean };

export type RemovePerfilMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemovePerfilMutation = { __typename?: 'Mutation', removePerfil: boolean };

export type CreatePermissionMutationVariables = Exact<{
  input: CreatePermissionInput;
}>;


export type CreatePermissionMutation = { __typename?: 'Mutation', createPermission: { __typename?: 'Permission', id: string, name: string, resource: string, action: string, description?: string | null, createdAt: any, updatedAt: any } };

export type UpdatePermissionMutationVariables = Exact<{
  input: UpdatePermissionInput;
}>;


export type UpdatePermissionMutation = { __typename?: 'Mutation', updatePermission: { __typename?: 'Permission', id: string, name: string, resource: string, action: string, description?: string | null, createdAt: any, updatedAt: any } };

export type DeletePermissionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePermissionMutation = { __typename?: 'Mutation', deletePermission: boolean };

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

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', id: string, name: string, description?: string | null, isGlobal: boolean, tenant?: { __typename?: 'Tenant', id: string, name: string } | null } };

export type UpdateRoleMutationVariables = Exact<{
  input: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'Role', id: string, name: string, description?: string | null, isGlobal: boolean, tenant?: { __typename?: 'Tenant', id: string, name: string } | null } };

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole: boolean };

export type AssignRoleToUserMutationVariables = Exact<{
  input: AssignRoleToUserInput;
}>;


export type AssignRoleToUserMutation = { __typename?: 'Mutation', assignRoleToUser: boolean };

export type CreateTenantMutationVariables = Exact<{
  input: CreateTenantInput;
}>;


export type CreateTenantMutation = { __typename?: 'Mutation', createTenant: { __typename?: 'Tenant', id: string, name: string, description?: string | null, domain?: string | null, settings?: string | null, createdAt: any, updatedAt: any } };

export type UpdateTenantMutationVariables = Exact<{
  input: UpdateTenantInput;
}>;


export type UpdateTenantMutation = { __typename?: 'Mutation', updateTenant: { __typename?: 'Tenant', id: string, name: string, description?: string | null, domain?: string | null, settings?: string | null, createdAt: any, updatedAt: any } };

export type DeleteTenantMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTenantMutation = { __typename?: 'Mutation', deleteTenant: boolean };

export type AddUserToTenantMutationVariables = Exact<{
  input: AddUserToTenantInput;
}>;


export type AddUserToTenantMutation = { __typename?: 'Mutation', addUserToTenant: boolean };

export type RemoveUserFromTenantMutationVariables = Exact<{
  input: RemoveUserFromTenantInput;
}>;


export type RemoveUserFromTenantMutation = { __typename?: 'Mutation', removeUserFromTenant: boolean };

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

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: string, name: string, products: Array<{ __typename?: 'Product', id: string, name: string }> } };

export type GetCurrentUserPermissionsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetCurrentUserPermissionsQuery = { __typename?: 'Query', userPermissions: Array<string> };

export type GetCurrentUserRolesQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetCurrentUserRolesQuery = { __typename?: 'Query', userRoles: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, isGlobal: boolean, tenant?: { __typename?: 'Tenant', id: string, name: string } | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, createdAt: any, perfil?: { __typename?: 'Perfil', id: string, name: string } | null } };

export type GetPerfilPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPerfilPermissionsQuery = { __typename?: 'Query', getPerfilPermissions: Array<string> };

export type GetPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPermissionsQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'Permission', id: string, name: string, resource: string, action: string, description?: string | null, createdAt: any, updatedAt: any }> };

export type GetPermissionQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPermissionQuery = { __typename?: 'Query', permission?: { __typename?: 'Permission', id: string, name: string, resource: string, action: string, description?: string | null, createdAt: any, updatedAt: any } | null };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, categoryId?: number | null, brandId?: number | null, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, brand?: { __typename?: 'Brand', id: string, name: string } | null, variants: Array<{ __typename?: 'ProductVariants', id: string, sku: string, price: number, stock: number, imageUrl?: string | null }> }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, description?: string | null, categoryId?: number | null, brandId?: number | null, createdAt: any, category?: { __typename?: 'Category', id: string, name: string } | null, brand?: { __typename?: 'Brand', id: string, name: string } | null, variants: Array<{ __typename?: 'ProductVariants', id: string, sku: string, price: number, stock: number, imageUrl?: string | null }> } };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, isGlobal: boolean, tenant?: { __typename?: 'Tenant', id: string, name: string } | null }> };

export type GetRoleQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetRoleQuery = { __typename?: 'Query', role?: { __typename?: 'Role', id: string, name: string, description?: string | null, isGlobal: boolean, tenant?: { __typename?: 'Tenant', id: string, name: string } | null } | null };

export type GetTenantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantsQuery = { __typename?: 'Query', tenants: Array<{ __typename?: 'Tenant', id: string, name: string, description?: string | null, domain?: string | null, settings?: string | null, createdAt: any, updatedAt: any }> };

export type GetTenantQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTenantQuery = { __typename?: 'Query', tenant?: { __typename?: 'Tenant', id: string, name: string, description?: string | null, domain?: string | null, settings?: string | null, createdAt: any, updatedAt: any } | null };

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'Query', userInfo: { __typename?: 'UserInfoResponse', currentTenantId?: string | null, user: { __typename?: 'User', id: string, email: string }, permissions: Array<{ __typename?: 'EffectivePermissionType', resource: string, action: string, name: string }>, roles: Array<{ __typename?: 'Role', id: string, name: string }>, tenants: Array<{ __typename?: 'Tenant', id: string, name: string }> } };

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
export const RenewAccessTokenDocument = gql`
    mutation RenewAccessToken($accessToken: String!) {
  renewAccessToken(accessToken: $accessToken) {
    accessToken
    refreshToken
  }
}
    `;

/**
 * __useRenewAccessTokenMutation__
 *
 * To run a mutation, you first call `useRenewAccessTokenMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRenewAccessTokenMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRenewAccessTokenMutation({
 *   variables: {
 *     accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useRenewAccessTokenMutation(options: VueApolloComposable.UseMutationOptions<RenewAccessTokenMutation, RenewAccessTokenMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RenewAccessTokenMutation, RenewAccessTokenMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RenewAccessTokenMutation, RenewAccessTokenMutationVariables>(RenewAccessTokenDocument, options);
}
export type RenewAccessTokenMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RenewAccessTokenMutation, RenewAccessTokenMutationVariables>;
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
export const CreateCategoryDocument = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryDto!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    id
    name
  }
}
    `;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateCategoryMutation({
 *   variables: {
 *     createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(options: VueApolloComposable.UseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
}
export type CreateCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: Int!, $updateCategoryInput: UpdateCategoryDto!) {
  updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {
    id
    name
  }
}
    `;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateCategoryMutation({
 *   variables: {
 *     id: // value for 'id'
 *     updateCategoryInput: // value for 'updateCategoryInput'
 *   },
 * });
 */
export function useUpdateCategoryMutation(options: VueApolloComposable.UseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const RemoveCategoryDocument = gql`
    mutation RemoveCategory($id: Int!) {
  removeCategory(id: $id)
}
    `;

/**
 * __useRemoveCategoryMutation__
 *
 * To run a mutation, you first call `useRemoveCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveCategoryMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCategoryMutation(options: VueApolloComposable.UseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(RemoveCategoryDocument, options);
}
export type RemoveCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
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
export const CreatePermissionDocument = gql`
    mutation CreatePermission($input: CreatePermissionInput!) {
  createPermission(input: $input) {
    id
    name
    resource
    action
    description
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCreatePermissionMutation__
 *
 * To run a mutation, you first call `useCreatePermissionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreatePermissionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreatePermissionMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreatePermissionMutation(options: VueApolloComposable.UseMutationOptions<CreatePermissionMutation, CreatePermissionMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreatePermissionMutation, CreatePermissionMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreatePermissionMutation, CreatePermissionMutationVariables>(CreatePermissionDocument, options);
}
export type CreatePermissionMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreatePermissionMutation, CreatePermissionMutationVariables>;
export const UpdatePermissionDocument = gql`
    mutation UpdatePermission($input: UpdatePermissionInput!) {
  updatePermission(input: $input) {
    id
    name
    resource
    action
    description
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useUpdatePermissionMutation__
 *
 * To run a mutation, you first call `useUpdatePermissionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePermissionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdatePermissionMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePermissionMutation(options: VueApolloComposable.UseMutationOptions<UpdatePermissionMutation, UpdatePermissionMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdatePermissionMutation, UpdatePermissionMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdatePermissionMutation, UpdatePermissionMutationVariables>(UpdatePermissionDocument, options);
}
export type UpdatePermissionMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdatePermissionMutation, UpdatePermissionMutationVariables>;
export const DeletePermissionDocument = gql`
    mutation DeletePermission($id: String!) {
  deletePermission(id: $id)
}
    `;

/**
 * __useDeletePermissionMutation__
 *
 * To run a mutation, you first call `useDeletePermissionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePermissionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePermissionMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeletePermissionMutation(options: VueApolloComposable.UseMutationOptions<DeletePermissionMutation, DeletePermissionMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeletePermissionMutation, DeletePermissionMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeletePermissionMutation, DeletePermissionMutationVariables>(DeletePermissionDocument, options);
}
export type DeletePermissionMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeletePermissionMutation, DeletePermissionMutationVariables>;
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
export const CreateRoleDocument = gql`
    mutation CreateRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    id
    name
    description
    isGlobal
    tenant {
      id
      name
    }
  }
}
    `;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateRoleMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleMutation(options: VueApolloComposable.UseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
}
export type CreateRoleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    id
    name
    description
    isGlobal
    tenant {
      id
      name
    }
  }
}
    `;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateRoleMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(options: VueApolloComposable.UseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
}
export type UpdateRoleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const DeleteRoleDocument = gql`
    mutation DeleteRole($id: String!) {
  deleteRole(id: $id)
}
    `;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteRoleMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoleMutation(options: VueApolloComposable.UseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, options);
}
export type DeleteRoleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const AssignRoleToUserDocument = gql`
    mutation AssignRoleToUser($input: AssignRoleToUserInput!) {
  assignRoleToUser(input: $input)
}
    `;

/**
 * __useAssignRoleToUserMutation__
 *
 * To run a mutation, you first call `useAssignRoleToUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAssignRoleToUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAssignRoleToUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useAssignRoleToUserMutation(options: VueApolloComposable.UseMutationOptions<AssignRoleToUserMutation, AssignRoleToUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AssignRoleToUserMutation, AssignRoleToUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<AssignRoleToUserMutation, AssignRoleToUserMutationVariables>(AssignRoleToUserDocument, options);
}
export type AssignRoleToUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AssignRoleToUserMutation, AssignRoleToUserMutationVariables>;
export const CreateTenantDocument = gql`
    mutation CreateTenant($input: CreateTenantInput!) {
  createTenant(input: $input) {
    id
    name
    description
    domain
    settings
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCreateTenantMutation__
 *
 * To run a mutation, you first call `useCreateTenantMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateTenantMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateTenantMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateTenantMutation(options: VueApolloComposable.UseMutationOptions<CreateTenantMutation, CreateTenantMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateTenantMutation, CreateTenantMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateTenantMutation, CreateTenantMutationVariables>(CreateTenantDocument, options);
}
export type CreateTenantMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateTenantMutation, CreateTenantMutationVariables>;
export const UpdateTenantDocument = gql`
    mutation UpdateTenant($input: UpdateTenantInput!) {
  updateTenant(input: $input) {
    id
    name
    description
    domain
    settings
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useUpdateTenantMutation__
 *
 * To run a mutation, you first call `useUpdateTenantMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTenantMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateTenantMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTenantMutation(options: VueApolloComposable.UseMutationOptions<UpdateTenantMutation, UpdateTenantMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateTenantMutation, UpdateTenantMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateTenantMutation, UpdateTenantMutationVariables>(UpdateTenantDocument, options);
}
export type UpdateTenantMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateTenantMutation, UpdateTenantMutationVariables>;
export const DeleteTenantDocument = gql`
    mutation DeleteTenant($id: String!) {
  deleteTenant(id: $id)
}
    `;

/**
 * __useDeleteTenantMutation__
 *
 * To run a mutation, you first call `useDeleteTenantMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTenantMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteTenantMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTenantMutation(options: VueApolloComposable.UseMutationOptions<DeleteTenantMutation, DeleteTenantMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteTenantMutation, DeleteTenantMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteTenantMutation, DeleteTenantMutationVariables>(DeleteTenantDocument, options);
}
export type DeleteTenantMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteTenantMutation, DeleteTenantMutationVariables>;
export const AddUserToTenantDocument = gql`
    mutation AddUserToTenant($input: AddUserToTenantInput!) {
  addUserToTenant(input: $input)
}
    `;

/**
 * __useAddUserToTenantMutation__
 *
 * To run a mutation, you first call `useAddUserToTenantMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToTenantMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddUserToTenantMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useAddUserToTenantMutation(options: VueApolloComposable.UseMutationOptions<AddUserToTenantMutation, AddUserToTenantMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddUserToTenantMutation, AddUserToTenantMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<AddUserToTenantMutation, AddUserToTenantMutationVariables>(AddUserToTenantDocument, options);
}
export type AddUserToTenantMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AddUserToTenantMutation, AddUserToTenantMutationVariables>;
export const RemoveUserFromTenantDocument = gql`
    mutation RemoveUserFromTenant($input: RemoveUserFromTenantInput!) {
  removeUserFromTenant(input: $input)
}
    `;

/**
 * __useRemoveUserFromTenantMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromTenantMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromTenantMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveUserFromTenantMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserFromTenantMutation(options: VueApolloComposable.UseMutationOptions<RemoveUserFromTenantMutation, RemoveUserFromTenantMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveUserFromTenantMutation, RemoveUserFromTenantMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RemoveUserFromTenantMutation, RemoveUserFromTenantMutationVariables>(RemoveUserFromTenantDocument, options);
}
export type RemoveUserFromTenantMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveUserFromTenantMutation, RemoveUserFromTenantMutationVariables>;
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
export const GetCategoryDocument = gql`
    query GetCategory($id: Int!) {
  category(id: $id) {
    id
    name
    products {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a Vue component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCategoryQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetCategoryQuery(variables: GetCategoryQueryVariables | VueCompositionApi.Ref<GetCategoryQueryVariables> | ReactiveFunction<GetCategoryQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, variables, options);
}
export function useGetCategoryLazyQuery(variables?: GetCategoryQueryVariables | VueCompositionApi.Ref<GetCategoryQueryVariables> | ReactiveFunction<GetCategoryQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, variables, options);
}
export type GetCategoryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetCurrentUserPermissionsDocument = gql`
    query GetCurrentUserPermissions($userId: String!) {
  userPermissions(userId: $userId)
}
    `;

/**
 * __useGetCurrentUserPermissionsQuery__
 *
 * To run a query within a Vue component, call `useGetCurrentUserPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserPermissionsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCurrentUserPermissionsQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useGetCurrentUserPermissionsQuery(variables: GetCurrentUserPermissionsQueryVariables | VueCompositionApi.Ref<GetCurrentUserPermissionsQueryVariables> | ReactiveFunction<GetCurrentUserPermissionsQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>(GetCurrentUserPermissionsDocument, variables, options);
}
export function useGetCurrentUserPermissionsLazyQuery(variables?: GetCurrentUserPermissionsQueryVariables | VueCompositionApi.Ref<GetCurrentUserPermissionsQueryVariables> | ReactiveFunction<GetCurrentUserPermissionsQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>(GetCurrentUserPermissionsDocument, variables, options);
}
export type GetCurrentUserPermissionsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCurrentUserPermissionsQuery, GetCurrentUserPermissionsQueryVariables>;
export const GetCurrentUserRolesDocument = gql`
    query GetCurrentUserRoles($userId: String!) {
  userRoles(userId: $userId) {
    id
    name
    description
    isGlobal
    tenant {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCurrentUserRolesQuery__
 *
 * To run a query within a Vue component, call `useGetCurrentUserRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserRolesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCurrentUserRolesQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useGetCurrentUserRolesQuery(variables: GetCurrentUserRolesQueryVariables | VueCompositionApi.Ref<GetCurrentUserRolesQueryVariables> | ReactiveFunction<GetCurrentUserRolesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables>(GetCurrentUserRolesDocument, variables, options);
}
export function useGetCurrentUserRolesLazyQuery(variables?: GetCurrentUserRolesQueryVariables | VueCompositionApi.Ref<GetCurrentUserRolesQueryVariables> | ReactiveFunction<GetCurrentUserRolesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables>(GetCurrentUserRolesDocument, variables, options);
}
export type GetCurrentUserRolesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCurrentUserRolesQuery, GetCurrentUserRolesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    createdAt
    perfil {
      id
      name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export function useMeLazyQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
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
export const GetPermissionsDocument = gql`
    query GetPermissions {
  permissions {
    id
    name
    resource
    action
    description
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPermissionsQuery__
 *
 * To run a query within a Vue component, call `useGetPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPermissionsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPermissionsQuery();
 */
export function useGetPermissionsQuery(options: VueApolloComposable.UseQueryOptions<GetPermissionsQuery, GetPermissionsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPermissionsQuery, GetPermissionsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPermissionsQuery, GetPermissionsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetPermissionsQuery, GetPermissionsQueryVariables>(GetPermissionsDocument, {}, options);
}
export function useGetPermissionsLazyQuery(options: VueApolloComposable.UseQueryOptions<GetPermissionsQuery, GetPermissionsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPermissionsQuery, GetPermissionsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPermissionsQuery, GetPermissionsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetPermissionsQuery, GetPermissionsQueryVariables>(GetPermissionsDocument, {}, options);
}
export type GetPermissionsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetPermissionsQuery, GetPermissionsQueryVariables>;
export const GetPermissionDocument = gql`
    query GetPermission($id: String!) {
  permission(id: $id) {
    id
    name
    resource
    action
    description
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPermissionQuery__
 *
 * To run a query within a Vue component, call `useGetPermissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPermissionQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPermissionQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetPermissionQuery(variables: GetPermissionQueryVariables | VueCompositionApi.Ref<GetPermissionQueryVariables> | ReactiveFunction<GetPermissionQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetPermissionQuery, GetPermissionQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPermissionQuery, GetPermissionQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPermissionQuery, GetPermissionQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetPermissionQuery, GetPermissionQueryVariables>(GetPermissionDocument, variables, options);
}
export function useGetPermissionLazyQuery(variables?: GetPermissionQueryVariables | VueCompositionApi.Ref<GetPermissionQueryVariables> | ReactiveFunction<GetPermissionQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetPermissionQuery, GetPermissionQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPermissionQuery, GetPermissionQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPermissionQuery, GetPermissionQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetPermissionQuery, GetPermissionQueryVariables>(GetPermissionDocument, variables, options);
}
export type GetPermissionQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetPermissionQuery, GetPermissionQueryVariables>;
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
export const GetRolesDocument = gql`
    query GetRoles {
  roles {
    id
    name
    description
    isGlobal
    tenant {
      id
      name
    }
  }
}
    `;

/**
 * __useGetRolesQuery__
 *
 * To run a query within a Vue component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetRolesQuery();
 */
export function useGetRolesQuery(options: VueApolloComposable.UseQueryOptions<GetRolesQuery, GetRolesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetRolesQuery, GetRolesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetRolesQuery, GetRolesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, {}, options);
}
export function useGetRolesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetRolesQuery, GetRolesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetRolesQuery, GetRolesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetRolesQuery, GetRolesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, {}, options);
}
export type GetRolesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetRolesQuery, GetRolesQueryVariables>;
export const GetRoleDocument = gql`
    query GetRole($id: String!) {
  role(id: $id) {
    id
    name
    description
    isGlobal
    tenant {
      id
      name
    }
  }
}
    `;

/**
 * __useGetRoleQuery__
 *
 * To run a query within a Vue component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetRoleQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetRoleQuery(variables: GetRoleQueryVariables | VueCompositionApi.Ref<GetRoleQueryVariables> | ReactiveFunction<GetRoleQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetRoleQuery, GetRoleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetRoleQuery, GetRoleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetRoleQuery, GetRoleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, variables, options);
}
export function useGetRoleLazyQuery(variables?: GetRoleQueryVariables | VueCompositionApi.Ref<GetRoleQueryVariables> | ReactiveFunction<GetRoleQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetRoleQuery, GetRoleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetRoleQuery, GetRoleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetRoleQuery, GetRoleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, variables, options);
}
export type GetRoleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetRoleQuery, GetRoleQueryVariables>;
export const GetTenantsDocument = gql`
    query GetTenants {
  tenants {
    id
    name
    description
    domain
    settings
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTenantsQuery__
 *
 * To run a query within a Vue component, call `useGetTenantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTenantsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetTenantsQuery();
 */
export function useGetTenantsQuery(options: VueApolloComposable.UseQueryOptions<GetTenantsQuery, GetTenantsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetTenantsQuery, GetTenantsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetTenantsQuery, GetTenantsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetTenantsQuery, GetTenantsQueryVariables>(GetTenantsDocument, {}, options);
}
export function useGetTenantsLazyQuery(options: VueApolloComposable.UseQueryOptions<GetTenantsQuery, GetTenantsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetTenantsQuery, GetTenantsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetTenantsQuery, GetTenantsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetTenantsQuery, GetTenantsQueryVariables>(GetTenantsDocument, {}, options);
}
export type GetTenantsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetTenantsQuery, GetTenantsQueryVariables>;
export const GetTenantDocument = gql`
    query GetTenant($id: String!) {
  tenant(id: $id) {
    id
    name
    description
    domain
    settings
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTenantQuery__
 *
 * To run a query within a Vue component, call `useGetTenantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTenantQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetTenantQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetTenantQuery(variables: GetTenantQueryVariables | VueCompositionApi.Ref<GetTenantQueryVariables> | ReactiveFunction<GetTenantQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetTenantQuery, GetTenantQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetTenantQuery, GetTenantQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetTenantQuery, GetTenantQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, variables, options);
}
export function useGetTenantLazyQuery(variables?: GetTenantQueryVariables | VueCompositionApi.Ref<GetTenantQueryVariables> | ReactiveFunction<GetTenantQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetTenantQuery, GetTenantQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetTenantQuery, GetTenantQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetTenantQuery, GetTenantQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, variables, options);
}
export type GetTenantQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetTenantQuery, GetTenantQueryVariables>;
export const UserInfoDocument = gql`
    query UserInfo {
  userInfo {
    user {
      id
      email
    }
    permissions {
      resource
      action
      name
    }
    roles {
      id
      name
    }
    tenants {
      id
      name
    }
    currentTenantId
  }
}
    `;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a Vue component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserInfoQuery();
 */
export function useUserInfoQuery(options: VueApolloComposable.UseQueryOptions<UserInfoQuery, UserInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserInfoQuery, UserInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserInfoQuery, UserInfoQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, {}, options);
}
export function useUserInfoLazyQuery(options: VueApolloComposable.UseQueryOptions<UserInfoQuery, UserInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserInfoQuery, UserInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserInfoQuery, UserInfoQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, {}, options);
}
export type UserInfoQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserInfoQuery, UserInfoQueryVariables>;
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