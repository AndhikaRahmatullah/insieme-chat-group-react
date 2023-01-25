import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../context/user";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";

const IsRouter = () => {
	const { uid } = useUser()

	return (
		<Routes>
			<Route
				path="/"
				element={ <Home /> }
			/>

			<Route
				path="/signup"
				element={ <SignUp /> }
			/>

			<Route
				path="/signin"
				element={ uid ? <Navigate to="/" /> : <SignIn /> }
			/>

			<Route
				path="/profile"
				element={ <Profile /> }
			/>
		</Routes>
	);
};

export default IsRouter;
