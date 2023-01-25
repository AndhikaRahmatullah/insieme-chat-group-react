import React from "react";

const Profile = () => {
	return (
		<div>
			<p className="">aaaaaaa</p>
			<iframe
				src={require("../pages/SignIn.jsx")}
				width="500"
				height="500"
			/>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15854.229841535775!2d106.78244315!3d-6.57739675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1674651526369!5m2!1sid!2sid"
				width="600"
				height="450"
				style={{ border: "0px" }}
				allowFullScreen=""
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			/>
		</div>
	);
};

export default Profile;
