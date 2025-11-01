<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="isEditing ? 'Edit Tenant' : 'Create Tenant'"
      icon="fa6-solid:building"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
    </the-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="tenant.name"
              label="Tenant Name"
              :rules="nameRules"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <UserFinder v-model="tenant.ownerId" label="Owner" />
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-h6">Owner and Users</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-alert type="info" variant="tonal" density="compact">
                      {{ currentTenant?.owner?.name?.first }} {{ currentTenant?.owner?.name?.last }} ({{ currentTenant?.owner?.email }})
                    </v-alert>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-chip-group class="d-flex flex-wrap" column>
                      <v-chip
                        v-for="u in tenantUsers"
                        :key="u.id"
                        class="ma-1"
                        color="secondary"
                        label
                      >
                        {{ u.name?.first }} {{ u.name?.last }} — {{ u.email }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              type="submit"
              :color="isEditing ? 'primary' : 'success'"
              :loading="saving"
              :disabled="!valid"
            >
              {{ isEditing ? 'Update' : 'Create' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTenants } from '@/composables/useTenants'
import { TheCardTitle } from '@/components'
import UserFinder from '@/components/UserFinder.vue'
import { useInterfaceStore } from '@/stores/interfaceStore'

const route = useRoute()
const router = useRouter()

const form = ref()
const valid = ref(false)
const interfaceStore = useInterfaceStore()
const saving = computed(() => interfaceStore.isLoading('tenant-save'))

const tenant = ref({
  name: '',
  ownerId: ''
})

const isEditing = computed(() => route.name === 'tenantsEdit')
const tenantId = computed(() => route.params.id as string)

const { fetchTenant, currentTenant, createOneTenant, updateOneTenant, fetchTenantUsers, tenantUsers } = useTenants()

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length >= 2 || 'Name must have at least 2 characters'
]

const ownerRules = [
  (v: string) => !!v || 'Owner is required'
]

// Methods
const submit = async () => {
  if (!valid.value) return
  
  const inputBase = {
    name: tenant.value.name,
    ownerId: tenant.value.ownerId,
  }
  if (isEditing.value) {
    await updateOneTenant({
      id: tenantId.value,
      update: {
        ...inputBase
      }
    })
  } else {
    await createOneTenant({ tenant: inputBase })
  }
  router.push({ name: 'tenantsList' })
}

// Load tenant data if editing
onMounted(async () => {
  if (isEditing.value && tenantId.value) {
    await fetchTenant(tenantId.value)
    if (currentTenant.value) {
      tenant.value = {
        name: currentTenant.value.name,
        ownerId: currentTenant.value.ownerId || ''
      }
    }
    await fetchTenantUsers(tenantId.value)
  }
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>