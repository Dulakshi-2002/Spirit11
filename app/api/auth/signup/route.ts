import { NextResponse } from "next/server"
import { signToken } from "@/lib/auth"

// In a real app, you would use a database
const users: { username: string; password: string; id: string }[] = []

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Check if user already exists
    if (users.some((user) => user.username === username)) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: crypto.randomUUID(),
      username,
      password, // In production, hash the password!
    }

    users.push(newUser)

    // Generate JWT token
    const token = await signToken({
      id: newUser.id,
      username: newUser.username,
    })

    return NextResponse.json({ token, user: { id: newUser.id, username } })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

