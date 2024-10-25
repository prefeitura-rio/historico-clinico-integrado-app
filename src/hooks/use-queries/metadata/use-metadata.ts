import { useQuery } from '@tanstack/react-query'

import { getMetadata } from '@/http/metadata/get-metadata'

export function useMetadata() {
  return useQuery({
    queryKey: ['frontend', 'metadata'],
    queryFn: async () =>
      getMetadata().then((data) => {
        const dict: Record<string, string> = {}

        // Transform filter tags from array to dictionary
        data.filter_tags.forEach((item) => {
          dict[item.tag] = item.description
        })

        return {
          ...data,
          filterTagDictionary: dict,
        }
      }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}
