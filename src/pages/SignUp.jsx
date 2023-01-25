import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../components/FormError";
import Footer from "../components/Footer";
import { SignUp as Daftar, GetSignUpErrorMessage } from "../services/database";
import useCreateDatabase from "../hooks/useCreateDatabase";
import { useForm } from "react-hook-form";
import { uid } from "uid";
import { codeGenerate } from "../utils/codeGenerate";

const SignUp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [imageURL, setImageURL] = useState("");
	const accountID = useRef(`insieme${uid(20)}`);

	useEffect(() => {
		document.title = "Sign Up - Insieme";
	}, []);

	// initial for redirect path
	const redirect = useNavigate();

	// useForm
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	// create image url
	const createUrl = () => {
		const inputFile = document.getElementById("inputImg");

		const file = inputFile.files[0];
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			setImageURL(reader.result);
		});

		reader.readAsDataURL(file);
	};

	// set database
	const create = useCreateDatabase();
	const currentTime = new Date().toLocaleString();

	// additional data for users database
	const additionalData = async (username, email) => {
		const path = `/users/${accountID.current}`;
		const value = {
			username: username,
			accountID: accountID.current,
			profileImage: imageURL,
			email: email,
			createdTime: currentTime,
		};
		await create.setValue(path, value);
	};

	// submit
	const onSubmit = async (formData) => {
		setIsLoading(true);
		const { username, email, password } = formData;
		try {
			await Daftar(email, password);
			await additionalData(username, email);
			redirect("/");
		} catch (error) {
			const message = GetSignUpErrorMessage(error.code);
			setIsLoading(false);
		}
	};

	return (
		<div className="container relative min-h-screen py-20">
			<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
				<div className="mb-5 flex justify-center">
					<p className="text-4xl font-bold uppercase text-primary">Sign Up</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-[1000px] rounded-2xl border-4 border-primary p-5 shadow-lg shadow-dark/50">
					<div className="flex justify-between">
						{/* left */}
						<div className="">
							{/* username */}
							<div className="mb-5">
								<label
									htmlFor="username"
									className="text-lg font-medium tracking-wide">
									Username
								</label>
								<input
									type="text"
									name="username"
									placeholder="Enter your username"
									{...register("username", { required: true })}
									className="form-input block w-72 bg-transparent focus:border-primary focus:ring-2 focus:ring-primary md:w-[500px] lg:w-[450px]"
								/>
								<FormError error={errors.username} />
							</div>

							{/* email */}
							<div className="mb-5">
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
									className="form-input block w-72 bg-transparent focus:border-primary focus:ring-2 focus:ring-primary md:w-[500px] lg:w-[450px]"
								/>
								<FormError error={errors.email} />
							</div>

							{/* password */}
							<div className="mb-5">
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
									className="form-input block w-72 bg-transparent focus:border-primary focus:ring-2 focus:ring-primary md:w-[500px] lg:w-[450px]"
								/>
								<FormError error={errors.password} />
							</div>

							{/* sk */}
							<div className="mb-10">
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										name="sk"
										className="form-checkbox"
										{...register("agreement", { required: true })}
									/>
									<label
										htmlFor="sk"
										className="text-lg font-medium">
										I agree to the terms and conditions.
									</label>
								</div>
								<FormError error={errors.agreement} />
							</div>
						</div>

						{/* right */}
						<div className="flex flex-col justify-start gap-5">
							{/* profile image */}
							<div className="mb-5">
								<label
									htmlFor="profileImage"
									className="text-lg font-medium tracking-wide">
									Profile Image
								</label>
								<input
									type="file"
									name="profileImage"
									id="inputImg"
									onChange={createUrl}
									accept="image/png, image/gif, image/jpeg"
									placeholder="Enter your profile Image"
									className="form-input block w-72 bg-transparent focus:border-primary focus:ring-2 focus:ring-primary md:w-[500px] lg:w-[450px]"
								/>
							</div>

							{/* code */}
							<div className="flex flex-col items-center justify-center border-2 border-primary bg-primary/20 py-[6px]">
								<p className="text-base font-medium">Your code :</p>
								<p className="text-2xl font-bold tracking-widest">{codeGenerate}</p>
							</div>
							{/* code-input */}
							<div className="mb-10">
								<input
									type="number"
									name="code"
									placeholder="Enter your code"
									{...register("code", { required: true, validate: (value) => Number(value) === codeGenerate })}
									className="form-input block w-72 bg-transparent focus:border-primary focus:ring-2 focus:ring-primary md:w-[500px] lg:w-[450px]"
								/>
								<FormError error={errors.code} />
							</div>
						</div>
					</div>

					{/* submit */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full cursor-pointer rounded-lg bg-primary p-1 text-lg font-bold uppercase tracking-wider text-light transition-all duration-300 hover:bg-primary/80">
						Register
					</button>

					{/* have account ? */}
					<div className="mt-5 flex justify-center">
						<p className="text-base">
							Already have an account ?{" "}
							<Link
								to="/signin"
								className="text-primary underline decoration-transparent transition-all duration-300 hover:decoration-primary">
								Sign In
							</Link>
						</p>
					</div>
				</form>
			</div>

			<Footer />
		</div>
	);
};

export default SignUp;
