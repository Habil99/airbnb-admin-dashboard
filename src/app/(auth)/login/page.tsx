'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoginForm } from '@features/auth/components/login-form'
import { authApi } from '@features/auth/api/auth-api'
import type { LoginInput } from '@lib/validations'

function LoginPageContent(): React.ReactElement {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleLogin = async (credentials: LoginInput): Promise<void> => {
    await authApi.login(credentials)

    // Redirect to dashboard or original destination
    const redirect = searchParams.get('redirect') || '/dashboard'
    router.push(redirect)
  }

  return <LoginForm onSuccess={handleLogin} />
}

export default function LoginPage(): React.ReactElement {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
