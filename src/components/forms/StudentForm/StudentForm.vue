<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import api from '@/api/api'
import { StudentSchema, type StudentInput } from '@/schemas/StudentSchema'
import { FormControl, InputField, SelectField } from '@/components/ui/inputs'
import { DIFFICULTY_TYPES, RouteName } from '@/utils/constants'
import SelectAvatar from './SelectAvatar/SelectAvatar.vue'
import { useUserStoreValues } from '@/stores/user/userStore'
import { useStudentStore } from '@/stores/student/studentStore'

type Props = {
  defaultValues?: Partial<StudentInput>
  action: Extract<keyof typeof api.students, 'updateStudent' | 'addStudent'>
}
const props = defineProps<Props>()

const { user } = useUserStoreValues()
const { updateStudents } = useStudentStore()
const isAdding = computed(() => props.action === 'addStudent')
const loading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()
const { errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(StudentSchema),
  initialValues: props.defaultValues
})

const name = defineComponentBinds('name')
const avatar = defineComponentBinds('avatar')
const difficulty = defineComponentBinds('difficulty')
const roundLength = defineComponentBinds('roundLength')

const onSubmit = handleSubmit(async (data) => {
  try {
    loading.value = true

    if (!user.value) throw new Error('Unauthorized!')

    const newStudent = await api.students[props.action]({
      ...data,
      id: data.id!,
      userId: user.value.id
    })
    updateStudents(newStudent)
    router.push({
      name: isAdding.value ? RouteName.STUDENTS : RouteName.STUDENT_INFO
    })
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message || 'Something went wrong. Try to reload page')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <FormControl :button-text="isAdding ? 'Add' : 'Update'" @submit="onSubmit">
    <InputField v-bind="name" label="Ім'я" :error="errors.name" />
    <SelectAvatar v-bind="avatar" label="Аватар" :error="errors.avatar" />
    <SelectField
      v-bind="difficulty"
      label="Складність"
      :options="DIFFICULTY_TYPES.map((label, i) => ({ label, value: i }))"
      :error="errors.difficulty"
    />
    <InputField
      v-bind="roundLength"
      type="number"
      label="Довжина раунду"
      :error="errors.roundLength"
    />
  </FormControl>
</template>
