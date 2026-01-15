'use client'

import { Sidebar } from '@components/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
