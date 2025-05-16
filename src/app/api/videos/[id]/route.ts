// app/api/video/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const API_KEY = process.env.YT_API_KEY
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${params.id}&key=${API_KEY}`
  );
  const data = await res.json();
  return NextResponse.json(data.items[0]);
}
