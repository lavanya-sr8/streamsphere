import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoggingIn } = useAuthStore();

	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div
			className='h-screen w-full bg-cover bg-center bg-opacity-70'
			style={{
				backgroundImage: `url('/staf.png')`, // Adjust the path if needed
				backgroundBlendMode: "overlay",
			}}
		>
			<header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}>
					<img src='/web-logo.png' alt='web Logo' className='w-16 md:w-24 object-contain' />
				</Link>
			</header>

			<div className='flex justify-center items-center mt-20 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-md'>
					<h1 className='text-center text-purple-700 text-2xl font-bold mb-4'>Login</h1>

					<form className='space-y-4' onSubmit={handleLogin}>
						<div>
							<label htmlFor='email' className='text-sm font-medium text-purple-700 block'>
								Email
							</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-purple-300 rounded-md bg-white text-purple-700 focus:outline-none focus:ring focus:ring-purple-500'
								placeholder='you@example.com'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='password' className='text-sm font-medium text-purple-700 block'>
								Password
							</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-purple-300 rounded-md bg-white text-purple-700 focus:outline-none focus:ring focus:ring-purple-500'
								placeholder='••••••••'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							className='w-full py-2 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800'
							disabled={isLoggingIn}
						>
							{isLoggingIn ? "Loading..." : "Login"}
						</button>
					</form>
					<div className='text-center text-purple-500'>
						Don't have an account?{" "}
						<Link to={"/signup"} className='text-purple-700 hover:underline'>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
