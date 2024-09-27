'use client'
import { Minus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { ExpandableSecretButton } from '@/components/custom-ui/expandable-secret-button.'
import { Skeleton as CustomSkeleton } from '@/components/custom-ui/skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
import { getAge } from '@/utils/get-age'
import { formatCPF, formatPhone } from '@/utils/string-formatters'

import { InfoBox } from './components/info-box'

export function BasicInfo() {
  const params = useParams()
  const cpf = params?.cpf.toString()

  const { data, isLoading } = usePatientHeader({ cpf })

  return (
    <div>
      <div className="space-y-1">
        <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
          Nome {!isLoading && data?.social_name ? 'social' : ''}
        </span>
        <CustomSkeleton
          className="mt-1 h-6 w-96"
          isLoading={isLoading}
          isEmpty={!isLoading && !data?.social_name && !data?.registration_name}
          render={
            <span className="block text-2xl font-medium leading-6 text-typography-dark-blue">
              {data?.social_name || data?.registration_name}
            </span>
          }
        />
      </div>

      {!isLoading && data?.social_name && (
        <div className="mt-2 space-y-1">
          <span className="block text-sm leading-3.5 text-typography-ice-blue-500">
            nome de registro
          </span>
          <span className="block text-xl font-medium leading-5 text-typography-ice-blue-500">
            {data.registration_name}
          </span>
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Idade
          </span>
          <InfoBox>
            {isLoading ? (
              <Skeleton className="h-3.5 w-2" />
            ) : (
              data?.birth_date && getAge(new Date(data.birth_date)).toString()
            )}
          </InfoBox>
        </div>

        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Sexo
          </span>
          <InfoBox>
            {isLoading ? <Skeleton className="h-3.5 w-16" /> : data?.gender}
          </InfoBox>
        </div>

        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Raça
          </span>

          <InfoBox>
            {isLoading ? <Skeleton className="h-3.5 w-10" /> : data?.race}
          </InfoBox>
        </div>

        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            CPF
          </span>
          {isLoading ? (
            <InfoBox>
              <Skeleton className="size-3.5" />
            </InfoBox>
          ) : data?.cpf ? (
            <ExpandableSecretButton>{formatCPF(cpf)}</ExpandableSecretButton>
          ) : (
            <InfoBox>
              <Minus className="size-3.5 text-typography-dark-blue" />
            </InfoBox>
          )}
        </div>

        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Tel.
          </span>
          {isLoading ? (
            <InfoBox>
              <Skeleton className="size-3.5" />
            </InfoBox>
          ) : data?.phone ? (
            <ExpandableSecretButton>
              {formatPhone(data.phone)}
            </ExpandableSecretButton>
          ) : (
            <InfoBox>
              <Minus className="size-3.5 text-typography-dark-blue" />
            </InfoBox>
          )}
        </div>

        {data?.deceased && (
          <div className="space-y-1">
            <div className="h-3.5"></div>
            <InfoBox className="bg-rose-700/20">Óbito</InfoBox>
          </div>
        )}
      </div>
    </div>
  )
}
