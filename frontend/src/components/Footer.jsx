import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						Ben's Copyright &copy; Online Store
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
