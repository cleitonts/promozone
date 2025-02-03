<template>
  <div>
    <v-row v-if="limit" class="justify-content-between px-0">
      <v-col cols="3" md="2" class="ml-auto">
        <v-select
          v-model="internalLimit"
          label="Page limit"
          item-text="text"
          item-value="value"
          required
          :items="profiles"
          :rules="[(v) => !!v || 'Select a valid limit']"
          @input="$emit('update:limit', $event)"
        />
      </v-col>
    </v-row>
    <v-table v-if="getCleanedMatrix.length">
      <slot name="thead">
        <thead>
          <tr>
            <th v-for="item in getHeader" :key="item">
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
                  <span v-if="i === 'id'">
                    {{ r ? r.substring(0, 4) + ' ..' : '-' }}
                  </span>
                  <span v-else>
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
      <slot name="pagination">
        <div class="text-center mt-4">
          <v-pagination
            v-model="internalPage"
            density="comfortable"
            active-color="secondary"
            :length="Math.ceil(matrix?.[0]?.totalItems / limit) || page + 6"
            :total-visible="7"
          />
        </div>
      </slot>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Formatter {
  [key: string]: string
}

interface Header {
  [key: string]: string
}

interface MatrixItem {
  [key: string]: any
  totalItems?: number
}

interface Props {
  matrix?: MatrixItem[]
  header?: Header
  formatter?: Formatter
  page?: number
  limit?: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:page', value: number): void
  (event: 'updateSearch'): void
  (event: 'update:limit', value: number): void
}>()

const profiles = ref([10, 50, 100, 500])

const internalPage = computed<number>({
  get: () => props.page ?? 1,
  set: (value) => {
    emit('update:page', value)
    emit('updateSearch')
  },
})

const internalLimit = computed<number>({
  get: () => props.limit ?? 10,
  set: (value) => {
    emit('update:limit', value)
    emit('updateSearch')
  },
})

const getCleanedMatrix = computed(() => {
  if (!props.matrix) return []

  return props.matrix.map((item) => {
    const temp: Record<string, any> = {}

    if (props.header) {
      for (const headerKey in props.header) {
        temp[headerKey] = item[headerKey]
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

function doFormat(type: string, value: any): any {
  if (!value) return value

  switch (type) {
    case 'date':
      return new Date(value).toLocaleDateString()
    default:
      return value
  }
}
</script>
