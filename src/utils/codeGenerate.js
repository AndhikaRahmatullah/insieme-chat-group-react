let length = 4,
	charset = "0123456789",
	retVal = "";

for (var i = 0, n = charset.length; i < length; ++i) {
	retVal += charset.charAt(Math.floor(Math.random() * n));
}

export const codeGenerate = Number(retVal)