import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { AuthProvider } from '../context/auth'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import '../assets/scss/nextjs-material-kit.scss'

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
			main: '#999999'
		}
	}
})

export default class MyApp extends App {
	// static async getInitialProps({ Component, router, ctx }) {
	//   let pageProps = {};

	//   if (Component.getInitialProps) {

	//     pageProps = await Component.getInitialProps(ctx);
	//   }

	//   return { pageProps };
	// }
	render() {
		const { Component, pageProps } = this.props

		return (
			<React.Fragment>
				<Head>
					<title>SIPP Karhutla</title>
				</Head>
				<AuthProvider>
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</AuthProvider>
			</React.Fragment>
		)
	}
}
