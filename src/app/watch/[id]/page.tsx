// app/watch/[id]/page.tsx

import VideoPage from "@/componets/VideoPage";

export default function WatchPage({ params }: { params: { id: string } }) {
    
  return <VideoPage videoId={params.id} />;
}
