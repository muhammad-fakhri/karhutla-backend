/*!

=========================================================
* NextJS Material Kit v1.1.0 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { AuthProvider } from '../context/auth'

import '../assets/scss/nextjs-material-kit.scss'

export default class MyApp extends App {
	componentDidMount() {
		const comment = document.createComment(`

=========================================================
* NextJS Material Kit v1.1.0 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`)
		document.insertBefore(comment, document.documentElement)
	}
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
					<title>SIPP Karhutla Test</title>
				</Head>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</React.Fragment>
		)
	}
}
