import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/user";
import AuthStateChangeProvider from "./context/auth";
import IsRouter from "./components/Router";

const App = () => {
	useEffect(() => {
		document.title = "Insieme";
	}, []);

	return (
		<div className="">
			<UserProvider>
				<AuthStateChangeProvider>
					<BrowserRouter>
						<IsRouter />
					</BrowserRouter>
				</AuthStateChangeProvider>
			</UserProvider>
		</div>
	);
};

export default App;
