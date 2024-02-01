import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import { WorkspaceProvider } from '@/scenes/Workspace/context/workspaceContext'

type WrapperProps = { children: React.ReactNode }

const createCache = () => new QueryCache()

const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  })

const createQueryHookWrapper = () => {
  const queryClient = createTestClient()

  const wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>
      <WorkspaceProvider>{children}</WorkspaceProvider>
    </QueryClientProvider>
  )

  return wrapper
}

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestClient()
  const { rerender, ...rest } = render(
    <QueryClientProvider client={queryClient}>
      <WorkspaceProvider>{component}</WorkspaceProvider>
    </QueryClientProvider>,
  )
  return {
    ...rest,
    rerender: (comp: React.ReactElement) =>
      rerender(<QueryClientProvider client={queryClient}>{comp}</QueryClientProvider>),
  }
}

export { createCache, createTestClient, createQueryHookWrapper, renderWithQueryClient }
