<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Categories"
      icon="fa6-solid:tags"
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
            :to="{ name: 'categoriesNew' }"
          />
        </v-col>
      </template>
    </the-card-title>

    <v-card-text>
      <base-grid
        v-model:page="page"
        v-model:limit="limit"
        :total-items="totalItems"
        :matrix="categories"
        :header="headers"
        @update="getList()"
      >
        <template #prepend>
          <v-col cols="6">
            <v-text-field v-model="searchName" label="Category Name" />
          </v-col>
        </template>
        <template #action="{ element }">
          <td class="actions to-none pa-1">
            <v-btn
              color="primary"
              size="x-small"
              icon="fa6-solid:pencil"
              :to="{ name: 'categoriesEdit', params: { id: element.id } }"
            />
            <v-btn
              color="error"
              size="x-small"
              icon="fa6-solid:trash"
              @click="deleteCategory(element.id)"
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
import { useCategoryStore } from '@/stores/categoryStore'
import { useRemoveCategoryMutation } from '@/generated/graphql'

const categoryStore = useCategoryStore()
const { mutate: removeCategory } = useRemoveCategoryMutation()
const searchName = ref('')
const categories = ref<any[]>([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(10)

const headers = {
  action: '#',
  id: 'Id',
  name: 'Name'
}

const getList = async function () {
  await categoryStore.fetchAllCategories()
  // Filter categories based on search criteria
  let filteredCategories = categoryStore.categories
  
  if (searchName.value) {
    filteredCategories = filteredCategories.filter((category: any) => 
      category.name.toLowerCase().includes(searchName.value.toLowerCase())
    )
  }
  
  if (filteredCategories) {
    categories.value = filteredCategories.map((category: any) => ({
      id: category.id || '',
      name: category.name || ''
    }))
    totalItems.value = categories.value.length
  }
}

const deleteCategory = async function (id: string) {
  if (confirm('Are you sure you want to delete this category?')) {
    try {
      await removeCategory({ id: parseInt(id) })
      await getList()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }
}

// Watch for search changes
watch([searchName], () => {
  getList()
})

onMounted(() => {
  getList()
})
</script>