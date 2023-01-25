const GetErrorMessage = (type) => {
	switch (type) {
		case "minLength":
			return "Kata yang dimasukkan tidak memenuhi kuantitas minimum yang diharuskan.";
		case "validate":
			return "Input tidak sesuai dengan kriteria validasi.";
		case "required":
		default:
			return "Mohon mengisi field yang tersedia.";
	}
};

const FormError = ({ error }) => {
	if (!error) {
		return <></>;
	}

	const { type } = error;
	const message = GetErrorMessage(type);

	return <span className="text-sm font-medium text-primary">{message}</span>;
};

export default FormError;
