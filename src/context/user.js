import { useContext, createContext, useState } from "react";

export const InitialUserState = {
	email: null,
	uid: null
}

const UserContext = createContext()

// reuseble di semua halaman 
export const useUser = () => {
	return useContext(UserContext)
}

const UserProvider = (props) => {
	const [userState, setUserState] = useState(InitialUserState)

	const SetUser = (userCredential) => {
		setUserState({ ...userCredential })
	}

	const ResetUser = () => {
		setUserState(InitialUserState)
	}

	const value = { ...userState, SetUser, ResetUser }
	return <UserContext.Provider value={ value } { ...props } />
}

export default UserProvider