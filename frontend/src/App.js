import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditScreen from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';

import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/order/:id" component={OrderPage} />
					<Route path="/placeorder" component={PlaceOrderPage} />
					<Route path="/payment" component={PaymentPage} />
					<Route path="/shipping" component={ShippingPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/register" component={RegisterPage} />
					<Route path="/profile" component={ProfilePage} />
					<Route path="/product/:id" component={ProductPage} />
					<Route path="/cart/:id?" component={CartPage} />
					<Route path="/admin/userlist" component={UserListPage} />
					<Route path="/admin/product/:id/edit" component={ProductEditPage} />
					<Route exact path="/admin/productlist" component={ProductListPage} />
					<Route
						exact
						path="/admin/productlist/:pageNumber"
						component={ProductListPage}
					/>
					<Route path="/admin/orderlist" component={OrderListPage} />
					<Route path="/admin/user/:id/edit" component={UserEditScreen} />
					<Route exact path="/search/:keyword" component={HomePage} />
					<Route path="/page/:pageNumber" component={HomePage} />
					<Route
						path="/search/:keyword/page/:pageNumber"
						component={HomePage}
					/>
					<Route exact path="/" component={HomePage} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
