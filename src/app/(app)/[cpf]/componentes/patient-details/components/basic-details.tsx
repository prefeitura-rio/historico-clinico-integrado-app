'use client'
import { useParams } from 'next/navigation'

import { ExpandableSecretButton } from '@/components/custom-ui/expandable-secret-button.'
import { Skeleton as CustomSkeleton } from '@/components/custom-ui/skeleton'
import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
import { formatCPF } from '@/utils/fomart-cpf'
import { getAge } from '@/utils/get-age'
import { formatPhone } from '@/utils/string-formatters'

export function BasicDetails() {
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
          className="mt-1 h-8 w-96"
          isLoading={isLoading}
          isEmpty={!isLoading && !data?.social_name && !data?.registration_name}
          render={
            <span className="block text-[2rem] font-medium leading-8 text-typography-dark-blue">
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

      <div className="mt-4 flex gap-5">
        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Idade
          </span>
          <CustomSkeleton
            className="h-5 w-9"
            isLoading={isLoading}
            isEmpty={!isLoading && !data?.birth_date}
            render={
              <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
                {data?.birth_date && getAge(new Date(data.birth_date))}
              </span>
            }
          />
        </div>

        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Sexo
          </span>
          <CustomSkeleton
            className="h-5 w-9"
            isLoading={isLoading}
            isEmpty={!isLoading && !data?.gender}
            render={
              <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
                {data?.gender}
              </span>
            }
          />
        </div>

        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Raça
          </span>

          <CustomSkeleton
            className="h-5 w-9"
            isLoading={isLoading}
            isEmpty={!isLoading && !data?.race}
            render={
              <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
                {data?.race}
              </span>
            }
          />
        </div>

        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            CPF
          </span>
          <CustomSkeleton
            className="h-6 w-9"
            isLoading={isLoading}
            isEmpty={!isLoading && !data?.cpf}
            render={
              <ExpandableSecretButton
                text={formatCPF(cpf)}
                totalWidth="w-[12rem]"
              />
            }
          />
        </div>

        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Telefone
          </span>
          <CustomSkeleton
            className="h-6 w-9"
            isLoading={isLoading}
            isEmpty={!isLoading && !data?.phone}
            render={
              <ExpandableSecretButton
                text={data?.phone ? formatPhone(data.phone) : ''}
                totalWidth="w-[13rem]"
              />
            }
          />
        </div>
      </div>
    </div>
  )
}
