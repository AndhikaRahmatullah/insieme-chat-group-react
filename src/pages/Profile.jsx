import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/user.js";
import useGetDatabase from "../hooks/useGetDatabase";
import useUpdateDatabase from "../hooks/useUpdateDatabase.js";

const Profile = () => {
	const username = useRef("");

	const [usernameUpdate, setUsernameUpdate] = useState("");
	const [profileImageUpdate, setProfileImageUpdate] = useState("");
	const updateDb = useUpdateDatabase();

	useEffect(() => {
		document.title = "Profile - Insieme";
	}, []);

	// current user
	const { email } = useUser();

	// database from users database
	const usersDatabase = useRef({});

	// get users database
	const getUsers = useGetDatabase("users", true);
	const { dbValue, getValueLater } = getUsers;

	useEffect(() => {
		setUsernameUpdate(usersDatabase.current.username);
		setProfileImageUpdate(usersDatabase.current.profileImage);
	}, [usersDatabase.current.username]);

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

	// toggle username field
	const usernameEdit = () => {
		const usernameFix = document.getElementById("usernameFix");
		const usernameField = document.getElementById("usernameField");
		const inputField = document.getElementById("inputField");
		usernameFix.classList.toggle("hidden");
		usernameField.classList.toggle("hidden");
		inputField.focus();
	};

	// button open file image
	const uploadImage = () => {
		let fileInput = document.getElementById("inputImg");
		fileInput.click();
	};

	// set path for change profile image
	const updateprofileImage = async () => {
		const path = `/users/${usersDatabase.current.accountID}`;
		const value = {
			profileImage: profileImageUpdate,
		};

		await updateDb.updateDoc(path, value);
	};

	// create image url
	const createUrl = async () => {
		const fileSelector = document.getElementById("fileSelector");
		const actionChangeImage = document.getElementById("actionChangeImage");
		const inputFile = document.getElementById("inputImg");
		const file = inputFile.files[0];
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			setProfileImageUpdate(reader.result);
			fileSelector.classList.add("hidden");
			actionChangeImage.classList.remove("hidden");
		});
		reader.readAsDataURL(file);
	};

	// profile image update
	const updateProfileImage = async () => {
		try {
			await updateprofileImage();
			getValueLater();
		} catch (error) {
			alert(error);
		}
	};

	// profile image unupdate
	const unUpdateProfileImage = () => {
		const fileSelector = document.getElementById("fileSelector");
		const actionChangeImage = document.getElementById("actionChangeImage");
		fileSelector.classList.remove("hidden");
		actionChangeImage.classList.add("hidden");
		setProfileImageUpdate(usersDatabase.current.profileImage);
	};

	// username change
	const handleChange = (e) => {
		let value = e.target.value;
		setUsernameUpdate(value);
	};

	// set path for change username
	const updateUsername = async () => {
		const path = `/users/${usersDatabase.current.accountID}`;
		const value = {
			username: usernameUpdate,
		};

		await updateDb.updateDoc(path, value);
	};

	// username update
	const updateDatabase = async () => {
		try {
			await updateUsername();
			getValueLater();
			usernameEdit();
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className="container relative py-20">
			<div className="mt-10 flex flex-col items-center">
				{usersDatabase.current.accountID ? (
					<>
						{/* profile image */}
						<div className="relative">
							<div
								className="h-[400px] w-[400px] rounded-full border-4 border-primary bg-cover bg-center shadow-lg shadow-black/40"
								style={{ backgroundImage: `url(${profileImageUpdate})` }}></div>
							<img
								src={require("../assets/edit.png")}
								alt="change-image"
								id="fileSelector"
								onClick={uploadImage}
								className="absolute right-5 bottom-4 w-[40px] cursor-pointer"
							/>
							<input
								type="file"
								id="inputImg"
								accept="image/png, image/gif, image/jpeg"
								onChange={createUrl}
								className="hidden"
							/>
							<div
								id="actionChangeImage"
								className="hidden">
								<button onClick={updateProfileImage}>Ubah</button>
								<button onClick={unUpdateProfileImage}>Batal</button>
							</div>
						</div>

						{/* data */}
						<div className="flex w-[700px] flex-col gap-5">
							{/* username */}
							<div className="">
								<p className="">Username</p>
								<div
									id="usernameFix"
									className="form-input flex justify-between">
									<p className="">{usersDatabase.current.username}</p>
									<button onClick={usernameEdit}>EDIT</button>
								</div>
								<div
									id="usernameField"
									className="relative hidden">
									<input
										type="text"
										onChange={handleChange}
										value={usernameUpdate}
										id="inputField"
										placeholder={usersDatabase.current.username}
										className="form-input w-full pr-36 outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
									/>
									<div className="absolute right-2 top-[50%] flex translate-y-[-50%] gap-2">
										<button
											onClick={updateDatabase}
											className="text-primary">
											UPDATE
										</button>
										<button
											onClick={usernameEdit}
											className="text-red-600">
											CANCEL
										</button>
									</div>
								</div>
							</div>

							{/* account id */}
							<div className="">
								<p className="">Account ID</p>
								<p className="form-input bg-dark/50">{usersDatabase.current.accountID}</p>
							</div>

							{/* email */}
							<div className="">
								<p className="">Email</p>
								<p className="form-input bg-dark/50">{usersDatabase.current.email}</p>
							</div>
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}

				{/* back */}
				<div className="mt-10">
					<Link
						to="/"
						className="rounded-lg bg-primary p-2 text-xl font-bold tracking-wide text-light shadow-lg shadow-dark/30 transition-all duration-300 hover:bg-primary/80">
						Back To Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Profile;
