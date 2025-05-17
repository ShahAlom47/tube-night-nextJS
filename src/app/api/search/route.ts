import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  const API_KEY = process.env.YT_API_KEY
  const maxResults = 15
  const regionCode = "BD"

  if (!query) {
    return NextResponse.json({ error: "Search query missing" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&regionCode=${regionCode}&maxResults=${maxResults}&key=${API_KEY}`
    )

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data.items) // Only return relevant results
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
