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
  ConnectionCursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Attribute = {
  __typename?: 'Attribute';
  active: Scalars['Boolean']['output'];
  created: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type AttributeConnection = {
  __typename?: 'AttributeConnection';
  /** Array of edges. */
  edges: Array<AttributeEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type AttributeDeleteFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<AttributeDeleteFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AttributeDeleteFilter>>;
};

export type AttributeDeleteResponse = {
  __typename?: 'AttributeDeleteResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type AttributeEdge = {
  __typename?: 'AttributeEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Attribute */
  node: Attribute;
};

export type AttributeFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<AttributeFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AttributeFilter>>;
};

export type AttributeSort = {
  direction: SortDirection;
  field: AttributeSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum AttributeSortFields {
  Active = 'active',
  Description = 'description',
  Id = 'id',
  Name = 'name'
}

export type AttributeUpdateFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<AttributeUpdateFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AttributeUpdateFilter>>;
};

export type AttributeValue = {
  __typename?: 'AttributeValue';
  active: Scalars['Boolean']['output'];
  attributeId: Scalars['String']['output'];
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updated: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type AttributeValueConnection = {
  __typename?: 'AttributeValueConnection';
  /** Array of edges. */
  edges: Array<AttributeValueEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type AttributeValueDeleteFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<AttributeValueDeleteFilter>>;
  attributeId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<AttributeValueDeleteFilter>>;
  value?: InputMaybe<StringFieldComparison>;
};

export type AttributeValueDeleteResponse = {
  __typename?: 'AttributeValueDeleteResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  attributeId?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type AttributeValueEdge = {
  __typename?: 'AttributeValueEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the AttributeValue */
  node: AttributeValue;
};

export type AttributeValueFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<AttributeValueFilter>>;
  attributeId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<AttributeValueFilter>>;
  value?: InputMaybe<StringFieldComparison>;
};

export type AttributeValueSort = {
  direction: SortDirection;
  field: AttributeValueSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum AttributeValueSortFields {
  Active = 'active',
  AttributeId = 'attributeId',
  Id = 'id',
  Value = 'value'
}

export type AttributeValueUpdateFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<AttributeValueUpdateFilter>>;
  attributeId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<AttributeValueUpdateFilter>>;
  value?: InputMaybe<StringFieldComparison>;
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Brand = {
  __typename?: 'Brand';
  active: Scalars['Boolean']['output'];
  country?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type BrandConnection = {
  __typename?: 'BrandConnection';
  /** Array of edges. */
  edges: Array<BrandEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type BrandDeleteFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<BrandDeleteFilter>>;
  country?: InputMaybe<StringFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  logoUrl?: InputMaybe<StringFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BrandDeleteFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
  website?: InputMaybe<StringFieldComparison>;
};

export type BrandDeleteResponse = {
  __typename?: 'BrandDeleteResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type BrandEdge = {
  __typename?: 'BrandEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Brand */
  node: Brand;
};

export type BrandFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<BrandFilter>>;
  country?: InputMaybe<StringFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  logoUrl?: InputMaybe<StringFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BrandFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
  website?: InputMaybe<StringFieldComparison>;
};

export type BrandSort = {
  direction: SortDirection;
  field: BrandSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum BrandSortFields {
  Active = 'active',
  Country = 'country',
  Description = 'description',
  Id = 'id',
  LogoUrl = 'logoUrl',
  Name = 'name',
  Slug = 'slug',
  Website = 'website'
}

export type BrandUpdateFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<BrandUpdateFilter>>;
  country?: InputMaybe<StringFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  logoUrl?: InputMaybe<StringFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BrandUpdateFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
  website?: InputMaybe<StringFieldComparison>;
};

export type Category = {
  __typename?: 'Category';
  active: Scalars['Boolean']['output'];
  created: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  /** Array of edges. */
  edges: Array<CategoryEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type CategoryDeleteFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<CategoryDeleteFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CategoryDeleteFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
};

export type CategoryDeleteResponse = {
  __typename?: 'CategoryDeleteResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Category */
  node: Category;
};

export type CategoryFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<CategoryFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CategoryFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
};

export type CategorySort = {
  direction: SortDirection;
  field: CategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CategorySortFields {
  Active = 'active',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  Slug = 'slug'
}

export type CategoryUpdateFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<CategoryUpdateFilter>>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CategoryUpdateFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
};

