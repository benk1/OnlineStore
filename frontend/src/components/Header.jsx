import React, { useState } from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
	const [isShown, setIsShown] = useState(false);
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log(userInfo);

	const logoutHandler = () => {
		dispatch(logout());
	};

	const handleHover = () => {
		console.log('iam hovered');
	};
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							{' '}
							<span className="brand">Online Store</span>
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/cart">
								<Nav.Link className="name">
									<i className="fas fa-shopping-cart icon"> </i>{' '}
									<span className="brand">cart</span>
								</Nav.Link>
							</LinkContainer>

							{userInfo ? (
								<NavDropdown
									title={
										<Button
											onMouseEnter={() => setIsShown(true)}
											className="initials"
											variant="custom"
										>{`Hello,  ${userInfo.name.split(/(\s+)/)[0][0]}.${
											userInfo.name.split(/(\s+)/)[2][0]
										}`}</Button>
									}
									id="username"
								>
									{isShown && (
										<p className="namedropDown">
											<strong>{userInfo.name}</strong>
											<br />
											<strong>{userInfo.email}</strong>
										</p>
									)}
									<LinkContainer to="/profile">
										<NavDropdown.Item>
											<span className="profile">Profile</span>
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										<span className="logout">Logout</span>
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user icon"></i>{' '}
										<span className="brand">Sign In</span>
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin" id="adminmenu">
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
