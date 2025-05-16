// app/api/download/route.ts
import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
  }

  const info = await ytdl.getInfo(videoId);
  const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

  return NextResponse.redirect(format.url);
}
