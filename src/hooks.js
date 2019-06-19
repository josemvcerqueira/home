import { useState, useEffect } from "react";

export const useFetch = (url, initialState) => {
	const [result, setResult] = useState(initialState);

	const handleAPI = async () => {
		const response = await fetch(url);
		const data = await response.json();
		setResult(data);
	};

	useEffect(async () => {
		handleAPI();
	}, []);

	return result;
};
