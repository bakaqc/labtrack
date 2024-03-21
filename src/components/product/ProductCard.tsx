import React, { useState } from 'react';
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

const titleStyle = {
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	webkitLineClamp: '2',
	webkitBoxOrient: 'vertical',
	height: '2.5em',
};

const descStyle = {
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
	webkitLineClamp: '3',
	webkitBoxOrient: 'vertical',
	height: '4.5em',
};

const ProductCard: React.FC<ProductProps> = ({
	id,
	name,
	description,
	price,
	currentPrice,
	image,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const cardStyle = {
		transform: isHovered ? 'scale(1.05)' : 'scale(1)',
		transition: 'transform 0.5s',
	};

	return (
		<div
			className="card mb-3 shadow border border-danger h-100"
			key={id}
			style={cardStyle}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="h-100" style={{ overflow: 'hidden', maxHeight: '200px' }}>
				<img
					src={image}
					alt={name}
					className="card-img-top img-fluid w-100 h-100 object-fit-cover"
				/>
			</div>
			<div className="card-body">
				<div className="card-content">
					<h5 className="card-title" style={titleStyle}>
						{name}
					</h5>
					<p className="card-text card-desc" style={descStyle}>
						{description}
					</p>
				</div>
				<div className="text-center product-price mt-3">
					<p className="card-text fs-5">
						<small className="price fw-bold">
							<span>Giá gốc: </span>
							<del>
								<span>{price}₫</span>
							</del>
						</small>
					</p>
					<h5 className="card-text mb-3 fs-4">
						<small className="text-danger fw-bold">
							Ưu đãi: {currentPrice}₫
						</small>
					</h5>
					<Link to={`/detail-product/${id}`} className="btn btn-danger">
						Thông tin chi tiết
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
