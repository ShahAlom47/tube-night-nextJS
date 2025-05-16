import Header from "@/componets/Header";
import HomeVideoContainer from "@/componets/HomeVideoContainer";


async function getVideos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
    cache: "no-store",
  })
  return res.json()
}
export default async function Home() {
   const videos = await getVideos()
  
  return (
    <div className=" ">
      <Header />
       <HomeVideoContainer videos={videos|| []} />
    </div>
  );
}
