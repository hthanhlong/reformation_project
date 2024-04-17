import { z } from 'zod'

export const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  selectedPlan: z.string().min(2, {
    message: 'Plan must be at least 2 characters.',
  }),
  publicId: z.string().min(2, {
    message: 'Public ID must be at least 2 characters.',
  }),
})
