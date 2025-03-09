import { NextResponse } from "next/server"
import { signToken } from "@/lib/auth"

// In a real app, you would use a database
const users: { username: string; password: string; id: string }[] = []

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Find user
    const user = users.find((user) => user.username === username && user.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = await signToken({
      id: user.id,
      username: user.username,
    })

    return NextResponse.json({ token, user: { id: user.id, username } })
  } catch (error) {
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 })
  }
}

