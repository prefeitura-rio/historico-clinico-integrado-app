'use client'

import { Phone, Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import doctor from '@/assets/doctor.svg'
import hospital from '@/assets/hospital.svg'
import logoPrefeituraSaude from '@/assets/logo-prefeitura-saude.png'
import logoutIcon from '@/assets/logout.svg'
import nurse from '@/assets/nurse.svg'
import userGroup from '@/assets/user-group.svg'
import whatsapp from '@/assets/whatsapp.svg'
import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
import { useProfile } from '@/hooks/use-queries/use-profile'
import { queryClient } from '@/lib/react-query'
import type { Header } from '@/models/entities'
import { logout } from '@/utils/logout'
import { whatsAppRedirect } from '@/utils/whatsapp-redirect'

import { HeaderButton } from './components/header-button'
import { HeaderPopover } from './components/header-popover'
import { HeaderPopoverNameList } from './components/header-popover/components/header-popover-name-list'
import { HeaderPopoverPhone } from './components/header-popover/components/header-popover-phone'

interface HeaderProps {
  cpf: string
}

export function Header({ cpf }: HeaderProps) {
  const router = useRouter()
  const { data: header, isPending } = usePatientHeader({ cpf })
  const { data: profile } = useProfile()

  // Extract data from the response
  const physicians =
    header?.medical_responsible?.map((physician) => physician.name) || []
  const nurses = header?.nursing_responsible?.map((nurse) => nurse.name) || []

  const familyClinicTeam =
    header?.family_health_team?.name || 'Não existe vínculo'
  const familyClinicTeamWhatsapp =
    header?.family_health_team?.phone || 'Não possui'

  const primaryAtentionUnity = header?.family_clinic?.name || 'Não há UAP'
  const primaryAtentionUnityPhone = header?.family_clinic?.phone || 'Não possui'

  function clearCPF() {
    router.push('/')
  }

  function logOut() {
    queryClient.clear()
    logout()
  }

  return (
    <div className="mx-[96px] mt-[89px] flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Image
          src={logoPrefeituraSaude}
          alt="Prefeitura do Rio de Janeiro"
          className="h-16 w-auto"
        />
        <div className="">
          <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
            Histórico Clínico Integrado
          </span>
        </div>
      </div>

      <div className="flex gap-[60px]">
        <div className="flex gap-3">
          <HeaderPopover
            title="Unidade de Atenção Primária"
            icon={<Image src={hospital} alt="" />}
            disabled={isPending}
          >
            <HeaderPopoverPhone
              title={primaryAtentionUnity}
              subtitle="Unidade de Atenção Primária"
              phone={primaryAtentionUnityPhone}
              icon={<Phone className="size-5 text-typography-dark-blue" />}
            />
          </HeaderPopover>

          <HeaderPopover
            title="Equipe de Saúde da Família"
            icon={<Image src={userGroup} alt="" />}
            disabled={isPending}
          >
            <HeaderPopoverPhone
              title={familyClinicTeam}
              subtitle="Equipe de Saúde da Família"
              phone={familyClinicTeamWhatsapp}
              icon={<Image src={whatsapp} alt="" />}
              onClick={() => {
                whatsAppRedirect({
                  CBO: profile?.role || '',
                  patientName:
                    header?.social_name || header?.registration_name || '',
                  phoneNumber: header?.phone || '',
                  userName: profile?.name || '',
                })
              }}
            />
          </HeaderPopover>

          <HeaderPopover
            title="Médico(a) de referência"
            icon={<Image src={doctor} alt="" />}
            disabled={isPending}
          >
            <HeaderPopoverNameList
              title="Médico(a) de referência"
              nameList={physicians}
            />
          </HeaderPopover>

          <HeaderPopover
            title="Enfermeiro(a) de referência"
            icon={<Image src={nurse} alt="" />}
            disabled={isPending}
          >
            <HeaderPopoverNameList
              title="Enfermeiro(a) de referência"
              nameList={nurses}
            />
          </HeaderPopover>
        </div>
        <div className="flex gap-3">
          <HeaderButton
            title="Busca CPF"
            icon={<Search className="size-5 text-typography-dark-blue" />}
            onClick={clearCPF}
          />
          <HeaderButton
            title="Logout"
            icon={<Image src={logoutIcon} alt="" />}
            onClick={logOut}
          />
        </div>
      </div>
    </div>
  )
}
