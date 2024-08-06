export type User = {
  name?: string | undefined
  cpf?: string | undefined
  username: string
  email: string
}

export type Header = {
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
  }
  family_health_team: {
    ine_code: string
    name: string
  }
  medical_responsible?: string | undefined
  nursing_responsible?: string | undefined
  validated: boolean
}

export type Summary = {
  allergies: string[]
  continuous_use_medications: string[]
}

export type Encounter = {
  entry_datetime: string
  exit_datetime: string
  location: string
  type: string
  subtype?: string | undefined
  active_cids: string[]
  responsible: {
    name: string
    role: string
  }
  description?: string | undefined
  filter_tags: string[]
}
