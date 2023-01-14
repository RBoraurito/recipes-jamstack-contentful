import { TheFooter } from '@/components/TheFooter'
import { TheHeader } from '@/components/TheHeader'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="min-h-screen grid">
        <TheHeader />
        {children}
        <TheFooter />
      </body>
    </html>
  )
}
