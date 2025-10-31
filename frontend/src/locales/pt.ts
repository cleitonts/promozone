export default {
  errors: {
    sessionExpired: 'Sua sessão expirou. Faça login novamente.',
    unauthorizedRequest: 'Requisição não autorizada. Faça login e tente novamente.',
    accessDenied: 'Acesso negado. Você não tem permissão.',
    invalidInput: 'Entrada inválida',
  },
  menu: {
    home: 'Início',
    users: 'Usuários',
    perfil: 'Perfil',
    products: 'Produtos',
    brands: 'Marcas',
    categories: 'Categorias',
    administration: 'Administração',
    userRoles: 'Usuários',
    roles: 'Papéis',
    tenants: 'Locatários',
    permissions: 'Permissões',
  },
  app: {
    switchMenu: 'Alternar menu',
    logout: 'Sair',
    tenantsDropdownLabel: 'Tenant',
    tenantsSelect: 'Selecionar tenant',
    tenantsFavoritesEmpty: 'Sem favoritos',
    tenantsAvailable: 'Tenants disponíveis',
  },
  language: {
    english: 'Inglês',
    portuguese: 'Português',
    select: 'Selecionar idioma',
  },
  common: {
    id: 'Id',
    name: 'Nome',
    slug: 'Slug',
    description: 'Descrição',
    website: 'Site',
    country: 'País',
    status: 'Status',
    active: 'Ativo',
    inactive: 'Inativo',
    cancel: 'Cancelar',
    create: 'Criar',
    update: 'Atualizar',
    actions: 'Ações',
  },
  user: {
    listTitle: 'Usuários',
    editTitle: 'Usuário',
    fields: {
      email: 'E-mail',
      password: 'Senha',
      perfilId: 'Perfil ID',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      roles: 'Roles',
    },
    actions: {
      send: 'Enviar',
    },
    validation: {
      emailRequired: 'E-mail é obrigatório',
      emailInvalid: 'E-mail deve ser válido',
      passwordRequired: 'Senha é obrigatória',
      passwordMin: 'Senha deve ter pelo menos 6 caracteres',
      nameRequired: 'Campo obrigatório',
      nameMin: 'Deve ter pelo menos 2 caracteres',
      roleRequired: 'Pelo menos uma role deve ser selecionada',
    },
    admin: {
      listTitle: 'Usuários (Admin)',
      fields: {
        name: 'Nome',
        ownerTenantsCount: 'Tenants onde é owner',
        visibleTenantsCount: 'Tenants visíveis',
      },
      createTitle: 'Criar Novo Usuário',
      createSubtitle: 'Criar usuário com acesso administrativo ao sistema',
      tenantOptional: 'Tenant (Opcional)',
      globalUserHint: 'Deixe vazio para criar um usuário global',
      infoTitle: 'Informação:',
      infoBody: 'Este usuário será criado com privilégios administrativos. Certifique-se de atribuir as roles apropriadas.',
      createButton: 'Criar Usuário',
      createSuccess: 'Usuário criado com sucesso!',
      createError: 'Erro ao criar usuário',
    },
  },
  brand: {
    listTitle: 'Marcas',
    editTitle: 'Marca',
    filters: {
      name: 'Nome da marca',
      status: 'Status',
    },
    fields: {
      brand: 'Marca',
      name: 'Nome da marca',
      slug: 'Slug',
      description: 'Descrição',
      logo_url: 'URL do logo',
      website: 'Site',
      country: 'País',
      active: 'Ativo',
    },
    confirmDelete: 'Tem certeza que deseja excluir esta marca?',
  },
  category: {
    listTitle: 'Categorias',
    editTitle: 'Categoria',
    filters: {
      name: 'Nome da categoria',
    },
    fields: {
      category: 'Categoria',
      name: 'Nome da categoria',
    },
    confirmDelete: 'Tem certeza que deseja excluir esta categoria?',
  },
  product: {
    editTitle: 'Produto',
    fields: {
      name: 'Nome do produto',
      price: 'Preço',
      stock: 'Estoque',
    },
    confirmDelete: 'Tem certeza que deseja excluir este produto?',
  },
  perfil: {
    listTitle: 'Perfis',
    editTitle: 'Perfil',
    fields: {
      displayName: 'Nome do Perfil (exibição)',
      displayNamePlaceholder: 'Opcional: apenas para exibição',
    },
    loadingResolvers: 'Carregando permissões...',
    errors: {
      noTenant: 'Tenant atual não encontrado. Selecione um tenant.',
      createFailed: 'Falha ao criar perfil',
      generic: 'Erro ao salvar perfil',
    },
    confirmDeleteTitle: 'Excluir perfil: {name}',
    confirmDeleteDescription: 'Deseja excluir este perfil?',
  },
  adminDashboard: {
    title: 'Painel de Administração',
    subtitle: 'Área exclusiva para super administradores',
    users: {
      title: 'Gestão de Usuários',
      description: 'Criar novos usuários no sistema com diferentes níveis de acesso.',
      createButton: 'Criar Usuário'
    },
    tenants: {
      title: 'Gestão de Tenants',
      description: 'Criar e configurar novos tenants para organizações.',
      createButton: 'Criar Tenant',
      listTitle: 'Tenants',
      headers: {
        name: 'Nome',
        owner: 'Owner',
        created: 'Criado',
        actions: 'Ações'
      },
      favorite: 'Favoritar',
      unfavorite: 'Desfavoritar'
    }
  }
}