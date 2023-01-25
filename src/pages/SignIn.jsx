import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormError from "../components/FormError";
import Footer from "../components/Footer";
import { SignIn as Masuk, GetSignInErrorMessage } from "../services/database";
import useGetDatabase from "../hooks/useGetDatabase";
import { useForm } from "react-hook-form";

const SignIn = () => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		document.title = "Sign In - Insieme";
	}, []);

	// initial for redirect path
	const redirect = useNavigate();

	// username from users database
	const usersDatabase = useRef({});

	// get users database
	const getUsers = useGetDatabase("users", true);
	const { dbValue } = getUsers;

	// useForm
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	// watching field email
	const email = useRef({});
	email.current = watch("email");

	// validation user database
	if (dbValue) {
		dbValue.map((e) => {
			if (email.current === e.email) {
				usersDatabase.current = {
					username: e.username,
					accountID: e.accountID,
				};
			}
		});
	}

	// submit
	const onSubmit = async (formData) => {
		setIsLoading(true);
		const { email, password } = formData;
		try {
			await Masuk(email, password);
			redirect("/");
		} catch (error) {
			const message = GetSignInErrorMessage(error.code);
			setIsLoading(false);
		}
	};

	return (
		<div className="container relative min-h-screen py-20">
			<div className="absolute top-[50%] left-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center">
				<div className="mb-5 flex justify-center">
					<p className="text-center text-4xl font-bold uppercase text-primary">{usersDatabase.current.username ? usersDatabase.current.username : "welcome to insieme"}</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex w-[400px] flex-col items-center justify-center rounded-2xl border-4 border-primary p-5 shadow-lg shadow-dark/50">
					{/* email */}
					<div className="mb-5 w-full">
						<label
							htmlFor="email"
							className="text-lg font-medium tracking-wide">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							{...register("email", { required: true })}
							className="form-input block w-full bg-transparent focus:border-primary focus:ring-2 focus:ring-primary"
						/>
						<FormError error={errors.email} />
					</div>

					{/* password */}
					<div className="mb-10 w-full">
						<label
							htmlFor="password"
							className="text-lg font-medium tracking-wide">
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
							{...register("password", { required: true, minLength: 6 })}
							className="form-input block w-full bg-transparent focus:border-primary focus:ring-2 focus:ring-primary"
						/>
						<FormError error={errors.password} />
					</div>

					{/* submit */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full cursor-pointer rounded-lg bg-primary p-1 text-lg font-bold uppercase tracking-wider text-light transition-all duration-300 hover:bg-primary/80">
						sign in
					</button>

					{/* dont have account ? */}
					<div className="mt-5">
						<p className="text-base">
							Don't have an account ?{" "}
							<Link
								to="/signup"
								className="text-primary underline decoration-transparent transition-all duration-300 hover:decoration-primary">
								Sign Up
							</Link>
						</p>
					</div>
				</form>
			</div>

			<Footer />
		</div>
	);
};

export default SignIn;
