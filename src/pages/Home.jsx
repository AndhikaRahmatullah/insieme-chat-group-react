import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CreateStory from "../components/CreateStory";
import Footer from "../components/Footer";
import { useUser } from "../context/user";
import useGetDatabase from "../hooks/useGetDatabase";
import { SignOut as Keluar } from "../services/database";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
	const username = useRef("");
	const [backToTopIcon, setBackToTopIcon] = useState(false);
	const dbPostsValue = useRef([]);

	// on scroll window
	window.onscroll = function () {
		window.pageYOffset > 0 ? setBackToTopIcon(true) : setBackToTopIcon(false);
	};

	// initial for redirect path
	const redirect = useNavigate();

	useEffect(() => {
		username.current ? (document.title = `${username.current} - Insieme`) : (document.title = "Insieme");
	}, [username.current]);

	// current user
	const { email } = useUser();

	// database from users database
	const usersDatabase = useRef({});

	// get users database
	const getUsers = useGetDatabase("users", true);
	const { dbValue } = getUsers;

	// validation user database
	if (dbValue) {
		dbValue.map((e) => {
			if (email === e.email) {
				username.current = e.username;
				usersDatabase.current = {
					username: e.username,
					accountID: e.accountID,
					email: e.email,
					profileImage: e.profileImage,
				};
			}
		});
	}

	// get posts database
	const getPosts = useGetDatabase("posts", true);
	const { getValueLater } = getPosts;

	if (getPosts.dbValue) {
		dbPostsValue.current = getPosts.dbValue;
	}

	// sign out
	const SignOut = async () => {
		await Keluar();
		redirect("/");
	};

	return (
		<div className="container relative min-h-screen py-20">
			<div className="mb-10 flex justify-center">
				{/* headers */}
				<div className="flex w-[700px] items-center justify-between">
					{email ? (
						<div
							onClick={() => redirect("/profile")}
							className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary p-2 shadow-lg shadow-dark/30 transition-all duration-300 hover:bg-primary/80">
							<div
								className="h-[50px] max-h-[50px] w-[50px] max-w-[50px] rounded-full bg-cover bg-center"
								style={{ backgroundImage: `url(${usersDatabase.current.profileImage})` }}></div>
							<p className="w-10/12 truncate text-left text-xl font-bold text-light">{usersDatabase.current.username}</p>
						</div>
					) : (
						<Link
							to="signin"
							className="rounded-lg bg-primary p-2 text-xl font-bold tracking-wide text-light shadow-lg shadow-dark/30 transition-all duration-300 hover:bg-primary/80">
							Sign In
						</Link>
					)}

					{email ? (
						<button
							onClick={SignOut}
							className="w-2/12 text-right text-2xl font-bold uppercase text-primary underline decoration-transparent transition-all duration-300 hover:decoration-primary">
							Sign out
						</button>
					) : (
						<p className="w-2/12 text-right text-2xl font-bold uppercase text-primary">Iniseme</p>
					)}
				</div>
			</div>

			{/* create story */}
			{email && (
				<CreateStory
					currentEmail={email}
					currentUsername={username.current}
					currentProfileImage={usersDatabase.current.profileImage}
					rerender={getValueLater}
				/>
			)}

			{/* body */}
			<div className="mt-10 flex flex-col-reverse items-center justify-center gap-10">
				{/* posts story */}
				{getPosts.dbValue ? (
					dbPostsValue.current.map((e) => {
						return (
							<div
								key={e.id}
								className="flex w-[700px] flex-col gap-5 rounded-lg bg-white p-2 shadow-lg shadow-dark/50">
								<div className="flex items-center justify-between">
									<div className="flex w-2/3 items-center gap-2">
										<div
											className="h-[45px] max-h-[45px] w-[45px] max-w-[45px] rounded-full bg-cover bg-center"
											style={{ backgroundImage: `url(${e.creatorProfileImage})` }}></div>
										<p className="truncate text-base font-medium opacity-50">{e.creatorUsername}</p>
									</div>
									<p className="w-1/3 text-right text-base font-medium opacity-50">{e.createdTime}</p>
								</div>

								<div className="flex flex-col gap-3">
									{e.imageStory && (
										<div className="flex justify-center">
											<LazyLoadImage
												src={e.imageStory}
												alt={`imageby${e.creatorUsername}`}
												className="w-fit max-w-[700px]"
											/>
										</div>
									)}
									<p className="px-2">{e.textStory}</p>
								</div>
							</div>
						);
					})
				) : (
					<p>Loading...</p>
				)}
			</div>

			{/* button action */}
			<AnimatePresence>
				{backToTopIcon && (
					<div className="fixed right-80 bottom-7 flex flex-col items-center gap-2">
						{/* totop */}
						<motion.a
							href="#top"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							whileHover={{ scale: 0.9 }}
							exit={{ opacity: 0 }}>
							<img
								src={require("../assets/totop.png")}
								alt="backtotop"
								className="w-[45px] cursor-pointer border-b-[3px] border-primary"
							/>
						</motion.a>
					</div>
				)}
			</AnimatePresence>

			<Footer />
		</div>
	);
};

export default Home;
