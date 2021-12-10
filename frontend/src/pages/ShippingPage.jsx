import React, { useState } from 'react';

import {
	Form,
	Button,
	FormGroup,
	FormLabel,
	FormControl,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup controlId="address">
					<FormLabel>Address</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter address"
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></FormControl>
				</FormGroup>

				<FormGroup controlId="city">
					<FormLabel>City</FormLabel>
					<FormControl
						type="text"
						placeholder="Enter city"
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					></FormControl>

					<FormGroup controlId="postalCode">
						<FormLabel>Postal Code</FormLabel>
						<FormControl
							type="number"
							placeholder="Enter Postal Code"
							value={postalCode}
							required
							onChange={(e) => setPostalCode(e.target.value)}
						></FormControl>
					</FormGroup>

					<FormGroup controlId="country">
						<FormLabel>Country</FormLabel>
						<FormControl
							type="text"
							placeholder="Enter Country"
							value={country}
							required
							onChange={(e) => setCountry(e.target.value)}
						></FormControl>
					</FormGroup>
				</FormGroup>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingPage;
