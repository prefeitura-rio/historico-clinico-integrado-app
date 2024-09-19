import { useState, useTransition } from 'react'

export type FormState =
  | {
      success: true
      data: unknown | null
    }
  | (
      | {
          success: false
          message: {
            title: string
            description: string | null
          }
        }
      | {
          success: false
          errors: Record<string, string[]>
        }
    )

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null, data: null },
  )

  async function handleSubmit(data: FormData) {
    try {
      startTransition(async () => {
        const state = await action(data)

        if (state.success && onSuccess) {
          await onSuccess(state.data)
        }

        setFormState(state)
      })
    } catch (err) {
      console.error({ err })
    }
  }

  return [formState, handleSubmit, isPending] as const
}
