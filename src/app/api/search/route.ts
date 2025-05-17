import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  const API_KEY = process.env.YT_API_KEY
  const maxResults = 15
  const regionCode = "BD"

  console.log("YT_API_KEY:", API_KEY)

  if (!query) {
    return NextResponse.json({ error: "Search query missing" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&regionCode=${regionCode}&maxResults=${maxResults}&key=${API_KEY}`
    )

    console.log("YouTube API response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error("YouTube API error:", errorData)
      return NextResponse.json({ error: "Failed to fetch videos", details: errorData }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data.items)
  } catch (error) {
    console.error("Catch block error:", error)
    return NextResponse.json({ error: "Something went wrong", details: String(error) }, { status: 500 })
  }
}
