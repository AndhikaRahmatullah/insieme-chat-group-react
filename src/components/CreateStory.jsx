import { useRef, useState } from "react";
import useCreateDatabase from "../hooks/useCreateDatabase";
import { uid } from "uid";
import { motion, AnimatePresence } from "framer-motion";

const CreateStory = ({ currentEmail, currentUsername, currentProfileImage, rerender }) => {
	const [textStory, setTexStory] = useState("");
	const [imageURL, setImageURL] = useState("");

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

	// create data for posts database
	const createPostDb = async () => {
		const path = `/posts`;
		const value = {
			id: `postsID${uid(40)}`,
			authorEmail: currentEmail,
			creatorUsername: currentUsername,
			creatorProfileImage: currentProfileImage,
			textStory: textStory,
			imageStory: imageURL,
			createdTime: currentTime,
		};
		// await create.setValue(path, value);
		await create.pushValue(path, value);
	};

	// upload image
	const uploadImage = () => {
		let fileInput = document.getElementById("inputImg");
		fileInput.click();
	};

	// delete image
	const deleteImage = () => {
		setImageURL("");
	};

	// upload text story
	const createText = (e) => {
		let value = e.target.value;
		setTexStory(value);
	};

	// upload
	const upload = async () => {
		if (!textStory) {
			return alert("Please type something !");
		}
		try {
			await createPostDb();
			rerender();
			deleteImage();
			setTexStory("");
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="w-[700px] rounded-lg bg-primary pt-6 pb-3 shadow-lg shadow-dark/40">
				{/* text story */}
				<div className="mb-3 flex justify-center">
					<motion.textarea
						whileFocus={{ scale: 1.2 }}
						transition={{ type: "spring" }}
						value={textStory}
						onChange={createText}
						placeholder="What's on your mind ?"
						className="form-textarea z-10 mx-5 h-[200px] w-full resize-none border-none outline-none focus:shadow-lg focus:shadow-dark/50 focus:ring-2 focus:ring-dark"></motion.textarea>
				</div>

				{/* button action */}
				<div className="mx-5 flex items-center justify-between gap-3">
					{/* add image */}
					<div className="flex gap-3">
						<img
							src={require("../assets/image.png")}
							alt="add-image"
							id="file-selector"
							onClick={uploadImage}
							className="w-[50px] cursor-pointer"
						/>
						<input
							type="file"
							id="inputImg"
							accept="image/png, image/gif, image/jpeg"
							onChange={createUrl}
							className="hidden"
						/>

						<AnimatePresence>
							<div className="relative">
								{/* image */}
								{imageURL && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="h-[50px] max-h-[50px] w-[50px] max-w-[50px] bg-cover bg-center"
										style={{ backgroundImage: `url(${imageURL})` }}></motion.div>
								)}

								{/* delete image */}
								{imageURL && (
									<div className="absolute -top-2 -right-2">
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											onClick={deleteImage}
											className="relative h-5 w-5 cursor-pointer rounded-full bg-light p-1 shadow-lg shadow-dark/50">
											<span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-primary">X</span>
										</motion.div>
									</div>
								)}
							</div>
						</AnimatePresence>
					</div>

					{/* send */}
					<button
						onClick={upload}
						className="rounded-lg bg-light px-2 py-1 text-lg font-bold tracking-wide text-primary">
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateStory;
