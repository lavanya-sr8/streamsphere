import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [trailerId, setTrailerId] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
        fetchTrailer(res.data.content.originalTitle);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchTrailer = async () => {
      try {
        const trailerRes = await axios.get(`/api/v1/${contentType}/${id}/trailer`);
        if (trailerRes.data.success) {
          const trailerUrl = new URL(trailerRes.data.trailer);
          const videoId = trailerUrl.searchParams.get("v");
          setTrailerId(videoId);
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e1bee7] via-[#d38cd1] to-[#6b21a8] p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content || Object.keys(content).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#e1bee7] via-[#d38cd1] to-[#6b21a8] text-white flex flex-col items-center justify-center">
        <Navbar />
        <h2 className="text-3xl sm:text-5xl font-bold">Content not found 😥</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e1bee7] via-[#d38cd1] to-[#6b21a8] text-white">
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold">{content?.originalTitle}</h2>
          <p className="mt-2 text-lg">
            {content?.startYear} | {content?.isAdult ? (
              <span className="text-red-600 font-bold">18+</span>
            ) : (
              <span className="text-green-600 font-bold">PG-13</span>
            )}
          </p>
          <p className="mt-4 text-lg max-w-2xl">{content?.description}</p>
          {trailerId && (
            <div className="mt-6 w-full max-w-3xl">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerId}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
