import { z } from 'zod'

export const taskSchema = z.object({
  pk: z.string(),
  sk: z.string(),
  status: z.string()
})

export type Task = z.infer<typeof taskSchema>
