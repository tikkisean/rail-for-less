import { useState } from "react";
import { Link } from "react-router-dom";
import "./UpdateBar.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

export default function UpdateBar() {
	const [open, setOpen] = useState(true);
	const [dialog, setDialog] = useState(false);

	return (
		<div>
			<div id="update-bar-container" style={{ display: open ? "" : "none" }}>
				<span id="update-bar">
					New! Get emailed when your fare drops with Price Alerts.{" "}
					<span onClick={() => setDialog(true)}>Read more</span>
				</span>
				<IconButton onClick={() => setOpen(false)} size="small">
					<CloseIcon />
				</IconButton>
			</div>
			<Dialog onClose={() => setDialog(false)} open={dialog}>
				<DialogTitle>Updates</DialogTitle>
				<IconButton
					onClick={() => setDialog(false)}
					sx={{ position: "absolute", right: "1rem", top: "1rem" }}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent>
					<DialogContentText>
						<h2>Never Miss a Price Drop</h2>
						Tired of refreshing fares hoping for a better deal? Now you don't
						have to. Introducing{" "}
						<Link to="/alerts" onClick={() => setDialog(false)}>
							Price Alerts
						</Link>
						—tell us your route, travel dates, and the price you're after, and
						we'll email you when a matching fare drops.
						<br></br>
						<br></br>
						Set up an alert in seconds: pick your origin and destination, choose
						an accommodation, and optionally set a target price. We'll keep an eye
						on fares for you and check back regularly, so the next time prices
						fall, you'll hear about it. Unsubscribe anytime with a single click.
						Head to the{" "}
						<Link to="/alerts" onClick={() => setDialog(false)}>
							Alerts
						</Link>{" "}
						page to create yours today.
						<br></br>
						<br></br>
						<hr></hr>
						<br></br>
						<h2>All Aboard Amtrak's Mardi Gras Service!</h2>
						Get ready to ride the rails to the Gulf Coast! Amtrak has announced its new
						<a href="https://www.amtrak.com/amtrak-mardi-gras-service-train"
							rel="noopener noreferrer"
							target="_blank">
								Mardi Gras Service
							</a>
						, connecting New Orleans, Louisiana, and Mobile, Alabama, with the first trains departing on August 18, 2025.
						<br></br>
						This exciting new route will offer twice-daily departures, providing a convenient and scenic way to travel between these two vibrant cities. The Mardi Gras service will also include stops in Bay St. Louis, Gulfport, Biloxi, and Pascagoula, Mississippi, restoring passenger train service to the Mississippi Gulf Coast for the first time in nearly two decades.
						<br></br>
						We have updated our map and internal data to reflect this new service. Hover over the Gulf Coast route to see the new train and book your tickets today! Be among the first to experience the return of this historic route.
						<br></br>
						<br></br>
						<hr></hr>
						<br></br>
						<h2>January 2025 Feature Update</h2>
						<br></br>
						New year, new features! We're excited to announce RailForLess now
						supports{" "}
						<a
							href="https://www.amtrak.com/thruway-connecting-services-multiply-your-travel-destinations"
							rel="noopener noreferrer"
							target="_blank"
						>
							Amtrak Thruway
						</a>{" "}
						stations and services. You can now use RailForLess to plan more
						complex trips with bus connections, with more than double the
						stations to choose from. Other changes include a revamped map and
						station selection process ensuring data synchronization and quick
						load times when selecting stations.
						<br></br>
						<br></br>
						We're thankful for the support we've received these past few months
						that have allowed us to continue to improve RailForLess despite
						financial and logistical hurdles. Have a feature you'd like to see
						implemented in 2025? Reach out at{" "}
						<a href="mailto:info@railforless.us">
							info@railforless.us
						</a>{" "}
						and let us know.
						<br></br>
						<br></br>
						<hr></hr>
						<br></br>
						<h2>RailForLess.us v3</h2>
						<br></br>
						This latest iteration of the project is the result of yet another
						complete redesign of our backend architecture, and a slew of UI
						tweaks in response to user feedback. We have now finally migrated
						all of our backend services from Microsoft Azure to Cloudflare. This
						transition began over a year ago when we first transitioned our
						hosting to{" "}
						<a
							href="https://pages.cloudflare.com/"
							rel="noopener noreferrer"
							target="_blank"
						>
							Cloudflare Pages
						</a>
						, since then we have transitioned our CAPTCHA service to{" "}
						<a
							href="https://www.cloudflare.com/products/turnstile/"
							rel="noopener noreferrer"
							target="_blank"
						>
							Cloudflare Turnstile
						</a>
						, and now our entire backend to run on{" "}
						<a
							href="https://workers.cloudflare.com/"
							rel="noopener noreferrer"
							target="_blank"
						>
							Cloudflare Workers
						</a>
						. This marks the third complete redesign of our backend and with it
						you can expect faster searches with more frequent status updates.
						Through clever insights about the design of the Amtrak API and the
						use of new Cloudflare services we have lowered search times to a
						limit we long thought was impossible. Additionally, we have
						leveraged Cloudflare's vast network to eliminate the need for some
						of our most expensive proxies, allowing us to reduce our monthly
						fundraising goal for the time being.
						<br></br>
						<br></br>
						With these backend changes come a variety of frontend improvements,
						many in direct response to user feedback. Some of these changes
						include a new custom date range selector, route icons, a more
						accurate geolocation API, smarter station recognition, more
						customization when viewing fares, and accessibility improvements.
						<br></br>
						<br></br>
						Thank you to all who donated to fund this iteration, your donations
						are what allow us to continually improve. Much of this update was
						informed by generous user feedback—reach out at{" "}
						<a href="mailto:info@railforless.us">
							info@railforless.us
						</a>{" "}
						to let us know how we can improve.
						<br></br>
						<br></br>
						<hr></hr>
						<br></br>
						<h2>Date grid, Turnstile, and more</h2>
						<br></br>
						This month we're excited to introduce a major new feature and
						transition of our backend architecture. First, we have finally
						implemented the "Date grid" feature found in Google Flights, an
						incredibly useful tool for visualizing fares across a date range and
						departure/return combinations. The Date grid in tandem with the
						existing Price graph enable rich data visualization that we hope
						will aid your future travel planning. Second, we have transitioned
						away from CAPTCHAs and now use{" "}
						<a
							href="https://www.cloudflare.com/products/turnstile/"
							rel="noopener noreferrer"
							target="_blank"
						>
							Cloudflare Turnstile
						</a>{" "}
						for protection against bots; expect a more frictionless experience
						interacting with our API. Finally, we have made some changes to our
						donation system in light of rising costs and waning donations. A
						non-intrusive donation prompt will accompany fares when viewing
						search results, showing progress towards the current month's
						fundraising goal. Additionally, we have created a{" "}
						<a
							href="https://buymeacoffee.com/railforless/membership"
							rel="noopener noreferrer"
							target="_blank"
						>
							membership tier
						</a>{" "}
						which enables smaller monthly contributions. Please consider
						donating to help cover our ever-increasing operating costs and fund
						new features.
						<br></br>
						<br></br>
						<hr></hr>
						<br></br>
						<h2>August 2024 Feature Update</h2>
						<br></br>
						Cached fares are here! Now you can share fares with others, save
						past fares by their URL, and even share search URLs which
						automatically fill in your search details. We have also removed
						restrictions with amtrak.com booking—all browsers can now book
						directly through Amtrak without restrictions. Try sharing a search
						with the new Share menu today! As always, do not hesitate to reach
						out at{" "}
						<a href="mailto:info@railforless.us">
							info@railforless.us
						</a>{" "}
						with any comments/concerns.
						<br></br>
						<br></br>
						<hr></hr>
						<br></br>
						<h2>July 2024 Feature Update</h2>
						<br></br>
						This month we made a variety of small changes primarily in response
						to user feedback, please continue to let us know how we can improve.
						<br></br>
						<br></br>
						<ul>
							<li>Strict class/accommodation filtering</li>
							<li>Date range selector helper text and button</li>
							<li>Rephrasing of additional accommodations dialog</li>
							<li>Auto-renewing proxies for reduced downtime</li>
						</ul>
						<br></br>
						<hr></hr>
						<br></br>
						<h2>Borealis Trains Depart May 21</h2>
						<br></br>
						Amtrak{" "}
						<a
							href="https://media.amtrak.com/2024/05/introducing-amtrak-borealis-trains-with-expanded-service-between-st-paul-and-chicago-via-milwaukee/"
							rel="noopener noreferrer"
							target="_blank"
						>
							recently announced
						</a>{" "}
						the new{" "}
						<a
							href="https://www.amtrak.com/borealis-train"
							rel="noopener noreferrer"
							target="_blank"
						>
							Borealis
						</a>{" "}
						train between St. Paul–Minneapolis and Chicago, and we quickly
						updated our map and internal data structures accordingly. Hover over
						the Empire Builder route between St. Paul–Minneapolis and Chicago to
						see the new train and book today! The first Borealis trains depart
						May 21, 2024.
						<br></br>
						<br></br>
						<hr></hr>
						<br></br>
						<h2>April 2024 Feature Update</h2>
						<br></br>
						Hello railfans!<br></br>
						<br></br>Ever since we launched v2 last month we've been inundated
						with feature requests and bug fixes, and ever since then we've been
						working in our spare time to address these requests. This update
						adds significant functionality to the site, mostly through 8 new
						filters which enable comprehensive customization of the returned
						options. We've also patched various bugs, improved UI/UX, and added
						a few extra features along the way. Below is a list of all major
						changes:<br></br>
						<br></br>
						New features:
						<br></br>
						<ul>
							<li>Filter by route</li>
							<li>Filter by layovers</li>
							<li>Filter by price</li>
							<li>Filter by times</li>
							<li>Filter by days</li>
							<li>Filter by duration</li>
							<li>Filter by amenities</li>
							<li>Filter by add-ons</li>
							<li>Redesigned date picker</li>
							<li>Local transit connections</li>
							<li>Add-ons listed with amenities</li>
							<li>Redesigned reCAPTCHA error</li>
						</ul>
						<br></br>
						Bug fixes:<br></br>
						<ul>
							<li>UTC/local time conversion fixed</li>
							<li>Bus legs now render correctly</li>
						</ul>
						<br></br>
						Many of these changes were made directly in response to emails we
						received—don't hesitate to reach out with any suggestions at{" "}
						<a href="mailto:info@railforless.us">info@railforless.us</a>.
						If you found any of these changes useful, consider{" "}
						<a
							href="https://www.buymeacoffee.com/railforless"
							rel="noopener noreferrer"
							target="_blank"
						>
							donating
						</a>{" "}
						to help us cover operating costs and maintain the site.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialog(false)}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
