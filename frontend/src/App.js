import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/pages/Home';
import Productpage from './components/pages/Productpage';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route exact path="/" component={Home} />
					<Route path="/product/:id" component={Productpage} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;