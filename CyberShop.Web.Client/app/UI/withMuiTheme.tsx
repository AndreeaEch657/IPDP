import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#e5e5e5",
			main: "#727272",
			dark: "#363839",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff5e50",
			main: "#e41e26",
			dark: "#a90000",
			contrastText: "#fff",
		},
	},
});


export function withMuiTheme(Component: any) {

	const WithMuiTheme: React.FunctionComponent<any> = (props) => {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithMuiTheme;
}

