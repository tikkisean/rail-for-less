import React, { useState } from "react";
import Form from "./Form";
import ProgressBar from "./ProgressBar";
import FareTable from "./FareTable";
import ProgressTrain from "./ProgressTrain";
import ProgressCrossing from "./ProgressCrossing";
import "./Home.css";

export default function Home() {
	const [progress, setProgress] = useState({});
	const [fares, setFares] = useState({});

	function progressBool() {
		return Object.keys(progress).length > 0 && Object.keys(fares).length === 0;
	}

	function progressState() {
		if (
			Object.keys(progress).length === 0 &&
			!window.matchMedia("(max-width: 480px)").matches
		) {
			return <div style={{ height: "30vh" }}></div>;
		} else if (
			Object.keys(progress).length > 0 &&
			Object.keys(fares).length === 0
		) {
			return (
				<div class="fade-in" id="progress" style={{ height: "auto" }}>
					<h1>{progress.percentComplete + "%"}</h1>
					{progress.time && <ProgressBar progress={progress} />}
					<h2>{progress.date}</h2>
					<h2>{progress.info}</h2>
				</div>
			);
		}
	}

	function crossingState() {
		if (progress.percentComplete > 0) {
			return <ProgressCrossing />;
		} else {
			return (
				<img
					alt=""
					class="fade-in"
					id="crossing"
					src={`./images/crossing-up.png`}
				/>
			);
		}
	}

	return (
		<div id="hero-text-container">
			<div class="fade-in-translate" id="hero-text">
				<h1>RailForLess.us</h1>
				{Object.keys(fares).length === 0 && (
					<h2>
						Rail travel should be accessible to <em>everyone</em>. Find the
						cheapest fares for Amtrak routes across the country with flexible
						scheduling.
					</h2>
				)}
			</div>
			<Form
				fares={fares}
				setFares={setFares}
				progress={progress}
				setProgress={setProgress}
			/>
			{Object.keys(fares).length > 0 && <FareTable fares={fares} />}
			{progressState()}
			{progressBool() && <ProgressTrain progress={progress} />}
			{progressBool() && <div style={{ height: "5vh" }}></div>}
			{progressBool() && crossingState()}
		</div>
	);
}
