<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4 pa-6">
            <v-icon left color="primary" size="large">mdi-shield-crown</v-icon>
            Painel de Administração
          </v-card-title>
          <v-card-subtitle class="px-6 pb-4">
            Área exclusiva para super administradores
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card class="h-100" hover>
          <v-card-title class="d-flex align-center">
            <v-icon left color="primary">mdi-account-plus</v-icon>
            Gestão de Usuários
          </v-card-title>
          <v-card-text>
            Criar novos usuários no sistema com diferentes níveis de acesso.
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="outlined"
              :to="{ name: 'adminUserCreate' }"
              prepend-icon="mdi-plus"
            >
              Criar Usuário
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="h-100" hover>
          <v-card-title class="d-flex align-center">
            <v-icon left color="secondary">mdi-domain</v-icon>
            Gestão de Tenants
          </v-card-title>
          <v-card-text>
            Criar e configurar novos tenants para organizações.
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="secondary"
              variant="outlined"
              :to="{ name: 'adminTenantCreate' }"
              prepend-icon="mdi-plus"
            >
              Criar Tenant
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon left color="warning">mdi-information</v-icon>
            Informações Importantes
          </v-card-title>
          <v-card-text>
            <v-alert type="warning" variant="tonal">
              <strong>Atenção:</strong> Esta área é restrita a super administradores.
              Todas as ações realizadas aqui afetam o sistema globalmente.
            </v-alert>
            <v-list>
              <v-list-item>
                <v-list-item-title>Criação de Usuários</v-list-item-title>
                <v-list-item-subtitle>
                  Permite criar usuários com acesso a qualquer tenant do sistema
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Criação de Tenants</v-list-item-title>
                <v-list-item-subtitle>
                  Permite criar novos tenants e definir seus proprietários
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Dashboard administrativo - sem lógica complexa necessária por enquanto
</script>