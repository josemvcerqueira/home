import { useState, useEffect } from "react";

export const useFetch = (url, initialState) => {
	const [result, setResult] = useState(initialState);

	const handleAPI = async () => {
		const response = await fetch(url);
		const data = await response.json();
		setResult(data);
	};

	useEffect(() => {
		handleAPI();
	}, []);

	return result;
};

export const useDynamicTransition = ({ increment, delay, length }) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(storedIndex => {
				return (storedIndex + increment) % length;
			});
		}, delay);

		return () => {
			clearInterval(interval);
		};
	}, [delay, increment]);

	return index;
};
