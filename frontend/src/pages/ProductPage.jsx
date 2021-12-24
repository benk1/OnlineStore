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
	Form,
} from 'react-bootstrap';

import Rating from '../components/Rating';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductPage = ({ match, history }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { error, loading, product } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		success: successProductReview,
		loading: loadingProductReview,
		error: errorProductReview,
	} = productReviewCreate;

	useEffect(() => {
		if (successProductReview) {
			setRating(0);
			setComment('');
		}
		if (!product._id || product._id !== match.params.id) {
			dispatch(listProductDetails(match.params.id));
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
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
								<ListGroupItem>
									Description: {product.description}
								</ListGroupItem>
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
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
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

					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant="flush">
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{successProductReview && (
										<Message variant="success">
											Review submitted successfully
										</Message>
									)}
									{loadingProductReview && <Loader />}
									{errorProductReview && (
										<Message variant="danger">{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													custom
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="">Select...</option>
													<option value="1">1 - Poor</option>
													<option value="2">2 - Fair</option>
													<option value="3">3 - Good</option>
													<option value="4">4 - Very Good</option>
													<option value="5">5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													row="3"
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<br />
											<Button
												disabled={loadingProductReview}
												type="submit"
												variant="primary"
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to="/login">sign in</Link> to write a review{' '}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
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
