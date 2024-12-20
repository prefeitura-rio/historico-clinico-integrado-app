'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePatientSearch } from '@/hooks/use-queries/use-patient-search'
import { usePatientSearchParams } from '@/hooks/use-search-params/use-patient-search-params'
import type { PatientSearchRow } from '@/models/entities'
import { capitalize, formatCNS, formatCPF } from '@/utils/string-formatters'

import { ResultTableSkeleton } from './result-table-skeleton'

export function ResultTable() {
  const { formattedSearchParams } = usePatientSearchParams()
  const { data, isLoading } = usePatientSearch(formattedSearchParams)
  const router = useRouter()

  const columns: ColumnDef<PatientSearchRow>[] = [
    {
      accessorKey: 'nome',
      header: 'Nome',
    },
    {
      accessorKey: 'cpf',
      header: 'CPF',
      cell: ({ row }) => (
        <Badge className="text-nowrap" variant="outline">
          {formatCPF(row.original.cpf)}
        </Badge>
      ),
    },
    {
      accessorKey: 'valor_cns',
      header: 'CNS',
      cell: ({ row }) => (
        <Badge className="text-nowrap" variant="outline">
          {formatCNS(row.original.valor_cns)}
        </Badge>
      ),
    },
    {
      accessorKey: 'mae_nome',
      header: 'Nome da mãe',
    },
    {
      accessorKey: 'genero',
      header: 'Sexo',
      cell: ({ row }) => capitalize(row.original.genero),
    },
    {
      accessorKey: 'data_nascimento',
      header: 'Data de nascimento',
      cell: ({ row }) => formatDate(row.original.data_nascimento, 'dd/MM/yyyy'),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="size-9 rounded-lg"
              onClick={() => router.push(`/${row.original.cpf}`)}
            >
              <ArrowRight className="size-4 shrink-0" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ver histórico do paciente</TooltipContent>
        </Tooltip>
      ),
    },
  ]

  return (
    <>
      {data && <DataTable columns={columns} data={data} pagination />}
      {isLoading && <ResultTableSkeleton />}
    </>
  )
}
