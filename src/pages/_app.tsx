import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import '../assets/scss/nextjs-material-kit.scss'
import { AuthProvider } from '../context/auth'

// Override default Material UI Theme
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#03a9f4',
			contrastText: '#fff'
		},
		warning: {
			main: '#ff9800'
		},
		info: {
			main: '#00acc1'
		},
		success: {
			main: '#4caf50'
		},
		error: {
			main: '#f44336'
		},
		grey: {
			'500': '#999999'
		}
	}
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<Head>
				<meta
					name="viewport"
					content="width=device-w/pidth, initial-scale=1, shrink-to-fit=no"
				/>
				<title>SIPP Karhutla</title>
			</Head>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ThemeProvider>
		</Fragment>
	)
}

export default MyApp
