'use client'
import WrappersCollection from '../components/wrappers/WrappersCollection'
import './globals.css'

declare global {
  interface Navigator {
    standalone?: boolean
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WrappersCollection>{children}</WrappersCollection>
      </body>
    </html>
  )
}
