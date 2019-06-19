import React, { useState, useEffect } from "react";

const Joke = props => {
	const [joke, setJoke] = useState({});

	const handleJokesAPI = async () => {
		const response = await fetch(
			"https://official-joke-api.appspot.com/jokes/random"
		);
		const data = await response.json();
		setJoke(data);
	};

	// empty array has a 2nd argument = componentDidMount
	useEffect(() => {
		handleJokesAPI();
	}, []);

	const { setup, punchline } = joke;

	return (
		<div>
			<h3>Joke of the session</h3>
			<p>{setup}</p>
			<p>
				<em>{punchline}</em>
			</p>
		</div>
	);
};

export default Joke;
