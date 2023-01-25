import { useRef, useState } from "react";
import { ref, child, update } from "firebase/database";
import { db } from "../services/database";

const useUpdateDatabase = () => {
	const [isLoading, setIsLoading] = useState(false)
	const error = useRef(null)
	const success = useRef(null)

	const updateDoc = async (path, value) => {
		setIsLoading(true)
		try {
			const rootReference = ref(db)
			const dbPath = child(rootReference, path)
			await update(dbPath, value)
			success.current = true
		} catch (updateEror) {
			error.current = updateEror.message
		}
		setIsLoading(false)
	}

	const updateField = async (updates) => {
		setIsLoading(true)
		try {
			const rootReference = ref(db)
			await update(rootReference, updates)
			success.current = true
		} catch (updateEror) {
			error.current = updateEror.message
		}
		setIsLoading(false)
	}

	return {
		isLoading,
		error: error.current,
		success: success.current,
		updateDoc,
		updateField,
	}
}

export default useUpdateDatabase