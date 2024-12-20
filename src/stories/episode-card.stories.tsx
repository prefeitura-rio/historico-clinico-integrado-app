import type { Meta, StoryObj } from '@storybook/react'

import { EpisodeCard } from '@/app/(app)/[id]/componentes/episodes/components/episode'
import { TooltipProvider } from '@/components/ui/tooltip'

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof EpisodeCard> = {
  component: EpisodeCard,
  title: 'Componentes/Episódio Clínico',
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={400}>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EpisodeCard>

export const Default: Story = {
  argTypes: {
    entry_datetime: {
      control: 'date',
      name: 'Data de entrada',
    },
    exit_datetime: {
      control: { type: 'date', options: [null] },
      name: 'Data de saída (Opcional)',
    },
    deceased: {
      control: 'inline-radio',
      name: 'Falecido',
      options: ['Sim', 'Não'],
      mapping: {
        Sim: true,
        Não: false,
      },
    },
    location: {
      name: 'Local',
      control: 'text',
    },
    type: {
      control: 'text',
      name: 'Tipo',
    },
    subtype: {
      constrol: 'text',
      name: 'Subtipo',
    },
    responsible: {
      name: 'Responsável',
    },
    exhibition_type: {
      name: 'Tipo de atendimento',
      control: 'inline-radio',
      options: ['Padrão', 'Exame Clínico'],
      mapping: {
        Padrão: 'default',
        'Exame Clínico': 'clinical_exam',
      },
    },
    provider: {
      name: 'Provedor',
      control: 'inline-radio',
      options: ['vitai', 'vitacare'],
    },
    cids_summarized: {
      name: 'Resumo das condições',
    },
    cids: {
      name: 'CIDs',
    },
    procedures: {
      name: 'Procedimentos clínicos',
    },
    clinical_motivation: {
      name: 'Motivo do atendimento',
    },
    clinical_outcome: {
      name: 'Desfecho do episódio',
    },
    prescription: {
      name: 'Medicamentos prescritos / administrados',
    },
    clinical_exams: {
      name: 'Exames clínicos',
    },
  },
  args: {
    exhibition_type: 'default',
    provider: 'exemplo',
    entry_datetime: '2024-01-01T00:00:00Z',
    exit_datetime: '2024-02-01T00:00:00Z',
    deceased: false,
    location: 'CMS Nilza Rosa',
    type: 'Exames Complementares',
    subtype: 'N/A',
    responsible: {
      name: 'Izabella Sophia Kisinovsky',
      role: 'Enfermeiro(a)',
    },
    cids_summarized: ['exemplo'],
    cids: [
      {
        description:
          'Diabetes mellitus não especificado - com complicações circulatórias periféricas',
        status: 'NAO ESPECIFICADO',
      },
      {
        description: 'Neoplasia Maligna do Lábio',
        status: 'RESOLVIDO',
      },
      {
        description: 'Hipertensão renovascular',
        status: 'ATIVO',
      },
    ],
    procedures: 'exemplo',
    clinical_motivation:
      'USUARIA COMPARECE EM UNIDADE PARA COLETA DE PREVENTIVO. \r\nEM 2023 REALIZOU HISTEROSCOPIA CIRURGICA DEVIDO EXTENSA LESÃO ANORMAL EM COLO UTERINO- FOI ORIENTADA NA EPOCA QUE PODERIA SEGUIR COM COLETA ANUAL NORMAL EM UBS. \r\nNÃ LEMBRA ULTIMA MMG. \r\nHAS/DM INSULINODEPENDENTE- BOA ADESÃO MEDICAMENTOSA. \r\nNO MOMENTO SEM QUEIXAS.',
    clinical_outcome:
      'ORIENTAÇÕES GERAIS \r\nESCUTA ATIVA \r\nREALIZADO COLETA DE PREVENTIVO \r\nSOLICITO MMG \r\nSEGUIMENTO LONGITUDINAL',
    prescription: 'exemplo',
    clinical_exams: [
      {
        type: 'Laboratório',
        description: 'exemplo',
      },
      {
        type: 'Imagem',
        description: 'exemplo',
      },
    ],
  },
}
