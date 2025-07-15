import React, { useEffect, useState } from "react";

const Loader = () => {
	const [dots, setDots] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col justify-center items-center h-[80vh]">
			<div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-primary"></div>
			<div className="mt-3">
				<p className="text-xl">Loading{dots}</p>
			</div>
		</div>
	);
};

export default Loader;
