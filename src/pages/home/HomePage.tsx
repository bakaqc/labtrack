import React, { Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);

const ProductCard = lazy(() => import('../../components/product/ProductCard'));

interface Product {
	id: string;
	name: string;
	description: string;
	price: string;
	currentPrice: string;
	image: string;
}

const HomePage: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [visible, setVisible] = useState(8);

	const loadMore = () => {
		setVisible((prevValue) => prevValue + 8);
	};

	useEffect(() => {
		axios
			.get('http://localhost:5555/products')
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error('There was an error!', error);
			});
	}, []);

	return (
		<div className="home-page">
			<Suspense fallback={<div>Loading...</div>}>
				<NavBarComponent />
				<div className="container mt-4">
					<div className="product-list d-flex flex-wrap justify-content-around">
						{products.slice(0, visible).map((product) => (
							<div className="product-item d-flex flex-column" key={product.id}>
								<ProductCard {...product} />
							</div>
						))}
					</div>
					{visible < products.length && (
						<button
							onClick={loadMore}
							type="button"
							className="btn btn-primary load-more"
						>
							Show more
						</button>
					)}
				</div>
			</Suspense>
		</div>
	);
};

export default HomePage;
