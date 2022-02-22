import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '@components/Footer'
import RomanForm from '@components/RomanForm'

const Home: NextPage = () => {

	return (
		<div className="rootContainer">
			<Head>
				<title>Amplio - Brian Uminga</title>
				<meta name="description" content="Technical Assignment for Amplio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>
					Amplio Assignment - Brian Uminga
				</h1>

				<a href="https://github.com/umibri/amplio-roman" title="See code on Github @umibri" className="mb-auto">Source Code - Github</a>

				
				{/* Roman Form Component*/}
				<RomanForm />

			</main>

			<Footer />
		</div>
	)
}

export default Home;
