import { NextResponse } from 'next/server';
import { getYoutubeInfo } from '../../../lib/getYoutubeInfo';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }

    const info = await getYoutubeInfo(url);

    const preferredNotes = ['144p', '440p', '720p', '1080p'];
    
    // Filter formats by preferred resolutions or mp3
    type YoutubeFormat = {
      format_id: string;
      format_note?: string;
      ext: string;
      filesize?: number;
      url: string;
      acodec?: string;
      vcodec?: string;
    };

    let filteredFormats = info.formats
      .filter((f: YoutubeFormat) =>
        (f.format_note && preferredNotes.includes(f.format_note)) || f.ext === 'mp3'
      )
      .map((f: YoutubeFormat) => ({
        format_id: f.format_id,
        format_note: f.format_note,
        ext: f.ext,
        filesize: f.filesize,
        url: f.url,
        acodec: f.acodec,
        vcodec: f.vcodec,
      }));

    // Fallback if no preferred formats found
    if (filteredFormats.length === 0) {
      const fallbackFormats = info.formats
        .filter((f: YoutubeFormat) => f.vcodec !== 'none' && f.acodec !== 'none') // must have both video and audio
        .slice(0, 3) // top 3 fallback formats
        .map((f: YoutubeFormat) => ({
          format_id: f.format_id,
          format_note: f.format_note,
          ext: f.ext,
          filesize: f.filesize,
          url: f.url,
          acodec: f.acodec,
          vcodec: f.vcodec,
        }));

      filteredFormats = fallbackFormats;
    }

    // Optional: No formats at all?
    if (filteredFormats.length === 0) {
      return NextResponse.json({ error: 'No supported formats found' }, { status: 404 });
    }

    return NextResponse.json({
      title: info?.title,
      duration: info?.duration,
      thumbnail: info?.thumbnail,
      formats: filteredFormats,
      url: info?.webpage_url,
    });

  } catch (error) {
    console.error('YouTube DL Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
