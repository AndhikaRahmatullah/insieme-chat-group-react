import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../context/user";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
const LazyHome = lazy(() => import('../pages/Home'));
const LazyProfile = lazy(() => import('../pages/Profile'))

const IsRouter = () => {
	const { uid } = useUser()

	return (
		<Suspense fallback="Loading ...">
			<Routes>
				<Route
					path="/"
					element={ <LazyHome /> }
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
					element={ <LazyProfile /> }
				/>
			</Routes>
		</Suspense>
	);
};

export default IsRouter;
