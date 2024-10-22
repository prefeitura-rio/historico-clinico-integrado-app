export type User = {
  name: string | null | undefined
  cpf: string | null | undefined
  username: string
  email: string
  role: string | null | undefined
}

export type Header = {
  deceased: boolean
  registration_name: string
  social_name?: string | undefined
  cpf?: string | undefined
  cns?: string | undefined
  birth_date?: string | undefined
  gender?: string | undefined
  race?: string | undefined
  phone?: string | undefined
  family_clinic: {
    cnes: string
    name: string
    phone: string
  }
  family_health_team: {
    ine_code: string
    name: string
    phone: string
  }
  medical_responsible?: {
    name: string
    registry: string
  }[]
  nursing_responsible?: {
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
  procedures: {
    description: string | null
    notes: string | null
  }[]
  responsible: {
    name: string
    role: string
  } | null
  clinical_motivation: string | null
  clinical_outcome: string | null
  filter_tags: string[]
  exhibition_type: string
  clinical_exams: {
    type: 'Laboratório' | 'Imagem'
    description: string
  }[]
}

export type Metadata = {
  filter_tags: {
    tag: string
    description: string
  }[]
}
