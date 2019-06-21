import React, { useState } from "react";

import Joke from "./Joke";
import Stories from "./Stories";
import Tasks from "./Tasks";
import Gallery from "./Gallery";

const App = () => {
	const [userQuery, setUserQuery] = useState("");
	const [showGallery, setShowGallery] = useState(true);

	const updateUserQuery = event => {
		setUserQuery(event.target.value);
	};

	const searchQuery = () => {
		window.open(`https://google.com/search?q=${userQuery}`, "_blank");
	};

	const handleKeyPress = event => {
		if (event.key === "Enter") {
			searchQuery();
		}
	};

	const toggleShowGallary = () => {
		setShowGallery(prevState => !prevState);
	};

	return (
		<div className="App">
			<h1>Hello Jose</h1>
			<div className="form">
				<input
					value={userQuery}
					onChange={updateUserQuery}
					type="text"
					onKeyPress={handleKeyPress}
				/>
				<button onClick={searchQuery}>Search</button>
			</div>
			<hr />
			<Joke />
			<hr />
			<Tasks />
			<hr />
			{showGallery ? <Gallery /> : null}
			<button onClick={toggleShowGallary}>
				{showGallery ? "Hide" : "Show"} Gallery
			</button>
			<hr />
			<Stories />
		</div>
	);
};

export default App;
