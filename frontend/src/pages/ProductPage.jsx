import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	ListGroupItem,
	Card,
	Button,
	FormControl,
} from 'react-bootstrap';

import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductPage = ({ match, history }) => {
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { error, loading, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>

					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroupItem>
								<h3>{product.name}</h3>
							</ListGroupItem>

							<ListGroupItem>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroupItem>

							<ListGroupItem>
								<b>Price:</b>
								{product.price}
								<i className="fas fa-euro-sign"></i>
							</ListGroupItem>
							<ListGroupItem>Description: {product.description}</ListGroupItem>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroupItem>
									<Row>
										<Col>
											<b>Price:</b>
										</Col>
										<Col>
											<strong>{product.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>

								<ListGroupItem>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
										</Col>
									</Row>
								</ListGroupItem>

								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>Qty</Col>
											<Col>
												<FormControl
													as="select"
													custom
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</FormControl>
											</Col>
										</Row>
									</ListGroupItem>
								)}

								<ListGroup>
									<Button
										onClick={addToCartHandler}
										className="btn-block"
										type="button"
										disabled={product.countInStock === 0}
									>
										Add To Cart
									</Button>
								</ListGroup>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
			<br />
			<Button variant="custom" className="goBack">
				<Link className="goBack" to="/">
					Go Back
				</Link>
			</Button>
		</>
	);
};

export default ProductPage;
