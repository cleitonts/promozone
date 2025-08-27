<template>
  <v-card class="overflow-visible">
    <the-card-title
      text="Brand"
      icon="fa6-solid:tag"
      bg-color="bg-success-gradient"
      text-color="white"
    />

    <v-card-text>
      <v-form @submit.prevent="validate">
        <v-row>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.name" 
              :rules="nameRules" 
              label="Brand Name" 
              required 
            />
          </v-col>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.slug" 
              :rules="slugRules" 
              label="Slug" 
              required 
            />
          </v-col>
          <v-col cols="12">
            <v-textarea 
              v-model="brand.description" 
              label="Description" 
              rows="3"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.logo_url" 
              label="Logo URL" 
              type="url"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.website" 
              label="Website" 
              type="url"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.country" 
              label="Country" 
            />
          </v-col>
          <v-col cols="6">
            <v-switch 
              v-model="brand.is_active" 
              label="Active" 
              color="success"
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
        :loading="brandStore.loading"
      >
        {{ isEdit ? 'Update' : 'Create' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { TheCardTitle } from '@/components'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBrandStore } from '@/stores/brandStore'
import { 
  useCreateBrandMutation, 
  useUpdateBrandMutation,
  type CreateBrandDto 
} from '@/generated/graphql'

const route = useRoute()
const router = useRouter()
const brandStore = useBrandStore()
const { mutate: createBrandMutation } = useCreateBrandMutation()
const { mutate: updateBrandMutation } = useUpdateBrandMutation()

const brand = ref<CreateBrandDto>({
  name: '',
  slug: '',
  description: '',
  logo_url: '',
  website: '',
  country: '',
  is_active: true
})

const isEdit = computed(() => !!route.params.id)

const nameRules = [
  (v: string) => !!v || 'Brand name is required',
  (v: string) => v.length >= 2 || 'Brand name must be at least 2 characters'
]

const slugRules = [
  (v: string) => !!v || 'Slug is required',
  (v: string) => /^[a-z0-9-]+$/.test(v) || 'Slug must contain only lowercase letters, numbers, and hyphens'
]

const validate = async () => {
  // Basic validation
  if (!brand.value.name || !brand.value.slug) {
    return
  }

  try {
    if (isEdit.value) {
      const result = await updateBrandMutation({
        id: Number(route.params.id),
        updateBrandInput: brand.value
      })
      if (result?.data?.updateBrand) {
        router.push({ name: 'brandsList' })
      }
    } else {
      const result = await createBrandMutation({
        createBrandInput: brand.value
      })
      if (result?.data?.createBrand) {
        router.push({ name: 'brandsList' })
      }
    }
  } catch (error) {
    console.error('Error saving brand:', error)
  }
}

const loadBrand = async () => {
  if (isEdit.value && route.params.id) {
    try {
      await brandStore.fetchBrand(Number(route.params.id))
      if (brandStore.currentBrand) {
        brand.value = {
          name: brandStore.currentBrand.name,
          slug: brandStore.currentBrand.slug,
          description: brandStore.currentBrand.description || '',
          logo_url: brandStore.currentBrand.logo_url || '',
          website: brandStore.currentBrand.website || '',
          country: brandStore.currentBrand.country || '',
          is_active: brandStore.currentBrand.is_active
        }
      }
    } catch (error) {
      console.error('Error loading brand:', error)
    }
  }
}

// Auto-generate slug from name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Watch for name changes to auto-generate slug
watch(() => brand.value.name, (newName) => {
  if (!isEdit.value && newName && !brand.value.slug) {
    brand.value.slug = generateSlug(newName)
  }
})

onMounted(() => {
  loadBrand()
})
</script>