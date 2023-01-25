import { initializeApp, getApps } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
	apiKey: "AIzaSyAO2RIVT2IWcTWkEfTWTRL7zWlrml9zPqA",
	authDomain: "project-db-insieme.firebaseapp.com",
	databaseURL: "https://project-db-insieme-default-rtdb.firebaseio.com",
	projectId: "project-db-insieme",
	storageBucket: "project-db-insieme.appspot.com",
	messagingSenderId: "363388025778",
	appId: "1:363388025778:web:994ae25682f07613a1c2ab"
};

if (!getApps().length) {
	initializeApp(firebaseConfig)
}

export const db = getDatabase()

export const FirebaseAuth = getAuth()

// deteksi status sudah login atau belum
export const Authentication = () => {
	return FirebaseAuth
}

// sign up
export const SignUp = async (email, password) => {
	await createUserWithEmailAndPassword(FirebaseAuth, email, password)
}

// sign in
export const SignIn = async (email, password) => {
	await signInWithEmailAndPassword(FirebaseAuth, email, password)
}

// sign out
export const SignOut = async () => {
	await signOut(FirebaseAuth)
}

// pesan error saat sign in
export const GetSignInErrorMessage = (code) => {
	switch (code) {
		case "auth/user-not-found":
			return "Email tidak terdaftar"
		case "auth/wrong-password":
			return "Email atau Password Salah"
	}
}

// pesan error saat sign up
export const GetSignUpErrorMessage = (code) => {
	switch (code) {
		case "auth/email-already-in-use":
			return "Email telah terdaftar."
		default:
			return "Terjadi kesalahan saat proses Sign Up."
	}
}
