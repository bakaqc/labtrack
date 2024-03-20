import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

interface ProductProps {
	id: string;
	name: string;
	description: string;
	price: string;
	currentPrice: string;
	image: string;
}

const ProductCard: React.FC<ProductProps> = ({
	id,
	name,
	description,
	price,
	currentPrice,
	image,
}) => {
	return (
		<div className="card" key={id}>
			<div className="card-top">
				<img src={image} alt={name} className="card-img" />
			</div>
			<div className="card-body">
				<div className="card-content">
					<h4 className="card-title">{name}</h4>
					<p className="card-text">{description}</p>
				</div>
				<div className="product-price">
					<div className="card-text price">
						<span>Price: </span>
						<span>{price}₫</span>
					</div>
					<div className="card-text current-price">
						<span>Current Price: </span>
						<span>{currentPrice}₫</span>
					</div>
				</div>
				<div className="detail-button">
					<Link to={`/detail-product/:${id}`} className="btn btn-danger">
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
