import { useQuery } from '@tanstack/react-query'

import { getMenu } from '@/services/menu'

export const useMenu = () => {
  return useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  })
}
