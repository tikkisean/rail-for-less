import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Slider from "@mui/material/Slider";

export default function Price({ maxPrice, setMaxPrice }) {
	const [renderedMaxPrice, setRenderedMaxPrice] = useState(maxPrice);

	useEffect(() => {
		setRenderedMaxPrice(maxPrice);
	}, [maxPrice]);

	const [anchor, setAnchor] = useState(null);

	return (
		<div className={`filter-${maxPrice === 5000 ? "not-" : ""}selected`}>
			<Button
				className={`filter-button select ${
					!anchor && renderedMaxPrice === 5000 ? "not-" : ""
				}selected`}
				disableRipple
				endIcon={
					renderedMaxPrice === 5000 ? (
						<ArrowDropDownIcon
							sx={{ transform: `rotate(${Boolean(anchor) ? 180 : 0}deg)` }}
						/>
					) : (
						<CloseIcon
							onClick={(e) => {
								e.stopPropagation();
								setMaxPrice(5000);
							}}
							fontSize="small"
						/>
					)
				}
				onClick={(e) => setAnchor(e.currentTarget)}
				variant="outlined"
			>
				{renderedMaxPrice === 5000
					? "Price"
					: `up to $${renderedMaxPrice.toLocaleString()}`}
			</Button>
			<Popover
				anchorEl={anchor}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				onClose={() => setAnchor(null)}
				open={Boolean(anchor)}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<div className="popover-filter">
					<div>
						<span>Price (per person)</span>
						<IconButton onClick={() => setAnchor(null)}>
							<CloseIcon />
						</IconButton>
					</div>
					<div className="slider-container">
						<span>
							{renderedMaxPrice === 5000
								? "All prices"
								: `up to $${renderedMaxPrice.toLocaleString()}`}
						</span>
						<Slider
							max={5000}
							onChange={(e, newMaxPrice) => setRenderedMaxPrice(newMaxPrice)}
							onChangeCommitted={(e, newMaxPrice) => setMaxPrice(newMaxPrice)}
							step={50}
							value={renderedMaxPrice}
							valueLabelDisplay="auto"
							valueLabelFormat={(value) => `$${value.toLocaleString()}`}
						/>
					</div>
					<div className="options">
						<Button
							disabled={renderedMaxPrice === 5000}
							disableRipple
							onClick={() => setMaxPrice(5000)}
						>
							Clear
						</Button>
					</div>
				</div>
			</Popover>
		</div>
	);
}
