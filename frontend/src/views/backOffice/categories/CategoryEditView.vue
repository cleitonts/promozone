<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Category"
      icon="fa6-solid:tags"
      bg-color="bg-success-gradient"
      text-color="white"
    />

    <v-card-text>
      <v-form @submit.prevent="validate">
        <v-row>
          <v-col cols="12">
            <v-text-field 
              v-model="category.name" 
              :rules="nameRules" 
              label="Category Name" 
              required 
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn 
        color="secondary" 
        variant="outlined" 
        @click="$router.go(-1)"
      >
        Cancel
      </v-btn>
      <v-btn 
        color="primary" 
        @click="validate"
        :loading="categoryStore.loading"
      >
        {{ isEdit ? 'Update' : 'Create' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { TheCardTitle } from '@/components'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'
import { 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation,
  type CreateCategoryDto 
} from '@/generated/graphql'

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()
const { mutate: createCategoryMutation } = useCreateCategoryMutation()
const { mutate: updateCategoryMutation } = useUpdateCategoryMutation()

const category = ref<CreateCategoryDto>({
  name: ''
})

const isEdit = computed(() => !!route.params.id)

const nameRules = [
  (v: string) => !!v || 'Category name is required',
  (v: string) => v.length >= 2 || 'Category name must be at least 2 characters'
]

const validate = async () => {
  // Basic validation
  if (!category.value.name) {
    return
  }

  try {
    if (isEdit.value) {
      const result = await updateCategoryMutation({
        id: Number(route.params.id),
        updateCategoryInput: category.value
      })
      if (result?.data?.updateCategory) {
        router.push({ name: 'categoriesList' })
      }
    } else {
      const result = await createCategoryMutation({
        createCategoryInput: category.value
      })
      if (result?.data?.createCategory) {
        router.push({ name: 'categoriesList' })
      }
    }
  } catch (error) {
    console.error('Error saving category:', error)
  }
}

const loadCategory = async () => {
  if (isEdit.value && route.params.id) {
    try {
      await categoryStore.fetchCategory(Number(route.params.id))
      if (categoryStore.currentCategory) {
        category.value = {
          name: categoryStore.currentCategory.name
        }
      }
    } catch (error) {
      console.error('Error loading category:', error)
    }
  }
}

onMounted(() => {
  loadCategory()
})
</script>