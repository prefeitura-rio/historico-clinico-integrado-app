'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import logo from '@/assets/logo-rio-prefeitura.png'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// CPF validation regex
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

const formSchema = z.object({
  cpf: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => cpfRegex.test(value), {
      message: 'CPF Inválido',
    }),
  password: z.string().min(1, {
    message: 'Campo obrigatório',
  }),
})

type Form = z.infer<typeof formSchema>

export default function SignIn() {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit() {
    // ...
  }

  return (
    <div className="grid h-screen w-full grid-cols-2">
      <div className="flex items-center justify-center bg-primary p-16">
        <Image
          src={logo}
          alt="Prefeitura do Rio de Janeiro"
          className="h-20 w-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-[36.4375rem]">
          <div className="flex flex-col items-center gap-3 p-6">
            <h2 className="text-center text-2xl font-semibold leading-6 tracking-tight text-primary">
              Acesse sua conta
            </h2>
            <span className="text-center text-muted-foreground">
              Digite seu CPF e senha para entrar na sua conta
            </span>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Insira seu CPF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Insira sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="sm" className="w-full">
                Entrar com CPF
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
