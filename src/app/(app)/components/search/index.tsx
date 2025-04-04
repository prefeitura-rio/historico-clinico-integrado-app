'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useMetadata } from '@/hooks/use-queries/metadata/use-metadata'
import { usePatientSearch } from '@/hooks/use-queries/use-patient-search'
import { usePatientSearchParams } from '@/hooks/use-search-params/use-patient-search-params'
import { cnsRegex, cpfRegex } from '@/utils/regex'

export function Search() {
  useMetadata() // Fetch metadata on app load
  const { formattedSearchParams } = usePatientSearchParams()
  const { data, isLoading } = usePatientSearch(formattedSearchParams)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [value, setValue] = useState(
    formattedSearchParams.name ||
      formattedSearchParams.cpf ||
      formattedSearchParams.cns ||
      '',
  )

  useEffect(() => {
    if (formattedSearchParams.cpf) {
      router.push(`/${formattedSearchParams.cpf}`)
    }
    if (data && formattedSearchParams.cns) {
      const patient = data?.find((patient) =>
        patient.cns_lista.some((cns) => cns === formattedSearchParams.cns),
      )
      if (patient) {
        router.push(`/${patient.cpf}`)
      }
    }
  }, [formattedSearchParams, data, router])

  async function onSubmit() {
    const charCount = value.replaceAll(' ', '').length
    console.log({ charCount })
    if (charCount < 8) {
      setError('Digite pelo menos 8 caracteres')
      inputRef.current?.focus()
    } else if (/[a-zA-Z]/.test(value)) {
      // If there is any letter in the value
      router.push(`?name=${value}`)
      setError(null)
    } else if (cpfRegex.test(value)) {
      // If the value is a valid CPF
      const cpf = value.replaceAll(/\D/g, '') // Remove all non-digit characters
      setError(null)
      router.push(`/${cpf}`)
    } else if (cnsRegex.test(value)) {
      // If the value is a valid CNS
      const cns = value.replaceAll(/\W/g, '') // Remove all non-word characters
      setError(null)
      router.push(`/${cns}`)
    } else {
      // If the value is not a valid CPF or CNS
      setError('CPF ou CNS inválido')
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (onSubmit !== undefined && e.key === 'Enter') {
      e?.preventDefault()
      onSubmit()
    }
  }

  return (
    <main>
      <div className="flex flex-col items-center">
        <h2 className="mb-3 text-2xl font-semibold leading-6 text-primary">
          Busca de Pacientes
        </h2>
        <p className="text-sm text-typography-blue-gray-200">
          Insira o nome, CPF ou CNS do paciente para realizar a busca.
        </p>
      </div>

      <form className="mt-4 flex items-center justify-center gap-3">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nome, CPF ou CNS"
          className="w-72"
          onKeyDown={handleKeyDown}
        />

        <Button
          type="button"
          size="sm"
          disabled={isLoading}
          className="w-36"
          onClick={() => onSubmit()}
        >
          {isLoading ? <Spinner /> : 'Pesquisar'}
        </Button>
        <div className="relative flex size-0 items-center">
          {error && (
            <span className="absolute left-0 text-nowrap text-sm text-destructive">
              {error}
            </span>
          )}
        </div>
      </form>
    </main>
  )
}
