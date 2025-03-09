import { jwtVerify, SignJWT } from "jose"

// Secret key for JWT signing - in production, use a proper secret management system
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_replace_in_production")

export async function signToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

