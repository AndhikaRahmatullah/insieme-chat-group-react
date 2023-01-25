import { useRef, useState } from "react";
import { ref, child, push, set } from "firebase/database";
import { db } from "../services/database";

const useCreateDatabase = () => {
	const [isLoading, setIsLoading] = useState(false)
	const data = useRef(null)
	const error = useRef(null)
	const success = useRef(null)

	const pushValue = async (path, value) => {
		setIsLoading(true)
		try {
			const rootReference = ref(db)
			const dbPath = child(rootReference, path)
			const dbPush = await push(dbPath, value)
			// opsional jika ingin merekam data key
			data.current = { key: dbPush.key, value }
			success.current = true
		} catch (pushError) {
			error.current = pushError.message
		}
		setIsLoading(false)
	}

	const setValue = async (path, value) => {
		setIsLoading(true)
		try {
			const rootReference = ref(db)
			const dbPath = child(rootReference, path)
			await set(dbPath, value)
			success.current = true
		} catch (pushError) {
			error.current = pushError.message
		}
		setIsLoading(false)
	}

	return {
		isLoading,
		data: data.current,
		error: error.current,
		success: success.current,
		pushValue,
		setValue
	}
}

export default useCreateDatabase