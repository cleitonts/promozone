<template>
  <div>
    <v-form class="d-flex" @submit.prevent="$emit('update')">
      <v-row>
        <slot name="prepend"></slot>
        <template class="d-flex d-sm-none v-col">
          <v-col cols="6" v-if="$slots.prepend">
            <v-btn class="ml-auto" color="secondary" prepend-icon="fa6-solid:magnifying-glass" type="submit">
              search
            </v-btn>
          </v-col>
          <v-col cols="6" class="ml-auto">
            <v-select
              :model-value="limit"
              label="Page limit"
              item-text="text"
              item-value="value"
              required
              :items="itemsPerPage"
              :rules="[(v) => !!v || 'Select a valid limit']"
              @update:modelValue="
                (e) => {
                  $emit('update:limit', e)
                  $emit('update')
                }
              "
            />
          </v-col>
        </template>
        <template class="d-none d-sm-flex v-col">
          <v-col v-if="$slots.prepend">
            <v-btn class="ml-auto" color="secondary" prepend-icon="fa6-solid:magnifying-glass" type="submit">
              search
            </v-btn>
          </v-col>
          <v-col cols="6" md="2" class="ml-auto">
            <v-select
              :model-value="limit"
              label="Page limit"
              item-text="text"
              item-value="value"
              required
              :items="itemsPerPage"
              :rules="[(v) => !!v || 'Select a valid limit']"
              @update:modelValue="
                (e) => {
                  $emit('update:limit', e)
                  $emit('update')
                }
              "
            />
          </v-col>
        </template>
      </v-row>
    </v-form>
    <v-table v-if="getCleanedMatrix.length">
      <slot name="thead">
        <thead>
          <tr>
            <th v-for="(item, key) in getHeader" :key="key">
              {{ item }}
            </th>
          </tr>
        </thead>
      </slot>
      <slot name="tbody">
        <tbody>
          <tr v-for="(item, index) in getCleanedMatrix" :key="index">
            <template v-for="(r, i) in item">
              <slot :item="item" :index="index" :element="item" :text="r" :name="i">
                <td :key="i" :title="r">
                  <span>
                    {{ r ? r : '-' }}
                  </span>
                </td>
              </slot>
            </template>
          </tr>
        </tbody>
      </slot>
    </v-table>
    <div v-else>
      <div class="subtitle-bread text-center mt-15">
        There's no item to list. You can modify the filter or the page.
      </div>
    </div>
    <v-row v-if="page" class="justify-center mt-0">
      <div class="text-center mt-4">
        <v-pagination
          :value="page"
          density="comfortable"
          active-color="secondary"
          :length="Math.ceil(totalItems / limit || page + 4)"
          :total-visible="7"
          @update:modelValue="
            (e) => {
              $emit('update:page', e)
              $emit('update')
            }
          "
        />
      </div>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  matrix?: Record<string, string | number>[]
  header?: Record<string, string>
  formatter?: Record<string, string>
  page?: number
  limit?: number
  totalItems?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 10,
  totalItems: 0,
})

defineEmits<{
  (event: 'update:page', value: number): void
  (event: 'update'): void
  (event: 'update:limit', value: number): void
}>()

const itemsPerPage = ref([10, 50, 100, 500])

const getCleanedMatrix = computed(() => {
  if (!props.matrix) return []

  return props.matrix.map((item) => {
    const temp: Record<string, string> = {}

    if (props.header) {
      for (const headerKey in props.header) {
        temp[headerKey] = item[headerKey]?.toString()
      }
    }

    if (props.formatter) {
      for (const formatterKey in props.formatter) {
        temp[formatterKey] = doFormat(props.formatter[formatterKey], temp[formatterKey])
      }
    }

    return temp
  })
})

const getHeader = computed(() => {
  if (props.header) return props.header
  if (props.matrix?.length) return Object.keys(props.matrix[0])
  return []
})

function doFormat(type: string, value: string): string {
  if (!value) return value

  switch (type) {
    case 'date':
      return new Date(value).toLocaleDateString()
    default:
      return value
  }
}
</script>
