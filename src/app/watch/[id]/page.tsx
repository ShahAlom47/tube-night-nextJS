// app/watch/[id]/page.tsx

import VideoPage from "@/componets/VideoPage";

export default async function WatchPage({ params }: { params: { id: string } }) {
  const { id } = await params
  return <VideoPage videoId={id} />;
}
