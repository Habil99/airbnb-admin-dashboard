import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyJWT } from '@lib/auth'

export default async function Home(): Promise<never> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  // Check if user is authenticated
  if (token) {
    const payload = await verifyJWT(token)
    if (payload) {
      // User is authenticated, redirect to dashboard
      redirect('/dashboard')
    }
  }

  // User is not authenticated, redirect to login
  redirect('/login')
}
