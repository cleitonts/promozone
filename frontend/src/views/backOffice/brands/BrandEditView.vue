<template>
  <v-card class="overflow-visible">
    <the-card-title
      :text="t('brand.editTitle')"
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
              :label="t('brand.fields.name')" 
              required 
            />
          </v-col>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.slug" 
              :rules="slugRules" 
              :label="t('brand.fields.slug')" 
              required 
            />
          </v-col>
          <v-col cols="12">
            <v-textarea 
              v-model="brand.description" 
              :label="t('brand.fields.description')" 
              rows="3"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.logoUrl" 
              :label="t('brand.fields.logo_url')" 
              type="url"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.website" 
              :label="t('brand.fields.website')" 
              type="url"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field 
              v-model="brand.country" 
              :label="t('brand.fields.country')" 
            />
          </v-col>
          <v-col cols="6">
            <v-switch 
              v-model="brand.active" 
              :label="t('brand.fields.active')" 
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
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { useBrandStore } from '@/stores/brandStore'
import { useBrands } from '@/composables/brands'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()
// const brandStore = useBrandStore()
const { fetchBrand, currentBrand, loading, createBrand, updateBrand } = useBrands()

const brand = ref<{ name: string; slug: string; description?: string; logoUrl?: string; website?: string; country?: string; active?: boolean}>({
  name: '',
  slug: '',
  description: '',
  logoUrl: '',
  website: '',
  country: '',
  active: true
})

const isEdit = computed(() => !!route.params.id)

const nameRules = [
  (v: string) => !!v || t('brand.fields.name') + ' ' + 'is required',
  (v: string) => v.length >= 2 || 'Brand name must be at least 2 characters'
]

const slugRules = [
  (v: string) => !!v || t('brand.fields.slug') + ' ' + 'is required',
  (v: string) => /^[a-z0-9-]+$/.test(v) || 'Slug must contain only lowercase letters, numbers, and hyphens'
]

const validate = async () => {
  // Basic validation
  if (!brand.value.name || !brand.value.slug) {
    return
  }

  try {
    if (isEdit.value) {
      const updated = await updateBrand({
        id: String(route.params.id),
        update: {
          name: brand.value.name,
          slug: brand.value.slug,
          description: brand.value.description,
          logoUrl: brand.value.logoUrl,
          website: brand.value.website,
          country: brand.value.country,
          active: brand.value.active,
        }
      })
      if (updated) router.push({ name: 'brandsList' })
    } else {
      const created = await createBrand({
        brand: {
          name: brand.value.name,
          slug: brand.value.slug,
          description: brand.value.description,
          logoUrl: brand.value.logoUrl,
          website: brand.value.website,
          country: brand.value.country,
          active: brand.value.active,
        }
      })
      if (created) router.push({ name: 'brandsList' })
    }
  } catch (error) {
    console.error('Error saving brand:', error)
  }
}

const loadBrand = async () => {
  if (isEdit.value && route.params.id) {
    try {
      await fetchBrand(Number(route.params.id))
      if (currentBrand.value) {
        brand.value = {
          name: currentBrand.value.name,
          slug: currentBrand.value.slug,
          description: currentBrand.value.description || '',
          logoUrl: currentBrand.value.logoUrl || '',
          website: currentBrand.value.website || '',
          country: currentBrand.value.country || '',
          active: currentBrand.value.active
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