export type CreateAttribute = {
  active?: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateAttributeValue = {
  active?: Scalars['Boolean']['input'];
  attributeId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateBrand = {
  active?: Scalars['Boolean']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCategory = {
  active?: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateManyAttributeValuesInput = {
  /** Array of records to create */
  attributeValues: Array<CreateAttributeValue>;
};

export type CreateManyAttributesInput = {
  /** Array of records to create */
  attributes: Array<CreateAttribute>;
};

export type CreateManyBrandsInput = {
  /** Array of records to create */
  brands: Array<CreateBrand>;
};

export type CreateManyCategoriesInput = {
  /** Array of records to create */
  categories: Array<CreateCategory>;
};

export type CreateManyProductVariantsInput = {
  /** Array of records to create */
  productVariants: Array<CreateProductVariant>;
};

export type CreateManyProductsInput = {
  /** Array of records to create */
  products: Array<CreateProduct>;
};

export type CreateManyProfilesInput = {
  /** Array of records to create */
  profiles: Array<CreateProfile>;
};

export type CreateManyTenantsInput = {
  /** Array of records to create */
  tenants: Array<CreateTenant>;
};

export type CreateManyTodoItemsInput = {
  /** Array of records to create */
  todoItems: Array<CreateTodoItem>;
};

export type CreateManyUsersInput = {
  /** Array of records to create */
  users: Array<CreateUser>;
};

export type CreateOneAttributeInput = {
  /** The record to create */
  attribute: CreateAttribute;
};

export type CreateOneAttributeValueInput = {
  /** The record to create */
  attributeValue: CreateAttributeValue;
};

export type CreateOneBrandInput = {
  /** The record to create */
  brand: CreateBrand;
};

export type CreateOneCategoryInput = {
  /** The record to create */
  category: CreateCategory;
};

export type CreateOneProductInput = {
  /** The record to create */
  product: CreateProduct;
};

export type CreateOneProductVariantInput = {
  /** The record to create */
  productVariant: CreateProductVariant;
};

export type CreateOneProfileInput = {
  /** The record to create */
  profile: CreateProfile;
};

export type CreateOneTenantInput = {
  /** The record to create */
  tenant: CreateTenant;
};

export type CreateOneTodoItemInput = {
  /** The record to create */
  todoItem: CreateTodoItem;
};

export type CreateOneUserInput = {
  /** The record to create */
  user: CreateUser;
};

export type CreateProduct = {
  active?: Scalars['Boolean']['input'];
  brandId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
};

export type CreateProductVariant = {
  active?: Scalars['Boolean']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  sku: Scalars['String']['input'];
  stock?: Scalars['Int']['input'];
};

export type CreateProfile = {
  resolvers: Array<Scalars['String']['input']>;
  tenantId: Scalars['String']['input'];
};

export type CreateTenant = {
  active?: Scalars['Boolean']['input'];
  domain: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTodoItem = {
  completed: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type CreateUser = {
  active?: Scalars['Boolean']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantId: Scalars['String']['input'];
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteManyAttributeValuesInput = {
  /** Filter to find records to delete */
  filter: AttributeValueDeleteFilter;
};

export type DeleteManyAttributesInput = {
  /** Filter to find records to delete */
  filter: AttributeDeleteFilter;
};

export type DeleteManyBrandsInput = {
  /** Filter to find records to delete */
  filter: BrandDeleteFilter;
};

export type DeleteManyCategoriesInput = {
  /** Filter to find records to delete */
  filter: CategoryDeleteFilter;
};

export type DeleteManyProductVariantsInput = {
  /** Filter to find records to delete */
  filter: ProductVariantDeleteFilter;
};

export type DeleteManyProductsInput = {
  /** Filter to find records to delete */
  filter: ProductDeleteFilter;
};

export type DeleteManyProfilesInput = {
  /** Filter to find records to delete */
  filter: ProfileDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManyTenantsInput = {
  /** Filter to find records to delete */
  filter: TenantDeleteFilter;
};

export type DeleteManyTodoItemsInput = {
  /** Filter to find records to delete */
  filter: TodoItemDeleteFilter;
};

export type DeleteManyUsersInput = {
  /** Filter to find records to delete */
  filter: UserDeleteFilter;
};

export type DeleteOneAttributeInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneAttributeValueInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneBrandInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneProductInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneProductVariantInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneProfileInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTenantInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTodoItemInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneUserInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type FloatFieldComparison = {
  between?: InputMaybe<FloatFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  notBetween?: InputMaybe<FloatFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type FloatFieldComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
};

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  iLike?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  notILike?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  notLike?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFieldComparison = {
  between?: InputMaybe<IntFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  notBetween?: InputMaybe<IntFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntFieldComparisonBetween = {
  lower: Scalars['Int']['input'];
  upper: Scalars['Int']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyAttributeValues: Array<AttributeValue>;
  createManyAttributes: Array<Attribute>;
  createManyBrands: Array<Brand>;
  createManyCategories: Array<Category>;
  createManyProductVariants: Array<ProductVariant>;
  createManyProducts: Array<Product>;
  createManyProfiles: Array<Profile>;
  createManyTenants: Array<Tenant>;
  createManyUsers: Array<User>;
  createOneAttribute: Attribute;
  createOneAttributeValue: AttributeValue;
  createOneBrand: Brand;
  createOneCategory: Category;
  createOneProduct: Product;
  createOneProductVariant: ProductVariant;
  createOneProfile: Profile;
  createOneTenant: Tenant;
  createOneUser: User;
  createTodoItem: TodoItem;
  createTodoItems: Array<TodoItem>;
  deleteManyAttributeValues: DeleteManyResponse;
  deleteManyAttributes: DeleteManyResponse;
  deleteManyBrands: DeleteManyResponse;
  deleteManyCategories: DeleteManyResponse;
  deleteManyProductVariants: DeleteManyResponse;
  deleteManyProducts: DeleteManyResponse;
  deleteManyProfiles: DeleteManyResponse;
  deleteManyTenants: DeleteManyResponse;
  deleteManyUsers: DeleteManyResponse;
  deleteOneAttribute: AttributeDeleteResponse;
  deleteOneAttributeValue: AttributeValueDeleteResponse;
  deleteOneBrand: BrandDeleteResponse;
  deleteOneCategory: CategoryDeleteResponse;
  deleteOneProduct: ProductDeleteResponse;
  deleteOneProductVariant: ProductVariantDeleteResponse;
  deleteOneProfile: ProfileDeleteResponse;
  deleteOneTenant: TenantDeleteResponse;
  deleteOneUser: UserDeleteResponse;
  deleteTodoItem: TodoItemDeleteResponse;
  deleteTodoItems: DeleteManyResponse;
  login: LoginResponse;
  updateManyAttributeValues: UpdateManyResponse;
  updateManyAttributes: UpdateManyResponse;
  updateManyBrands: UpdateManyResponse;
  updateManyCategories: UpdateManyResponse;
  updateManyProductVariants: UpdateManyResponse;
  updateManyProducts: UpdateManyResponse;
  updateManyProfiles: UpdateManyResponse;
  updateManyTenants: UpdateManyResponse;
  updateManyUsers: UpdateManyResponse;
  updateOneAttribute: Attribute;
  updateOneAttributeValue: AttributeValue;
  updateOneBrand: Brand;
  updateOneCategory: Category;
  updateOneProduct: Product;
  updateOneProductVariant: ProductVariant;
  updateOneProfile: Profile;
  updateOneTenant: Tenant;
  updateOneUser: User;
  updateTodoItem: TodoItem;
  updateTodoItems: UpdateManyResponse;
};


export type MutationCreateManyAttributeValuesArgs = {
  input: CreateManyAttributeValuesInput;
};


export type MutationCreateManyAttributesArgs = {
  input: CreateManyAttributesInput;
};


export type MutationCreateManyBrandsArgs = {
  input: CreateManyBrandsInput;
};


export type MutationCreateManyCategoriesArgs = {
  input: CreateManyCategoriesInput;
};


export type MutationCreateManyProductVariantsArgs = {
  input: CreateManyProductVariantsInput;
};


export type MutationCreateManyProductsArgs = {
  input: CreateManyProductsInput;
};


export type MutationCreateManyProfilesArgs = {
  input: CreateManyProfilesInput;
};


export type MutationCreateManyTenantsArgs = {
  input: CreateManyTenantsInput;
};


export type MutationCreateManyUsersArgs = {
  input: CreateManyUsersInput;
};


export type MutationCreateOneAttributeArgs = {
  input: CreateOneAttributeInput;
};


export type MutationCreateOneAttributeValueArgs = {
  input: CreateOneAttributeValueInput;
};


export type MutationCreateOneBrandArgs = {
  input: CreateOneBrandInput;
};


export type MutationCreateOneCategoryArgs = {
  input: CreateOneCategoryInput;
};


export type MutationCreateOneProductArgs = {
  input: CreateOneProductInput;
};


export type MutationCreateOneProductVariantArgs = {
  input: CreateOneProductVariantInput;
};


export type MutationCreateOneProfileArgs = {
  input: CreateOneProfileInput;
};


export type MutationCreateOneTenantArgs = {
  input: CreateOneTenantInput;
};


export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};


export type MutationCreateTodoItemArgs = {
  input: CreateOneTodoItemInput;
};


export type MutationCreateTodoItemsArgs = {
  input: CreateManyTodoItemsInput;
};


export type MutationDeleteManyAttributeValuesArgs = {
  input: DeleteManyAttributeValuesInput;
};


export type MutationDeleteManyAttributesArgs = {
  input: DeleteManyAttributesInput;
};


export type MutationDeleteManyBrandsArgs = {
  input: DeleteManyBrandsInput;
};


export type MutationDeleteManyCategoriesArgs = {
  input: DeleteManyCategoriesInput;
};


export type MutationDeleteManyProductVariantsArgs = {
  input: DeleteManyProductVariantsInput;
};


export type MutationDeleteManyProductsArgs = {
  input: DeleteManyProductsInput;
};


export type MutationDeleteManyProfilesArgs = {
  input: DeleteManyProfilesInput;
};


export type MutationDeleteManyTenantsArgs = {
  input: DeleteManyTenantsInput;
};


export type MutationDeleteManyUsersArgs = {
  input: DeleteManyUsersInput;
};


export type MutationDeleteOneAttributeArgs = {
  input: DeleteOneAttributeInput;
};


export type MutationDeleteOneAttributeValueArgs = {
  input: DeleteOneAttributeValueInput;
};


export type MutationDeleteOneBrandArgs = {
  input: DeleteOneBrandInput;
};


export type MutationDeleteOneCategoryArgs = {
  input: DeleteOneCategoryInput;
};


export type MutationDeleteOneProductArgs = {
  input: DeleteOneProductInput;
};


export type MutationDeleteOneProductVariantArgs = {
  input: DeleteOneProductVariantInput;
};


export type MutationDeleteOneProfileArgs = {
  input: DeleteOneProfileInput;
};


export type MutationDeleteOneTenantArgs = {
  input: DeleteOneTenantInput;
};


export type MutationDeleteOneUserArgs = {
  input: DeleteOneUserInput;
};


export type MutationDeleteTodoItemArgs = {
  input: DeleteOneTodoItemInput;
};


export type MutationDeleteTodoItemsArgs = {
  input: DeleteManyTodoItemsInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateManyAttributeValuesArgs = {
  input: UpdateManyAttributeValuesInput;
};


export type MutationUpdateManyAttributesArgs = {
  input: UpdateManyAttributesInput;
};


export type MutationUpdateManyBrandsArgs = {
  input: UpdateManyBrandsInput;
};


export type MutationUpdateManyCategoriesArgs = {
  input: UpdateManyCategoriesInput;
};


export type MutationUpdateManyProductVariantsArgs = {
  input: UpdateManyProductVariantsInput;
};


export type MutationUpdateManyProductsArgs = {
  input: UpdateManyProductsInput;
};


export type MutationUpdateManyProfilesArgs = {
  input: UpdateManyProfilesInput;
};


export type MutationUpdateManyTenantsArgs = {
  input: UpdateManyTenantsInput;
};


export type MutationUpdateManyUsersArgs = {
  input: UpdateManyUsersInput;
};


export type MutationUpdateOneAttributeArgs = {
  input: UpdateOneAttributeInput;
};


export type MutationUpdateOneAttributeValueArgs = {
  input: UpdateOneAttributeValueInput;
};


export type MutationUpdateOneBrandArgs = {
  input: UpdateOneBrandInput;
};


export type MutationUpdateOneCategoryArgs = {
  input: UpdateOneCategoryInput;
};


export type MutationUpdateOneProductArgs = {
  input: UpdateOneProductInput;
};


export type MutationUpdateOneProductVariantArgs = {
  input: UpdateOneProductVariantInput;
};


export type MutationUpdateOneProfileArgs = {
  input: UpdateOneProfileInput;
};


export type MutationUpdateOneTenantArgs = {
  input: UpdateOneTenantInput;
};


export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};


export type MutationUpdateTodoItemArgs = {
  input: UpdateOneTodoItemInput;
};


export type MutationUpdateTodoItemsArgs = {
  input: UpdateManyTodoItemsInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
};

export type Product = {
  __typename?: 'Product';
  active: Scalars['Boolean']['output'];
  brandId?: Maybe<Scalars['String']['output']>;
  categoryId?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  /** Array of edges. */
  edges: Array<ProductEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ProductDeleteFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<ProductDeleteFilter>>;
  brandId?: InputMaybe<StringFieldComparison>;
  categoryId?: InputMaybe<StringFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ProductDeleteFilter>>;
  price?: InputMaybe<FloatFieldComparison>;
  slug?: InputMaybe<StringFieldComparison>;
};

export type ProductDeleteResponse = {
  __typename?: 'ProductDeleteResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  brandId?: Maybe<Scalars['String']['output']>;
  categoryId?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Product */
  node: Product;
};

export type ProductFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<ProductFilter>>;
  brandId?: InputMaybe<StringFieldComparison>;
  categoryId?: InputMaybe<StringFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ProductFilter>>;
  price?: InputMaybe<FloatFieldComparison>;
  slug?: InputMaybe<StringFieldComparison>;
};

export type ProductSort = {
  direction: SortDirection;
  field: ProductSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ProductSortFields {
  Active = 'active',
  BrandId = 'brandId',
  CategoryId = 'categoryId',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  Price = 'price',
  Slug = 'slug'
}

export type ProductUpdateFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<ProductUpdateFilter>>;
  brandId?: InputMaybe<StringFieldComparison>;
  categoryId?: InputMaybe<StringFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ProductUpdateFilter>>;
  price?: InputMaybe<FloatFieldComparison>;
  slug?: InputMaybe<StringFieldComparison>;
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  active: Scalars['Boolean']['output'];
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  productId: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
  updated: Scalars['DateTime']['output'];
};

export type ProductVariantConnection = {
  __typename?: 'ProductVariantConnection';
  /** Array of edges. */
  edges: Array<ProductVariantEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ProductVariantDeleteFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<ProductVariantDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  imageUrl?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ProductVariantDeleteFilter>>;
  price?: InputMaybe<FloatFieldComparison>;
  productId?: InputMaybe<StringFieldComparison>;
  sku?: InputMaybe<StringFieldComparison>;
  stock?: InputMaybe<IntFieldComparison>;
};

export type ProductVariantDeleteResponse = {
  __typename?: 'ProductVariantDeleteResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductVariantEdge = {
  __typename?: 'ProductVariantEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the ProductVariant */
  node: ProductVariant;
};

export type ProductVariantFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<ProductVariantFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  imageUrl?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ProductVariantFilter>>;
  price?: InputMaybe<FloatFieldComparison>;
  productId?: InputMaybe<StringFieldComparison>;
  sku?: InputMaybe<StringFieldComparison>;
  stock?: InputMaybe<IntFieldComparison>;
};

export type ProductVariantSort = {
  direction: SortDirection;
  field: ProductVariantSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ProductVariantSortFields {
  Active = 'active',
  Id = 'id',
  ImageUrl = 'imageUrl',
  Price = 'price',
  ProductId = 'productId',
  Sku = 'sku',
  Stock = 'stock'
}

export type ProductVariantUpdateFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<ProductVariantUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  imageUrl?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ProductVariantUpdateFilter>>;
  price?: InputMaybe<FloatFieldComparison>;
  productId?: InputMaybe<StringFieldComparison>;
  sku?: InputMaybe<StringFieldComparison>;
  stock?: InputMaybe<IntFieldComparison>;
};

export type Profile = {
  __typename?: 'Profile';
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  resolvers: Array<Scalars['String']['output']>;
  tenantId: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  /** Array of edges. */
  edges: Array<ProfileEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ProfileDeleteFilter = {
  and?: InputMaybe<Array<ProfileDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ProfileDeleteFilter>>;
  tenantId?: InputMaybe<StringFieldComparison>;
};

export type ProfileDeleteResponse = {
  __typename?: 'ProfileDeleteResponse';
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  resolvers?: Maybe<Array<Scalars['String']['output']>>;
  tenantId?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type ProfileEdge = {
  __typename?: 'ProfileEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Profile */
  node: Profile;
};

export type ProfileFilter = {
  and?: InputMaybe<Array<ProfileFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ProfileFilter>>;
  tenantId?: InputMaybe<StringFieldComparison>;
};

export type ProfileSort = {
  direction: SortDirection;
  field: ProfileSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ProfileSortFields {
  Id = 'id',
  TenantId = 'tenantId'
}

export type ProfileUpdateFilter = {
  and?: InputMaybe<Array<ProfileUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ProfileUpdateFilter>>;
  tenantId?: InputMaybe<StringFieldComparison>;
};

export type Query = {
  __typename?: 'Query';
  attribute: Attribute;
  attributeValue: AttributeValue;
  attributeValues: AttributeValueConnection;
  attributes: AttributeConnection;
  brand: Brand;
  brands: BrandConnection;
  categories: CategoryConnection;
  category: Category;
  findTodoItem: TodoItem;
  findTodoItems: TodoItemConnection;
  listResolvers: Array<ResolverOperationDto>;
  me: User;
  product: Product;
  productVariant: ProductVariant;
  productVariants: ProductVariantConnection;
  products: ProductConnection;
  profile: Profile;
  profiles: ProfileConnection;
  tenant: Tenant;
  tenants: TenantConnection;
  user: User;
  users: UserConnection;
};


export type QueryAttributeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAttributeValueArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAttributeValuesArgs = {
  filter?: AttributeValueFilter;
  paging?: CursorPaging;
  sorting?: Array<AttributeValueSort>;
};


export type QueryAttributesArgs = {
  filter?: AttributeFilter;
  paging?: CursorPaging;
  sorting?: Array<AttributeSort>;
};


export type QueryBrandArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBrandsArgs = {
  filter?: BrandFilter;
  paging?: CursorPaging;
  sorting?: Array<BrandSort>;
};


export type QueryCategoriesArgs = {
  filter?: CategoryFilter;
  paging?: CursorPaging;
  sorting?: Array<CategorySort>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindTodoItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindTodoItemsArgs = {
  filter?: TodoItemFilter;
  paging?: CursorPaging;
  sorting?: Array<TodoItemSort>;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductVariantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductVariantsArgs = {
  filter?: ProductVariantFilter;
  paging?: CursorPaging;
  sorting?: Array<ProductVariantSort>;
};


export type QueryProductsArgs = {
  filter?: ProductFilter;
  paging?: CursorPaging;
  sorting?: Array<ProductSort>;
};


export type QueryProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProfilesArgs = {
  filter?: ProfileFilter;
  paging?: CursorPaging;
  sorting?: Array<ProfileSort>;
};


export type QueryTenantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTenantsArgs = {
  filter?: TenantFilter;
  paging?: CursorPaging;
  sorting?: Array<TenantSort>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter?: UserFilter;
  paging?: CursorPaging;
  sorting?: Array<UserSort>;
};

export type ResolverOperationDto = {
  __typename?: 'ResolverOperationDTO';
  methodName: Scalars['String']['output'];
  moduleName?: Maybe<Scalars['String']['output']>;
  requiresAuth: Scalars['Boolean']['output'];
  resolverClass: Scalars['String']['output'];
  resolverName?: Maybe<Scalars['String']['output']>;
  schemaName: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type Tenant = {
  __typename?: 'Tenant';
  active: Scalars['Boolean']['output'];
  created: Scalars['DateTime']['output'];
  domain: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type TenantConnection = {
  __typename?: 'TenantConnection';
  /** Array of edges. */
  edges: Array<TenantEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type TenantDeleteFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<TenantDeleteFilter>>;
  domain?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TenantDeleteFilter>>;
};

export type TenantDeleteResponse = {
  __typename?: 'TenantDeleteResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type TenantEdge = {
  __typename?: 'TenantEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Tenant */
  node: Tenant;
};

export type TenantFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<TenantFilter>>;
  domain?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TenantFilter>>;
};

export type TenantSort = {
  direction: SortDirection;
  field: TenantSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TenantSortFields {
  Active = 'active',
  Domain = 'domain',
  Id = 'id',
  Name = 'name'
}

export type TenantUpdateFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<TenantUpdateFilter>>;
  domain?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TenantUpdateFilter>>;
};

export type TodoItem = {
  __typename?: 'TodoItem';
  completed: Scalars['Boolean']['output'];
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type TodoItemConnection = {
  __typename?: 'TodoItemConnection';
  /** Array of edges. */
  edges: Array<TodoItemEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type TodoItemDeleteFilter = {
  and?: InputMaybe<Array<TodoItemDeleteFilter>>;
  completed?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TodoItemDeleteFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type TodoItemDeleteResponse = {
  __typename?: 'TodoItemDeleteResponse';
  completed?: Maybe<Scalars['Boolean']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type TodoItemEdge = {
  __typename?: 'TodoItemEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the TodoItem */
  node: TodoItem;
};

export type TodoItemFilter = {
  and?: InputMaybe<Array<TodoItemFilter>>;
  completed?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TodoItemFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type TodoItemSort = {
  direction: SortDirection;
  field: TodoItemSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TodoItemSortFields {
  Completed = 'completed',
  Id = 'id',
  Title = 'title'
}

export type TodoItemUpdateFilter = {
  and?: InputMaybe<Array<TodoItemUpdateFilter>>;
  completed?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TodoItemUpdateFilter>>;
  title?: InputMaybe<StringFieldComparison>;
};

export type UpdateAttribute = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateAttributeValue = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  attributeId?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBrand = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategory = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateManyAttributeValuesInput = {
  /** Filter used to find fields to update */
  filter: AttributeValueUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateAttributeValue;
};

export type UpdateManyAttributesInput = {
  /** Filter used to find fields to update */
  filter: AttributeUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateAttribute;
};

export type UpdateManyBrandsInput = {
  /** Filter used to find fields to update */
  filter: BrandUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateBrand;
};

export type UpdateManyCategoriesInput = {
  /** Filter used to find fields to update */
  filter: CategoryUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateCategory;
};

export type UpdateManyProductVariantsInput = {
  /** Filter used to find fields to update */
  filter: ProductVariantUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateProductVariant;
};

export type UpdateManyProductsInput = {
  /** Filter used to find fields to update */
  filter: ProductUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateProduct;
};

export type UpdateManyProfilesInput = {
  /** Filter used to find fields to update */
  filter: ProfileUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateProfile;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManyTenantsInput = {
  /** Filter used to find fields to update */
  filter: TenantUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTenant;
};

export type UpdateManyTodoItemsInput = {
  /** Filter used to find fields to update */
  filter: TodoItemUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTodoItem;
};

export type UpdateManyUsersInput = {
  /** Filter used to find fields to update */
  filter: UserUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateUser;
};

export type UpdateOneAttributeInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateAttribute;
};

export type UpdateOneAttributeValueInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateAttributeValue;
};

export type UpdateOneBrandInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateBrand;
};

export type UpdateOneCategoryInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateCategory;
};

export type UpdateOneProductInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateProduct;
};

export type UpdateOneProductVariantInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateProductVariant;
};

export type UpdateOneProfileInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateProfile;
};

export type UpdateOneTenantInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTenant;
};

export type UpdateOneTodoItemInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTodoItem;
};

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateUser;
};

export type UpdateProduct = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  brandId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateProductVariant = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateProfile = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  resolvers?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTenant = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTodoItem = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUser = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean']['output'];
  created: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roles: Array<Scalars['String']['output']>;
  tenantId: Scalars['String']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** Array of edges. */
  edges: Array<UserEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type UserDeleteFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<UserDeleteFilter>>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserDeleteFilter>>;
  tenantId?: InputMaybe<StringFieldComparison>;
};

export type UserDeleteResponse = {
  __typename?: 'UserDeleteResponse';
  active?: Maybe<Scalars['Boolean']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  tenantId?: Maybe<Scalars['String']['output']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the User */
  node: User;
};

export type UserFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<UserFilter>>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserFilter>>;
  tenantId?: InputMaybe<StringFieldComparison>;
};

export type UserSort = {
  direction: SortDirection;
  field: UserSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum UserSortFields {
  Active = 'active',
  Email = 'email',
  Id = 'id',
  Name = 'name',
  TenantId = 'tenantId'
}

export type UserUpdateFilter = {
  active?: InputMaybe<BooleanFieldComparison>;
  and?: InputMaybe<Array<UserUpdateFilter>>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserUpdateFilter>>;
  tenantId?: InputMaybe<StringFieldComparison>;
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type CreateOneBrandMutationVariables = Exact<{
  input: CreateOneBrandInput;
}>;


export type CreateOneBrandMutation = { __typename?: 'Mutation', createOneBrand: { __typename?: 'Brand', id: string, name: string, slug: string, description?: string | null, logoUrl?: string | null, website?: string | null, country?: string | null, active: boolean, created: any, updated: any } };

export type DeleteOneBrandMutationVariables = Exact<{
  input: DeleteOneBrandInput;
}>;


export type DeleteOneBrandMutation = { __typename?: 'Mutation', deleteOneBrand: { __typename?: 'BrandDeleteResponse', id?: string | null } };

export type UpdateOneBrandMutationVariables = Exact<{
  input: UpdateOneBrandInput;
}>;


export type UpdateOneBrandMutation = { __typename?: 'Mutation', updateOneBrand: { __typename?: 'Brand', id: string, name: string, slug: string, description?: string | null, logoUrl?: string | null, website?: string | null, country?: string | null, active: boolean, created: any, updated: any } };

export type CreateOneCategoryMutationVariables = Exact<{
  input: CreateOneCategoryInput;
}>;


export type CreateOneCategoryMutation = { __typename?: 'Mutation', createOneCategory: { __typename?: 'Category', id: string, name: string, description?: string | null, slug: string, active: boolean, created: any, updated: any } };

export type DeleteOneCategoryMutationVariables = Exact<{
  input: DeleteOneCategoryInput;
}>;


export type DeleteOneCategoryMutation = { __typename?: 'Mutation', deleteOneCategory: { __typename?: 'CategoryDeleteResponse', id?: string | null } };

export type UpdateOneCategoryMutationVariables = Exact<{
  input: UpdateOneCategoryInput;
}>;


export type UpdateOneCategoryMutation = { __typename?: 'Mutation', updateOneCategory: { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, active: boolean, created: any, updated: any } };

export type CreateOneProductMutationVariables = Exact<{
  input: CreateOneProductInput;
}>;


export type CreateOneProductMutation = { __typename?: 'Mutation', createOneProduct: { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, price: number, categoryId?: string | null, brandId?: string | null, active: boolean, created: any, updated: any } };

export type DeleteOneProductMutationVariables = Exact<{
  input: DeleteOneProductInput;
}>;


export type DeleteOneProductMutation = { __typename?: 'Mutation', deleteOneProduct: { __typename?: 'ProductDeleteResponse', id?: string | null } };

export type UpdateOneProductMutationVariables = Exact<{
  input: UpdateOneProductInput;
}>;


export type UpdateOneProductMutation = { __typename?: 'Mutation', updateOneProduct: { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, price: number, categoryId?: string | null, brandId?: string | null, active: boolean, created: any, updated: any } };

export type CreateOneProfileMutationVariables = Exact<{
  input: CreateOneProfileInput;
}>;


export type CreateOneProfileMutation = { __typename?: 'Mutation', createOneProfile: { __typename?: 'Profile', id: string, tenantId: string, resolvers: Array<string>, created: any, updated: any } };

export type UpdateOneProfileMutationVariables = Exact<{
  input: UpdateOneProfileInput;
}>;


export type UpdateOneProfileMutation = { __typename?: 'Mutation', updateOneProfile: { __typename?: 'Profile', id: string, tenantId: string, resolvers: Array<string>, created: any, updated: any } };

export type DeleteOneProfileMutationVariables = Exact<{
  input: DeleteOneProfileInput;
}>;


export type DeleteOneProfileMutation = { __typename?: 'Mutation', deleteOneProfile: { __typename?: 'ProfileDeleteResponse', id?: string | null } };

export type CreateTenantMutationVariables = Exact<{
  input: CreateOneTenantInput;
}>;


export type CreateTenantMutation = { __typename?: 'Mutation', createOneTenant: { __typename?: 'Tenant', id: string, name: string, domain: string, active: boolean, created: any, updated: any } };

export type UpdateTenantMutationVariables = Exact<{
  input: UpdateOneTenantInput;
}>;


export type UpdateTenantMutation = { __typename?: 'Mutation', updateOneTenant: { __typename?: 'Tenant', id: string, name: string, domain: string, active: boolean, created: any, updated: any } };

export type DeleteTenantMutationVariables = Exact<{
  input: DeleteOneTenantInput;
}>;


export type DeleteTenantMutation = { __typename?: 'Mutation', deleteOneTenant: { __typename?: 'TenantDeleteResponse', id?: string | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateOneUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createOneUser: { __typename?: 'User', id: string, email: string, created: any } };

export type GetAllBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBrandsQuery = { __typename?: 'Query', brands: { __typename?: 'BrandConnection', edges: Array<{ __typename?: 'BrandEdge', node: { __typename?: 'Brand', id: string, name: string, slug: string, description?: string | null, logoUrl?: string | null, website?: string | null, country?: string | null, active: boolean, created: any, updated: any } }> } };

export type GetBrandQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBrandQuery = { __typename?: 'Query', brand: { __typename?: 'Brand', id: string, name: string, slug: string, description?: string | null, logoUrl?: string | null, website?: string | null, country?: string | null, active: boolean, created: any, updated: any } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategoryConnection', edges: Array<{ __typename?: 'CategoryEdge', node: { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, active: boolean, created: any, updated: any } }> } };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, active: boolean, created: any, updated: any } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, active: boolean, roles: Array<string> } };

export type GetProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfilesQuery = { __typename?: 'Query', profiles: { __typename?: 'ProfileConnection', edges: Array<{ __typename?: 'ProfileEdge', node: { __typename?: 'Profile', id: string, tenantId: string, resolvers: Array<string>, created: any, updated: any } }> } };

export type GetProfileQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', id: string, tenantId: string, resolvers: Array<string>, created: any, updated: any } };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductConnection', edges: Array<{ __typename?: 'ProductEdge', node: { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, price: number, categoryId?: string | null, brandId?: string | null, active: boolean, created: any, updated: any } }> } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, price: number, categoryId?: string | null, brandId?: string | null, active: boolean, created: any, updated: any } };

export type ListResolversQueryVariables = Exact<{ [key: string]: never; }>;


export type ListResolversQuery = { __typename?: 'Query', listResolvers: Array<{ __typename?: 'ResolverOperationDTO', moduleName?: string | null, resolverClass: string, resolverName?: string | null, methodName: string, schemaName: string, type: string, requiresAuth: boolean }> };

export type GetTenantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantsQuery = { __typename?: 'Query', tenants: { __typename?: 'TenantConnection', edges: Array<{ __typename?: 'TenantEdge', node: { __typename?: 'Tenant', id: string, name: string, domain: string, created: any, updated: any } }> } };

export type GetTenantQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTenantQuery = { __typename?: 'Query', tenant: { __typename?: 'Tenant', id: string, name: string, domain: string, created: any, updated: any } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, email: string, created: any } }> } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, created: any } };


export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
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
export const CreateOneBrandDocument = gql`
    mutation CreateOneBrand($input: CreateOneBrandInput!) {
  createOneBrand(input: $input) {
    id
    name
    slug
    description
    logoUrl
    website
    country
    active
    created
    updated
  }
}
    `;

/**
 * __useCreateOneBrandMutation__
 *
 * To run a mutation, you first call `useCreateOneBrandMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneBrandMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateOneBrandMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateOneBrandMutation(options: VueApolloComposable.UseMutationOptions<CreateOneBrandMutation, CreateOneBrandMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateOneBrandMutation, CreateOneBrandMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateOneBrandMutation, CreateOneBrandMutationVariables>(CreateOneBrandDocument, options);
}
export type CreateOneBrandMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateOneBrandMutation, CreateOneBrandMutationVariables>;
export const DeleteOneBrandDocument = gql`
    mutation DeleteOneBrand($input: DeleteOneBrandInput!) {
  deleteOneBrand(input: $input) {
    id
  }
}
    `;

/**
 * __useDeleteOneBrandMutation__
 *
 * To run a mutation, you first call `useDeleteOneBrandMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneBrandMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteOneBrandMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOneBrandMutation(options: VueApolloComposable.UseMutationOptions<DeleteOneBrandMutation, DeleteOneBrandMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteOneBrandMutation, DeleteOneBrandMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteOneBrandMutation, DeleteOneBrandMutationVariables>(DeleteOneBrandDocument, options);
}
export type DeleteOneBrandMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteOneBrandMutation, DeleteOneBrandMutationVariables>;
export const UpdateOneBrandDocument = gql`
    mutation UpdateOneBrand($input: UpdateOneBrandInput!) {
  updateOneBrand(input: $input) {
    id
    name
    slug
    description
    logoUrl
    website
    country
    active
    created
    updated
  }
}
    `;

/**
 * __useUpdateOneBrandMutation__
 *
 * To run a mutation, you first call `useUpdateOneBrandMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneBrandMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateOneBrandMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOneBrandMutation(options: VueApolloComposable.UseMutationOptions<UpdateOneBrandMutation, UpdateOneBrandMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateOneBrandMutation, UpdateOneBrandMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateOneBrandMutation, UpdateOneBrandMutationVariables>(UpdateOneBrandDocument, options);
}
export type UpdateOneBrandMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateOneBrandMutation, UpdateOneBrandMutationVariables>;
export const CreateOneCategoryDocument = gql`
    mutation CreateOneCategory($input: CreateOneCategoryInput!) {
  createOneCategory(input: $input) {
    id
    name
    description
    slug
    active
    created
    updated
  }
}
    `;

/**
 * __useCreateOneCategoryMutation__
 *
 * To run a mutation, you first call `useCreateOneCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateOneCategoryMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateOneCategoryMutation(options: VueApolloComposable.UseMutationOptions<CreateOneCategoryMutation, CreateOneCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>(CreateOneCategoryDocument, options);
}
export type CreateOneCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>;
export const DeleteOneCategoryDocument = gql`
    mutation DeleteOneCategory($input: DeleteOneCategoryInput!) {
  deleteOneCategory(input: $input) {
    id
  }
}
    `;

/**
 * __useDeleteOneCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteOneCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteOneCategoryMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOneCategoryMutation(options: VueApolloComposable.UseMutationOptions<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>(DeleteOneCategoryDocument, options);
}
export type DeleteOneCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>;
export const UpdateOneCategoryDocument = gql`
    mutation UpdateOneCategory($input: UpdateOneCategoryInput!) {
  updateOneCategory(input: $input) {
    id
    name
    slug
    description
    active
    created
    updated
  }
}
    `;

/**
 * __useUpdateOneCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateOneCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateOneCategoryMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOneCategoryMutation(options: VueApolloComposable.UseMutationOptions<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>(UpdateOneCategoryDocument, options);
}
export type UpdateOneCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>;
export const CreateOneProductDocument = gql`
    mutation CreateOneProduct($input: CreateOneProductInput!) {
  createOneProduct(input: $input) {
    id
    name
    slug
    description
    price
    categoryId
    brandId
    active
    created
    updated
  }
}
    `;

/**
 * __useCreateOneProductMutation__
 *
 * To run a mutation, you first call `useCreateOneProductMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneProductMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateOneProductMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateOneProductMutation(options: VueApolloComposable.UseMutationOptions<CreateOneProductMutation, CreateOneProductMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateOneProductMutation, CreateOneProductMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateOneProductMutation, CreateOneProductMutationVariables>(CreateOneProductDocument, options);
}
export type CreateOneProductMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateOneProductMutation, CreateOneProductMutationVariables>;
export const DeleteOneProductDocument = gql`
    mutation DeleteOneProduct($input: DeleteOneProductInput!) {
  deleteOneProduct(input: $input) {
    id
  }
}
    `;

/**
 * __useDeleteOneProductMutation__
 *
 * To run a mutation, you first call `useDeleteOneProductMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneProductMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteOneProductMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOneProductMutation(options: VueApolloComposable.UseMutationOptions<DeleteOneProductMutation, DeleteOneProductMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteOneProductMutation, DeleteOneProductMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteOneProductMutation, DeleteOneProductMutationVariables>(DeleteOneProductDocument, options);
}
export type DeleteOneProductMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteOneProductMutation, DeleteOneProductMutationVariables>;
export const UpdateOneProductDocument = gql`
    mutation UpdateOneProduct($input: UpdateOneProductInput!) {
  updateOneProduct(input: $input) {
    id
    name
    slug
    description
    price
    categoryId
    brandId
    active
    created
    updated
  }
}
    `;

/**
 * __useUpdateOneProductMutation__
 *
 * To run a mutation, you first call `useUpdateOneProductMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneProductMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateOneProductMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOneProductMutation(options: VueApolloComposable.UseMutationOptions<UpdateOneProductMutation, UpdateOneProductMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateOneProductMutation, UpdateOneProductMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateOneProductMutation, UpdateOneProductMutationVariables>(UpdateOneProductDocument, options);
}
export type UpdateOneProductMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateOneProductMutation, UpdateOneProductMutationVariables>;
export const CreateOneProfileDocument = gql`
    mutation CreateOneProfile($input: CreateOneProfileInput!) {
  createOneProfile(input: $input) {
    id
    tenantId
    resolvers
    created
    updated
  }
}
    `;

/**
 * __useCreateOneProfileMutation__
 *
 * To run a mutation, you first call `useCreateOneProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateOneProfileMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateOneProfileMutation(options: VueApolloComposable.UseMutationOptions<CreateOneProfileMutation, CreateOneProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateOneProfileMutation, CreateOneProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateOneProfileMutation, CreateOneProfileMutationVariables>(CreateOneProfileDocument, options);
}
export type CreateOneProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateOneProfileMutation, CreateOneProfileMutationVariables>;
export const UpdateOneProfileDocument = gql`
    mutation UpdateOneProfile($input: UpdateOneProfileInput!) {
  updateOneProfile(input: $input) {
    id
    tenantId
    resolvers
    created
    updated
  }
}
    `;

/**
 * __useUpdateOneProfileMutation__
 *
 * To run a mutation, you first call `useUpdateOneProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateOneProfileMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOneProfileMutation(options: VueApolloComposable.UseMutationOptions<UpdateOneProfileMutation, UpdateOneProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>(UpdateOneProfileDocument, options);
}
export type UpdateOneProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>;
export const DeleteOneProfileDocument = gql`
    mutation DeleteOneProfile($input: DeleteOneProfileInput!) {
  deleteOneProfile(input: $input) {
    id
  }
}
    `;

/**
 * __useDeleteOneProfileMutation__
 *
 * To run a mutation, you first call `useDeleteOneProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteOneProfileMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOneProfileMutation(options: VueApolloComposable.UseMutationOptions<DeleteOneProfileMutation, DeleteOneProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteOneProfileMutation, DeleteOneProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteOneProfileMutation, DeleteOneProfileMutationVariables>(DeleteOneProfileDocument, options);
}
export type DeleteOneProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteOneProfileMutation, DeleteOneProfileMutationVariables>;
export const CreateTenantDocument = gql`
    mutation CreateTenant($input: CreateOneTenantInput!) {
  createOneTenant(input: $input) {
    id
    name
    domain
    active
    created
    updated
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
    mutation UpdateTenant($input: UpdateOneTenantInput!) {
  updateOneTenant(input: $input) {
    id
    name
    domain
    active
    created
    updated
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
    mutation DeleteTenant($input: DeleteOneTenantInput!) {
  deleteOneTenant(input: $input) {
    id
  }
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
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTenantMutation(options: VueApolloComposable.UseMutationOptions<DeleteTenantMutation, DeleteTenantMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteTenantMutation, DeleteTenantMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteTenantMutation, DeleteTenantMutationVariables>(DeleteTenantDocument, options);
}
export type DeleteTenantMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteTenantMutation, DeleteTenantMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateOneUserInput!) {
  createOneUser(input: $input) {
    id
    email
    created
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
 *     input: // value for 'input'
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
    edges {
      node {
        id
        name
        slug
        description
        logoUrl
        website
        country
        active
        created
        updated
      }
    }
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
    query GetBrand($id: ID!) {
  brand(id: $id) {
    id
    name
    slug
    description
    logoUrl
    website
    country
    active
    created
    updated
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
    edges {
      node {
        id
        name
        slug
        description
        active
        created
        updated
      }
    }
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
    query GetCategory($id: ID!) {
  category(id: $id) {
    id
    name
    slug
    description
    active
    created
    updated
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
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    active
    roles
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
export const GetProfilesDocument = gql`
    query GetProfiles {
  profiles {
    edges {
      node {
        id
        tenantId
        resolvers
        created
        updated
      }
    }
  }
}
    `;

/**
 * __useGetProfilesQuery__
 *
 * To run a query within a Vue component, call `useGetProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetProfilesQuery();
 */
export function useGetProfilesQuery(options: VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetProfilesQuery, GetProfilesQueryVariables>(GetProfilesDocument, {}, options);
}
export function useGetProfilesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetProfilesQuery, GetProfilesQueryVariables>(GetProfilesDocument, {}, options);
}
export type GetProfilesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetProfilesQuery, GetProfilesQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($id: ID!) {
  profile(id: $id) {
    id
    tenantId
    resolvers
    created
    updated
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a Vue component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetProfileQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetProfileQuery(variables: GetProfileQueryVariables | VueCompositionApi.Ref<GetProfileQueryVariables> | ReactiveFunction<GetProfileQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, variables, options);
}
export function useGetProfileLazyQuery(variables?: GetProfileQueryVariables | VueCompositionApi.Ref<GetProfileQueryVariables> | ReactiveFunction<GetProfileQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, variables, options);
}
export type GetProfileQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetProfileQuery, GetProfileQueryVariables>;
export const GetAllProductsDocument = gql`
    query GetAllProducts {
  products {
    edges {
      node {
        id
        name
        slug
        description
        price
        categoryId
        brandId
        active
        created
        updated
      }
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
    query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    slug
    description
    price
    categoryId
    brandId
    active
    created
    updated
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
export const ListResolversDocument = gql`
    query ListResolvers {
  listResolvers {
    moduleName
    resolverClass
    resolverName
    methodName
    schemaName
    type
    requiresAuth
  }
}
    `;

/**
 * __useListResolversQuery__
 *
 * To run a query within a Vue component, call `useListResolversQuery` and pass it any options that fit your needs.
 * When your component renders, `useListResolversQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useListResolversQuery();
 */
export function useListResolversQuery(options: VueApolloComposable.UseQueryOptions<ListResolversQuery, ListResolversQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ListResolversQuery, ListResolversQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ListResolversQuery, ListResolversQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ListResolversQuery, ListResolversQueryVariables>(ListResolversDocument, {}, options);
}
export function useListResolversLazyQuery(options: VueApolloComposable.UseQueryOptions<ListResolversQuery, ListResolversQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ListResolversQuery, ListResolversQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ListResolversQuery, ListResolversQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ListResolversQuery, ListResolversQueryVariables>(ListResolversDocument, {}, options);
}
export type ListResolversQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ListResolversQuery, ListResolversQueryVariables>;
export const GetTenantsDocument = gql`
    query GetTenants {
  tenants {
    edges {
      node {
        id
        name
        domain
        created
        updated
      }
    }
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
    query GetTenant($id: ID!) {
  tenant(id: $id) {
    id
    name
    domain
    created
    updated
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
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  users {
    edges {
      node {
        id
        email
        created
      }
    }
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
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    created
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