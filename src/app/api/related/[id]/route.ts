// app/api/related/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const API_KEY = process.env.YT_API_KEY;
  const { id } = await params;
   if (!id) {
    return NextResponse.json({ error: "id not  found" }, { status: 404 });
  }

  // প্রথমে, ভিডিওর শিরোনাম ফেচ করুন
  const videoRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`
  );
  const videoData = await videoRes.json();

  if (!videoData.items || videoData.items.length === 0) {
    return NextResponse.json({ error: "video not  found" }, { status: 404 });
  }

  const videoTitle = videoData.items[0].snippet.title;

  // শিরোনাম ব্যবহার করে সম্পর্কিত ভিডিও ফেচ করুন
  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      videoTitle
    )}&type=video&maxResults=9&key=${API_KEY}`
  );
  const searchData = await searchRes.json();

  return NextResponse.json(searchData);
}
