import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@trial.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},

	{
		name: 'Ben  Mathias',
		email: 'ben@trial.com',
		password: bcrypt.hashSync('123456', 10),
	},

	{
		name: 'Lilian Ishe',
		email: 'lilian@trial.com',
		password: bcrypt.hashSync('123456', 10),
	},
];
export default users;
