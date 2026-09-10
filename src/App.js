import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import Footer from "./Footer";
import UpdateBar from "./UpdateBar";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App() {
	const primary = {
		main: "#89B3F7",
		hover: "#9DC0F9",
	};

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			primary: primary,
		},
		typography: {
			button: {
				textTransform: "none",
			},
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<BrowserRouter>
					<div className="fade-in">
						<UpdateBar />
						<AppRouter />
						<Footer />
					</div>
				</BrowserRouter>
			</LocalizationProvider>
		</ThemeProvider>
	);
}
