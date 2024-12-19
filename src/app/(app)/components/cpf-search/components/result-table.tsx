'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePatientSearch } from '@/hooks/use-queries/use-patient-search'
import { usePatientSearchParams } from '@/hooks/use-search-params/use-patient-search-params'
import { getAge } from '@/utils/get-age'
import { formatCPF } from '@/utils/string-formatters'

export function ResultTable() {
  const { formattedSearchParams } = usePatientSearchParams()
  const { data, isLoading } = usePatientSearch(formattedSearchParams)
  const router = useRouter()

  console.log({ formattedSearchParams })
  return (
    <Table>
      {data && (
        <>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>CNS</TableHead>
              <TableHead>Mãe</TableHead>
              <TableHead>Sexo</TableHead>
              <TableHead>Nascimento</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          {data.map((patient, index) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell>{patient.nome}</TableCell>
                <TableCell>{formatCPF(patient.cpf)}</TableCell>
                <TableCell>{patient.valor_cns}</TableCell>
                <TableCell>{patient.mae_nome}</TableCell>
                <TableCell>{patient.genero}</TableCell>
                <TableCell>{getAge(patient.data_nascimento)}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          router.push(`/${patient.cpf.replace(/\D/g, '')}`)
                        }
                      >
                        <ArrowRight />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ver histórico do paciente</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </>
      )}
      {data && data.length === 0 && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Nenhum paciente encontrado
            </TableCell>
          </TableRow>
        </TableBody>
      )}
      {isLoading && (
        <TableBody>
          {[...Array(20)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  )
}
