'use server'

import { api } from '@/lib/api-interceptors'
import type { Metadata } from '@/models/entities'

export async function getMetadata() {
  const response = await api.get<Metadata>('frontend/metadata')
  return response.data
}
