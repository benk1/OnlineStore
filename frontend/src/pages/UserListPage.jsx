import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { Table, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './UserListPage.css';

const UserListPage = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers);
		} else {
			history.push('/login');
		}
		dispatch(listUsers());
	}, [dispatch, history, successDelete]);

	const handleDelete = (id) => {
		if (window.confirm('Are you sure?')) dispatch(deleteUser(id));
	};

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped border hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>

								<td>
									<a href={`mailto:${user.email}`}> {user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className="fas fa-check " style={{ color: 'green' }}></i>
									) : (
										<i className="fas fa-times" style={{ color: 'red' }}></i>
									)}
								</td>
								<td className="editDeleteIcons">
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-user-edit fa-2x"></i>
										</Button>
									</LinkContainer>

									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => handleDelete(user._id)}
									>
										<i className="fas fa-trash" deleteIcon></i>
									</Button>
									{/* <Button
										variant="danger"
										className="btn-sm"
										onClick={() => handleDelete(user._id)}
									></Button> */}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListPage;
