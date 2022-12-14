import React, { useEffect, useState } from "react";
import Status from "./Status";
import "./Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faCircleQuestion,
	faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

export default function Form({ fares, setFares, progress, setProgress }) {
	let [allStations, setAllStations] = useState({});
	let [deptStations, setDeptStations] = useState({});
	let [arrivalStations, setArrivalStations] = useState({});

	useEffect(() => {
		fetch("/api/stations")
			.then((res) => res.json())
			.then((data) => {
				setAllStations({ ...data.stations });
				setDeptStations({ ...data.stations });
				setArrivalStations({ ...data.stations });
			});
	}, []);

	function renderStations(stations) {
		return Object.keys(stations).map((station) => (
			<option key={station} value={station}>
				{station}
			</option>
		));
	}

	function filterStations(routeStation, stations) {
		let filteredStations = {};
		for (const station in stations) {
			const mutualStation = stations[station].routes.some((route) => {
				return stations[routeStation].routes.includes(route);
			});
			if (mutualStation) {
				filteredStations[station] = stations[station];
			}
		}
		return filteredStations;
	}

	const [direct, setDirect] = useState(false);

	const [deptStation, setDeptStation] = useState("");

	if (arrivalStations.hasOwnProperty(deptStation)) {
		if (direct) {
			arrivalStations = filterStations(deptStation, arrivalStations);
		}
		delete arrivalStations[deptStation];
		setArrivalStations(arrivalStations);
	} else if (
		!allStations.hasOwnProperty(deptStation) &&
		Object.keys(arrivalStations).length !== Object.keys(allStations).length
	) {
		setArrivalStations({ ...allStations });
	}

	const [arrivalStation, setArrivalStation] = useState("");

	if (deptStations.hasOwnProperty(arrivalStation)) {
		if (direct) {
			deptStations = filterStations(arrivalStation, deptStations);
		}
		delete deptStations[arrivalStation];
		setDeptStations(deptStations);
	} else if (
		!allStations.hasOwnProperty(arrivalStation) &&
		Object.keys(deptStations).length !== Object.keys(allStations).length
	) {
		setDeptStations({ ...allStations });
	}

	function autocorrect(input, stations) {
		for (const station in stations) {
			if (
				input.toLowerCase().replaceAll(" ", "") ===
					station.toLowerCase().replaceAll(" ", "") ||
				input == stations[station].code
			) {
				return station;
			}
		}
		return input;
	}

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const [coach, setCoach] = useState(true);
	const [business, setBusiness] = useState(false);
	const [first, setFirst] = useState(false);

	const [roomette, setRoomette] = useState(false);
	const [bedroom, setBedroom] = useState(false);
	const [familyBedroom, setFamilyBedroom] = useState(false);

	function handleSetDirect() {
		if (direct) {
			if (
				!window.confirm(
					"Room fares are only available on direct routes. Would you like to disable this option?"
				)
			) {
				return;
			}
			setRoomette(false);
			setBedroom(false);
			setFamilyBedroom(false);
		}
		setDirect(!direct);
		setArrivalStations({ ...allStations });
	}

	function renderInputColor(station, stations) {
		if (!stations.hasOwnProperty(station)) {
			return "darkGray";
		}
	}

	function calcMaxEndDate() {
		if (startDate) {
			const maxEndDate = new Date(startDate);
			maxEndDate.setDate(maxEndDate.getDate() + 8);
			return maxEndDate.toISOString().split("T")[0];
		}
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (!Object.keys(deptStations).includes(deptStation)) {
			alert("Please enter a valid departure station.");
			return;
		} else if (!Object.keys(arrivalStations).includes(arrivalStation)) {
			alert("Please enter a valid arrival station.");
			return;
		} else if (
			!(coach || business || first) &&
			!(roomette || bedroom || familyBedroom)
		) {
			alert("Please select at least one seating or room option.");
			return;
		} else if (
			!window.confirm(
				"Requesting fares may take a few minutes and you will not be able to refresh this page. Note that the first departure each date will be selected."
			)
		) {
			return;
		}

		fetch("/api/status")
			.then((res) => res.json())
			.then((data) => {
				setStatus(data.status);
				if (!data.status) {
					alert(
						"Server busy, please wait. Refresh status indicator for updates."
					);
					return;
				} else {
					setFares({});

					const socket = new WebSocket("wss://railforless.us/ws");

					// Enable the line below during development
					// const socket = new WebSocket("ws://localhost:5001");

					let date = new Date(startDate + "T00:00");
					const dates = [];
					while (date <= new Date(endDate + "T00:00")) {
						dates.push(date.toLocaleString().split(",")[0]);
						date.setDate(date.getDate() + 1);
					}

					const fareMessage = {
						deptCode: deptStations[deptStation].code,
						arrivalCode: arrivalStations[arrivalStation].code,
						dates: dates,
						coach: coach,
						business: business,
						first: first,
						roomette: roomette,
						bedroom: bedroom,
						familyBedroom: familyBedroom,
					};
					socket.onopen = (e) => {
						socket.send(JSON.stringify(fareMessage));
					};

					socket.onmessage = (msg) => {
						const data = JSON.parse(msg.data);
						if (data.progress) {
							setProgress(data.progress);
						} else if (data.fares) {
							socket.close();
							setFares(data.fares);
						}
					};
				}
			});
	}

	function updateStatus() {
		fetch("/api/status")
			.then((res) => res.json())
			.then((data) => {
				setStatus(data.status);
			});
	}

	const [status, setStatus] = useState(false);

	useEffect(() => {
		updateStatus();
	}, [fares, progress]);

	const [seatsExpanded, setSeatsExpanded] = useState(false);
	const [roomsExpanded, setRoomsExpanded] = useState(false);
	const [moreExpanded, setMoreExpanded] = useState(false);

	function handleSeatsExpanded() {
		if (!seatsExpanded) {
			setRoomsExpanded(false);
			setMoreExpanded(false);
		}
		setSeatsExpanded(!seatsExpanded);
	}

	function handleRoomsExpanded() {
		if (!roomsExpanded) {
			if (!direct) {
				if (
					!window.confirm(
						"Room fares are only available on direct routes. Would you like to enable this option?"
					)
				) {
					return;
				}
				setDirect(true);
				setArrivalStations({ ...allStations });
			}
			setSeatsExpanded(false);
			setMoreExpanded(false);
		}
		setRoomsExpanded(!roomsExpanded);
	}

	function handleMoreExpanded() {
		if (!moreExpanded) {
			setSeatsExpanded(false);
			setRoomsExpanded(false);
		}
		setMoreExpanded(!moreExpanded);
	}

	return (
		<form class="fade-in-translate" onSubmit={handleSubmit}>
			<div className="input-row">
				<datalist id="dept-stations">{renderStations(deptStations)}</datalist>
				<div className="input-column">
					<label htmlFor="from">Departure Station</label>
					{window.matchMedia("(min-width: 481px)").matches && (
						<input
							id="from"
							list="dept-stations"
							name="from"
							onChange={(e) =>
								setDeptStation(autocorrect(e.target.value, deptStations))
							}
							placeholder="name or code"
							required
							style={{ color: renderInputColor(deptStation, deptStations) }}
							type="search"
							value={deptStation}
						/>
					)}
					{window.matchMedia("(max-width: 480px)").matches && (
						<select
							id="from"
							name="from"
							onChange={(e) => setDeptStation(e.target.value)}
							required
							value={deptStation}
						>
							<option></option>
							{renderStations(deptStations)}
						</select>
					)}
				</div>
				<datalist id="arrival-stations">
					{renderStations(arrivalStations)}
				</datalist>
				<div className="input-column">
					<label htmlFor="to">Arrival Station</label>
					{window.matchMedia("(min-width: 481px)").matches && (
						<input
							id="to"
							list="arrival-stations"
							name="to"
							onChange={(e) =>
								setArrivalStation(autocorrect(e.target.value, arrivalStations))
							}
							placeholder="name or code"
							required
							style={{
								color: renderInputColor(arrivalStation, arrivalStations),
							}}
							type="search"
							value={arrivalStation}
						/>
					)}
					{window.matchMedia("(max-width: 480px)").matches && (
						<select
							id="to"
							name="to"
							onChange={(e) => setArrivalStation(e.target.value)}
							required
							value={arrivalStation}
						>
							<option></option>
							{renderStations(arrivalStations)}
						</select>
					)}
				</div>
				<div className="input-column">
					<label htmlFor="start-date">Start Date</label>
					<input
						id="start-date"
						min={new Date().toISOString().split("T")[0]}
						name="start-date"
						onChange={(e) => setStartDate(e.target.value)}
						required
						type="date"
						value={startDate}
					/>
				</div>
				<div className="input-column">
					<label htmlFor="end-date">End Date</label>
					<input
						id="end-date"
						max={calcMaxEndDate()}
						min={startDate}
						name="end-date"
						onChange={(e) => setEndDate(e.target.value)}
						required
						type="date"
						value={endDate}
					/>
				</div>
				<div className="input-column">
					<input
						id="submit"
						name="submit"
						required
						type="submit"
						value="Get Fares"
					/>
				</div>
			</div>
			<div id="more-options">
				<div id="options-container">
					<div className="options-toggle" onClick={() => handleSeatsExpanded()}>
						<h3>Seats</h3>
						<FontAwesomeIcon
							className="dropdown"
							icon={faAngleDown}
							style={{
								transform: seatsExpanded ? "rotate(180deg)" : "rotate(0)",
							}}
						/>
					</div>
					<div className="options-toggle" onClick={() => handleRoomsExpanded()}>
						<h3>Rooms</h3>
						<FontAwesomeIcon
							className="dropdown"
							icon={faAngleDown}
							style={{
								transform: roomsExpanded ? "rotate(180deg)" : "rotate(0)",
							}}
						/>
					</div>
					<div className="options-toggle" onClick={() => handleMoreExpanded()}>
						<h3>More</h3>
						<FontAwesomeIcon
							className="dropdown"
							icon={faAngleDown}
							style={{
								transform: moreExpanded ? "rotate(180deg)" : "rotate(0)",
							}}
						/>
					</div>
				</div>
				<Status status={status} updateStatus={updateStatus} />
			</div>
			{seatsExpanded && (
				<div className="input-row">
					<div className="checkbox">
						<input
							checked={coach}
							id="coach"
							name="coach"
							onChange={(e) => setCoach(!coach)}
							type="checkbox"
							value={coach}
						/>
						<FontAwesomeIcon icon={faDollarSign} />
						<label htmlFor="coach">Coach</label>
						<a
							href="https://www.amtrak.com/onboard-the-train-seating-accommodations"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FontAwesomeIcon icon={faCircleQuestion} />
						</a>
					</div>
					<div className="checkbox">
						<input
							id="business"
							checked={business}
							name="business"
							onChange={(e) => setBusiness(!business)}
							type="checkbox"
						/>
						<div>
							<FontAwesomeIcon icon={faDollarSign} />
							<FontAwesomeIcon icon={faDollarSign} />
						</div>
						<label htmlFor="business">Business</label>
						<a
							href="https://www.amtrak.com/onboard-the-train-seating-accommodations"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FontAwesomeIcon icon={faCircleQuestion} />
						</a>
					</div>
					<div className="checkbox">
						<input
							id="first"
							checked={first}
							name="first"
							onChange={(e) => setFirst(!first)}
							type="checkbox"
						/>
						<div>
							<FontAwesomeIcon icon={faDollarSign} />
							<FontAwesomeIcon icon={faDollarSign} />
							<FontAwesomeIcon icon={faDollarSign} />
						</div>
						<label htmlFor="first">First</label>
						<a
							href="https://www.amtrak.com/onboard-the-train-seating-accommodations"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FontAwesomeIcon icon={faCircleQuestion} />
						</a>
					</div>
				</div>
			)}
			{roomsExpanded && (
				<div className="input-row">
					<div className="checkbox">
						<input
							checked={roomette}
							id="roomette"
							name="roomette"
							onChange={(e) => setRoomette(!roomette)}
							type="checkbox"
						/>
						<img alt="" src="./images/roomette-white.svg" />
						<label htmlFor="roomette">Roomette</label>
						<a
							href="https://www.amtrak.com/roomette"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FontAwesomeIcon icon={faCircleQuestion} />
						</a>
					</div>
					<div className="checkbox">
						<input
							checked={bedroom}
							id="bedroom"
							name="bedroom"
							onChange={(e) => setBedroom(!bedroom)}
							type="checkbox"
						/>
						<img alt="" src="./images/family-bedroom-white.svg" />
						<label htmlFor="bedroom">Bedroom</label>
						<a
							href="https://www.amtrak.com/bedroom"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FontAwesomeIcon icon={faCircleQuestion} />
						</a>
					</div>
					<div className="checkbox">
						<input
							checked={familyBedroom}
							id="family-bedroom"
							name="family-bedroom"
							onChange={(e) => setFamilyBedroom(!familyBedroom)}
							type="checkbox"
						/>
						<img alt="" src="./images/bedroom-white.svg" />
						<label htmlFor="family-bedroom">Family Bedroom</label>
						<a
							href="https://www.amtrak.com/family-room"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FontAwesomeIcon icon={faCircleQuestion} />
						</a>
					</div>
				</div>
			)}
			{moreExpanded && (
				<div className="input-row">
					<div className="checkbox">
						<input
							checked={direct}
							id="direct"
							name="direct"
							onChange={(e) => handleSetDirect()}
							type="checkbox"
						/>
						<label htmlFor="direct">Direct routes only</label>
					</div>
				</div>
			)}
		</form>
	);
}
