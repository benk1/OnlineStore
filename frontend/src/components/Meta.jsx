import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome To Onlinestore',
	description: 'We sell the best products in the market for cheap',
	keywords:
		'electronics,clothes, buy electronics, buy clothes, cheap clothes,cheap electroincs',
};

export default Meta;
