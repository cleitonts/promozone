<template>
  <v-autocomplete
    v-model="selected"
    v-model:search="search"
    :items="options"
    :label="label"
    item-title="display"
    item-value="id"
    density="compact"
    variant="underlined"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useGetAllUsersLazyQuery, useSearchUsersLazyQuery, type GetAllUsersQuery } from '@/generated/graphql'

interface Props {
  modelValue: string | null
  label?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get: () => props.modelValue ?? '',
  set: (val: string) => emit('update:modelValue', val)
})

const search = ref('')
const loading = ref(false)
const options = ref<Array<{ id: string; display: string }>>([])
type UserNode = GetAllUsersQuery['users']['edges'][number]['node']
const allUsers = ref<UserNode[]>([])

const { load: loadAllUsers, onResult: onAllUsersResult } = useGetAllUsersLazyQuery({ fetchPolicy: 'network-only' })
const { refetch: refetchSearchUsers, onResult: onSearchUsersResult } = useSearchUsersLazyQuery({}, { fetchPolicy: 'network-only' })

const mapUsersToOptions = (users: UserNode[]) => {
  return users.map((u: UserNode) => ({
    id: u.id,
    display: `${u.name?.first ?? ''} ${u.name?.last ?? ''} — ${u.email}`.trim()
  }))
}

let debounceId: number | undefined

const runSearch = async (term: string) => {
  loading.value = true
  try {
    const pattern = term ? `%${term}%` : undefined
    await new Promise<void>((resolve) => {
      onSearchUsersResult((res) => {
        const edges = (res.data?.users?.edges ?? []) as { node: UserNode }[]
        const nodes: UserNode[] = edges.map((edge) => edge.node)

        const termLower = term.toLowerCase()
        const nameMatches = allUsers.value.filter((u: UserNode) => {
          const first = u.name?.first ?? ''
          const last = u.name?.last ?? ''
          const full = `${first} ${last}`.toLowerCase()
          return term && full.includes(termLower)
        })

        const merged: Record<string, UserNode> = {}
        nodes.forEach((u: UserNode) => { merged[u.id] = u })
        nameMatches.forEach((u: UserNode) => { merged[u.id] = u })

        options.value = mapUsersToOptions(Object.values(merged))
        resolve()
      })
      refetchSearchUsers({ emailLike: pattern })
    })
  } finally {
    loading.value = false
  }
}

watch(search, (term: string) => {
  if (debounceId) {
    clearTimeout(debounceId)
  }
  debounceId = window.setTimeout(() => {
    runSearch(term || '')
  }, 2000)
})

onMounted(async () => {
  await new Promise<void>((resolve) => {
    onAllUsersResult((res) => {
      const edges = (res.data?.users?.edges ?? []) as { node: UserNode }[]
      const nodes: UserNode[] = edges.map((edge) => edge.node)
      allUsers.value = nodes
      options.value = mapUsersToOptions(nodes)
      resolve()
    })
    loadAllUsers()
  })
})
</script>

<style scoped>
</style>