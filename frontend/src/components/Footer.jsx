import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						<span className="footerIcons">
							<i className="fab fa-instagram-square fa-3x"></i>
							<i className="fab fa-linkedin fa-3x"></i>
							<i className="fab fa-github-square fa-3x"></i>
						</span>
						<div>
							<p>
								Ben's Copyright &copy; Online Store 2022, All rights reserved
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
