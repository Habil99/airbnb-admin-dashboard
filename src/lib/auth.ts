import * as bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
)

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

// Hash a plain text password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify a password against a hash
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Sign a JWT token
export async function signJWT(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  return token
}

// Verify and decode a JWT token
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}
