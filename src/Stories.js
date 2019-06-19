import React from "react";

import { useFetch } from "./hooks";

const Stories = props => {
	const stories = useFetch(
		"https://news-proxy-server.appspot.com/topstories",
		[]
	);
	return (
		<div className="Stories">
			<h3>Stories</h3>
			{stories.map(({ id, by, time, title, url }) => (
				<div key={id}>
					<a href={url}>{title}</a>
					<div>
						{by} - {new Date(time * 1000).toLocaleString()}
					</div>
				</div>
			))}
		</div>
	);
};

export default Stories;
