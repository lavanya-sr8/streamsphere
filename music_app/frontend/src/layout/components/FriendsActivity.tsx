import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";

const FriendsActivity = () => {
	const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
	const { user } = useUser();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	return (
		<div className='h-full bg-gradient-to-r from-[#9B59B6] to-[#6A1B9A] rounded-lg flex flex-col shadow-lg'>
			{/* Header */}
			<div className='p-4 flex justify-between items-center border-b border-[#8846A3]/60'>
				<div className='flex items-center gap-2 text-white'>
					<Users className='size-5 shrink-0' />
					<h2 className='font-semibold'>What they're listening to</h2>
				</div>
			</div>

			{/* Show login prompt if user isn't signed in */}
			{!user && <LoginPrompt />}

			{/* Friends Activity List */}
			<ScrollArea className='flex-1'>
				<div className='p-4 space-y-4'>
					{users.map((user) => {
						const activity = userActivities.get(user.clerkId);
						const isPlaying = activity && activity !== "Idle";

						return (
							<div
								key={user._id}
								className='cursor-pointer hover:bg-[#8846A3]/50 p-3 rounded-md transition duration-300 group 
               border border-[#9B59B6] shadow-md'
							>
								<div className='flex items-start gap-3'>
									<div className='relative'>
										<Avatar className='size-10 border border-[#8846A3]/80 shadow-md'>
											<AvatarImage src={user.imageUrl} alt={user.fullName} />
											<AvatarFallback>{user.fullName[0]}</AvatarFallback>
										</Avatar>
										{/* Online Indicator */}
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#9B59B6]
												${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-gray-500"}
												`}
											aria-hidden='true'
										/>
									</div>

									<div className='flex-1 min-w-0'>
										<div className='flex items-center gap-2'>
											<span className='font-medium text-sm text-white'>{user.fullName}</span>
											{isPlaying && <Music className='size-3.5 text-emerald-400 shrink-0' />}
										</div>

										{isPlaying ? (
											<div className='mt-1'>
												<div className='mt-1 text-sm text-white font-medium truncate'>
													{activity.replace("Playing ", "").split(" by ")[0]}
												</div>
												<div className='text-xs text-white/80 truncate'>
													{activity.split(" by ")[1]}
												</div>
											</div>
										) : (
											<div className='mt-1 text-xs text-white/60'>Idle</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default FriendsActivity;

/* Login Prompt */
const LoginPrompt = () => (
	<div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
		<div className='relative'>
			{/* Glowing Effect */}
			<div
				className='absolute -inset-1 bg-gradient-to-r from-[#6A1B9A] to-[#9B59B6] rounded-full blur-lg
       opacity-75 animate-pulse'
				aria-hidden='true'
				
			/>
			{/* Icon */}
			<div className='relative bg-[#9B59B6] rounded-full p-4 shadow-md'>
				<HeadphonesIcon className='size-8 text-white' />
			</div>
		</div>

		<div className='space-y-2 max-w-[250px]'>
			<h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
			<p className='text-sm text-white/80'>Login to discover what music your friends are enjoying right now.</p>
		</div>
	</div>
);
