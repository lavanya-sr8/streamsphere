import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, X } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();
	const { setContentType } = useContentStore();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	return (
		<header className='max-w-6xl mx-auto flex items-center justify-between p-4 h-16 sm:h-20 relative'>
			<div className='flex items-center gap-4 sm:gap-10'>
				<Link to='/'>
					<img src='/web-logo.png' alt='Netflix Logo' className='w-24 sm:w-32' />
				</Link>

				{/* Desktop Navbar Items */}
				<nav className='hidden sm:flex gap-4 items-center'>
					<Link to='/' className='hover:underline' onClick={() => setContentType("movie")}>
						Movies
					</Link>
					<Link to='/' className='hover:underline' onClick={() => setContentType("tv")}>
						Tv Shows
					</Link>
					<Link to='/history' className='hover:underline'>
						Search History
					</Link>
				</nav>
			</div>

			<div className='flex gap-3 items-center'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				<img src={user.image} alt='Avatar' className='h-8 w-8 rounded-full cursor-pointer' />
				<LogOut className='size-6 cursor-pointer' onClick={logout} />
				
				{/* Mobile Menu Button */}
				<div className='sm:hidden'>
					{isMobileMenuOpen ? (
						<X className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
					) : (
						<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
					)}
				</div>
			</div>

			{/* Mobile Menu Items (Slide-in Effect) */}
			<div
				className={`absolute top-16 left-0 w-full bg-black border-t border-gray-800 transform ${
					isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
				} transition-all duration-300 sm:hidden z-50`}
			>
				<Link to={"/"} className='block p-4 hover:bg-gray-900' onClick={toggleMobileMenu}>
					Movies
				</Link>
				<Link to={"/"} className='block p-4 hover:bg-gray-900' onClick={toggleMobileMenu}>
					Tv Shows
				</Link>
				<Link to={"/history"} className='block p-4 hover:bg-gray-900' onClick={toggleMobileMenu}>
					Search History
				</Link>
			</div>
		</header>
	);
};

export default Navbar;
