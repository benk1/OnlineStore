import React, { useEffect } from 'react';
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
} from 'react-bootstrap';

import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductPage = ({ match }) => {
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { error, loading, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

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

							<ListGroupItem>Price: £{product.price}</ListGroupItem>
							<ListGroupItem>Description: {product.description}</ListGroupItem>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroupItem>
									<Row>
										<Col>Price:</Col>
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

								<ListGroup>
									<Button
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

			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
		</>
	);
};

export default ProductPage;
