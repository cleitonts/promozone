<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('category.editTitle')"
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
              :label="t('category.fields.name')" 
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
        {{ t('common.cancel') }}
      </v-btn>
      <v-btn 
        color="primary" 
        @click="validate"
        :loading="loading"
      >
        {{ isEdit ? t('common.update') : t('common.create') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { TheCardTitle } from '@/components'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategories } from '@/composables/categories'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { fetchCategory, currentCategory, loading, createOneCategory, updateOneCategory } = useCategories()

const route = useRoute()
const router = useRouter()
const category = ref<{ name: string; description?: string; slug?: string; active?: boolean}>({
  name: ''
})

const isEdit = computed(() => !!route.params.id)

const nameRules = [
  (v: string) => !!v || t('category.fields.name') + ' ' + 'is required',
  (v: string) => v.length >= 2 || 'Category name must be at least 2 characters'
]

const validate = async () => {
  // Basic validation
  if (!category.value.name) {
    return
  }

  try {
    if (isEdit.value) {
      const updated = await updateOneCategory({
        id: String(route.params.id),
        update: {
          name: category.value.name,
          description: category.value.description,
          slug: category.value.slug,
          active: category.value.active
        }
      })
      if (updated) router.push({ name: 'categoriesList' })
    } else {
      const created = await createOneCategory({
        category: {
          name: category.value.name,
          description: category.value.description,
          slug: category.value.slug,
          active: category.value.active
        }
      })
      if (created) router.push({ name: 'categoriesList' })
    }
  } catch (error) {
    console.error('Error saving category:', error)
  }
}

const loadCategory = async () => {
  if (isEdit.value && route.params.id) {
    try {
      await fetchCategory(String(route.params.id))
      if (currentCategory.value) {
        category.value = {
          name: currentCategory.value.name
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