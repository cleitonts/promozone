<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('brand.listTitle')"
      icon="fa6-solid:tag"
      bg-color="bg-secondary-gradient"
      text-color="white"
    >
      <template #after>
        <v-col cols="6" class="pa-0 d-flex justify-end">
          <v-btn
            rounded
            color="secondary"
            icon="fa6-solid:plus"
            class="position-absolute mt-n5 mb-3"
            :to="{ name: 'brandsNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="brands"
        :header="headers"
        @update="getList()"
      >
        <template #prepend>
          <v-col cols="6">
            <v-text-field v-model="searchName" :label="t('brand.filters.name')" />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="selectedStatus"
              :items="statusOptions"
              item-title="text"
              item-value="value"
              :label="t('common.status')"
              clearable
            />
          </v-col>
        </template>
        <template #action="{ element }">
          <td class="actions to-none pa-1">
            <v-btn
              color="primary"
              size="x-small"
              icon="fa6-solid:pen"
              :to="{ name: 'brandsEdit', params: { id: element.id } }"
            />
            <v-btn
              color="error"
              size="x-small"
              icon="fa6-solid:trash"
              @click="deleteBrand(element.id)"
              class="ml-1"
            />
          </td>
        </template>
      </base-grid>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { BaseGrid, TheCardTitle } from '@/components'
import { onMounted, ref, watch } from 'vue'
import { useBrands } from '@/composables/brands'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { fetchAllBrands, brands: brandsSource, removeBrand } = useBrands()
const searchName = ref('')
const selectedStatus = ref(null)
const brands = ref<any[]>([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(10)

const headers = {
  action: '#',
  id: t('common.id'),
  name: t('common.name'),
  slug: t('common.slug'),
  description: t('common.description'),
  website: t('common.website'),
  country: t('common.country'),
  is_active: t('common.status')
}

const statusOptions = [
  { text: t('common.active'), value: true },
  { text: t('common.inactive'), value: false }
]

const getList = async function () {
  await fetchAllBrands()
  // Filter brands based on search criteria
  let filteredBrands = (brandsSource.value as any[]) || []
  
  if (searchName.value) {
    filteredBrands = filteredBrands.filter((brand: any) => 
      brand.name.toLowerCase().includes(searchName.value.toLowerCase())
    )
  }
  
  if (selectedStatus.value !== null) {
    filteredBrands = filteredBrands.filter((brand: any) => 
      brand.is_active === selectedStatus.value
    )
  }
  
  // Apply pagination
  const startIndex = (page.value - 1) * limit.value
  const endIndex = startIndex + limit.value
  brands.value = filteredBrands.slice(startIndex, endIndex).map((brand: any) => ({
    ...brand,
    is_active: brand.active ? t('common.active') : t('common.inactive'),
    description: brand.description ? brand.description.substring(0, 50) + '...' : '-'
  }))
  
  totalItems.value = filteredBrands.length
}

const deleteBrand = async (id: string | number) => {
  if (confirm(t('brand.confirmDelete'))) {
    try {
      await removeBrand(String(id))
      await getList()
    } catch (error) {
      console.error('Error deleting brand:', error)
    }
  }
}

watch([searchName, selectedStatus], () => {
  page.value = 1
  getList()
})

watch([page, limit], () => {
  getList()
})

onMounted(() => {
  getList()
})
</script>