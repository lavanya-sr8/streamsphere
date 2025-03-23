import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
	const { isAdmin } = useAuthStore();
	console.log({ isAdmin });

	return (
		<div
			className='flex items-center justify-between p-4 sticky top-0 bg-purple-900/75 
      backdrop-blur-md z-10
    '
		>
			<div className='flex gap-2 items-center text-white font-semibold'>
				<img src='/MusicPlex.png' className='size-8' alt='Spotify logo' />
				MusicPlex
			</div>
			<div className='flex items-center gap-4'>
				{isAdmin && (
					<Link
						to={"/admin"}
						className={cn(
							buttonVariants({ variant: "outline" }),
							"text-white border-purple-500 hover:bg-purple-800"
						)}
					>
						<LayoutDashboardIcon className='size-4 mr-2' />
						Admin Dashboard
					</Link>
				)}

				<SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

				<UserButton />
			</div>
		</div>
	);
};
export default Topbar;
