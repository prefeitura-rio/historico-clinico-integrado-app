export type User = {
  name: string | null | undefined
  cpf: string | null | undefined
  username: string
  email: string
  role: string | null | undefined
  is_use_terms_accepted: boolean
}

export type Header = {
  deceased: boolean
  registration_name: string
  social_name: string | null
  cpf: string
  cns: string | null
  birth_date: string | null
  gender: string | null
  race: string | null
  phone: string | null
  family_clinic: {
    cnes: string | null
    name: string | null
    phone: string | null
  }
  family_health_team: {
    ine_code: string | null
    name: string | null
    phone: string | null
  }
  medical_responsible: {
    name: string
    registry: string
  }[]
  nursing_responsible: {
    name: string
    registry: string
  }[]
  validated: boolean
}

export type Summary = {
  allergies: string[]
  continuous_use_medications: string[]
}

export type Encounter = {
  cpf: string
  id_episodio: string
  entry_datetime: string
  exit_datetime: string | null
  location: string
  deceased: boolean
  type: string
  subtype: string | null
  cids: {
    description: string
    status: string | null
  }[]
  cids_summarized: string[]
  procedures: string | null
  responsible: {
    name: string
    role: string
  } | null
  clinical_motivation: string | null
  clinical_outcome: string | null
  filter_tags: string[]
  exhibition_type: 'clinical_exam' | 'default'
  clinical_exams: {
    type: 'Laboratório' | 'Imagem'
    description: string
  }[]
  exibicao: {
    indicador: boolean
    episodio_sem_informacao: boolean
    paciente_restrito: boolean
    paciente_sem_cpf: boolean
    subtipo_proibido_vitacare: boolean
    episodio_vacinacao: boolean
    exame_sem_subtipo: boolean
  }
  medicines_administered: string | null
  provider: string
  prescription: string | null
}

export type Metadata = {
  filter_tags: {
    tag: string
    description: string
  }[]
}

export type PatientSearchRow = {
  cpf_particao: number
  cpf: string
  cns_lista: string[]
  nome: string
  data_nascimento: string
  idade: number
  genero: string
  nome_mae: string
  is_available: boolean
  quantidade_episodios: number
}
