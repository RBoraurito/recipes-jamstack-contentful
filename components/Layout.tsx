import { TheFooter } from '@/components/TheFooter'
import { TheHeader } from '@/components/TheHeader'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TheHeader />
      {children}
      <TheFooter />
    </>
  )
}
