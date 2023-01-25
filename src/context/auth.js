import { useEffect, useState } from "react";
import { Authentication } from "../services/database";
import { useUser, InitialUserState } from "./user";

const AuthStateChangeProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const user = useUser()
	const { SetUser } = user


	// mendeteksi user login atau tidak
	const InitiateAuthStateChange = () => {
		// onAuthStateChanged sintak firebase 
		Authentication().onAuthStateChanged((user) => {
			if (user) {
				SetUser({ email: user.email, uid: user.uid })
			} else {
				SetUser(InitialUserState)
			}
			setIsLoading(false)
		})
	}

	useEffect(() => {
		InitiateAuthStateChange()
	}, [])

	// loading handle saat memulai halaman, berlaku di semua halaman
	if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<div
					className="inline-block h-10 w-10 animate-spin rounded-full border-4 text-blue-600"
					role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		)
	}

	return children
}

export default AuthStateChangeProvider