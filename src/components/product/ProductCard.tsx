import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
		<div className="card mb-3 shadow" key={id}>
			<img src={image} alt={name} className="card-img-top img-fluid" />
			<div className="card-body bg-dark">
				<div className="card-content text-white">
					<h5 className="card-title">{name}</h5>
					<p className="card-text">{description}</p>
				</div>
				<div className="text-center product-price">
					<p className="card-text">
						<small className="price text-white">
							<span>Giá gốc: </span>
							<span>{price}₫</span>
						</small>
					</p>
					<p className="card-text">
						<small className="text-danger fw-bold">
							Ưu đãi: {currentPrice}₫
						</small>
					</p>
					<Link to={`/detail-product/:${id}`} className="btn btn-danger">
						Thông tin chi tiết
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
