import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Alerts from "./Alerts";
import Home from "./Home";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import Subscribed from "./Subscribed";
import Unsubscribed from "./Unsubscribed";
import "./AppRouter.css";

export default function AppRouter() {
	const [searching, setSearching] = useState(false);
	const [searchError, setSearchError] = useState(false);
	const [showTurnstile, setShowTurnstile] = useState(false);

	const [searchAnimationsBool, setSearchAnimationsBool] = useState(
		window.matchMedia("(prefers-reduced-motion)").matches
			? false
			: localStorage.getItem("searchAnimations")
			? JSON.parse(localStorage.getItem("searchAnimations"))
			: true
	);

	return (
		<main>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							searching={searching}
							setSearching={setSearching}
							searchError={searchError}
							setSearchError={setSearchError}
							showTurnstile={showTurnstile}
							setShowTurnstile={setShowTurnstile}
							searchAnimationsBool={searchAnimationsBool}
							setSearchAnimationsBool={setSearchAnimationsBool}
						/>
					}
				/>
				<Route path="/about" element={<About />} />
				<Route path="/alerts" element={<Alerts />} />
				<Route path="/subscribed" element={<Subscribed />} />
				<Route path="/unsubscribed" element={<Unsubscribed />} />
				<Route
					path="/:mode/*"
					element={
						<Home
							searching={searching}
							setSearching={setSearching}
							searchError={searchError}
							setSearchError={setSearchError}
							showTurnstile={showTurnstile}
							setShowTurnstile={setShowTurnstile}
						/>
					}
				/>
				<Route path="*" element={<NotFound msg={"Invalid URL"} />} />
			</Routes>
			{searching && !searchError && !showTurnstile && searchAnimationsBool && (
				<img alt="" id="acela" src="/images/acela.svg" />
			)}
		</main>
	);
}
