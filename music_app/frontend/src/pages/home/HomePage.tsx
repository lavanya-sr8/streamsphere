import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { motion } from "framer-motion"; // Import motion from Framer Motion
const headphoneIcon = "/headphones.png";


const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

	const { initializeQueue } = usePlayerStore();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

	return (
		<main 
    className="rounded-md overflow-hidden h-full"
    style={{
        backgroundImage: "url('bg.jpg')", // Replace with your actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}
>
			<Topbar />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6 flex flex-col items-center'>
					
					{/* Animated Headphones */}
					<motion.img 
						src={headphoneIcon} 
						alt="Headphones"
						className="w-[350px] h-[350px] mb-10" // Adjust size as needed
						animate={{ y: [0, -10, 0] }} 
						transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
					/>

					{/* Move "Good Afternoon" down */}
					<h1 className="text-4xl sm:text-5xl font-bold mb-6 mt-6 text-left w-full pl-4">Good Afternoon</h1>

					
					<FeaturedSection />

					<div className='space-y-8'>
						<SectionGrid title='Made For You' songs={madeForYouSongs} isLoading={isLoading} />
						<SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};

export default HomePage;
