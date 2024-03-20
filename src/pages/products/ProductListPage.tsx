import { Suspense, lazy, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);
interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	currentPrice: number;
}

const ProductListPage = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get<Product[]>('http://localhost:5555/products')
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => console.error('Error fetching products:', error));
	}, []);

	const handleAddProduct = () => {
		navigate('/add-product');
	};

	const handleViewDetail = (id: string) => {
		navigate(`/detail-product/${id}`);
	};

	const handleEdit = (id: string) => {
		navigate(`/update-product/${id}`);
	};
	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<div>Loading...</div>}>
					<NavBarComponent />
				</Suspense>

				<div className="container d-flex flex-column align-items-center justify-content-center mt-5 manager">
					<h6 className="display-6">Quản lí sản phẩm</h6>
					<div className="text-end w-100">
						<button
							type="button"
							className="btn btn-primary mt-3"
							onClick={handleAddProduct}
						>
							+ Thêm sản phẩm
						</button>
					</div>
					<div className="container d-flex flex-column align-items-center justify-content-center mt-5">
						<table className="table align-middle mb-0 bg-white">
							<thead className="bg-light">
								<tr style={{ textAlign: 'center' }}>
									<th style={{ width: '5%' }}>#</th>
									<th style={{ width: '20%' }}>Name</th>
									<th style={{ width: '45%' }}>Description</th>
									<th style={{ width: '10%', textAlign: 'center' }}>Price</th>
									<th style={{ width: '10%', textAlign: 'center' }}>
										Current Price
									</th>
									<th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<tr key={product.id}>
										<td style={{ textAlign: 'center' }}>{index + 1}</td>
										<td>
											<div className="d-flex align-items-center">
												<p className="fw-bold mb-1">{product.name}</p>
											</div>
										</td>
										<td>
											<p className="fw-normal mb-1">{product.description}</p>
										</td>
										<td style={{ textAlign: 'center' }}>
											<del>{product.price}đ</del>
										</td>
										<td style={{ textAlign: 'center' }}>
											{product.currentPrice}đ
										</td>
										<td style={{ textAlign: 'center' }}>
											<button
												type="button"
												className="btn btn-link btn-sm btn-rounded"
												onClick={() => handleViewDetail(product.id)}
											>
												<FontAwesomeIcon icon={faEye} size="lg" />
											</button>
											<button
												type="button"
												className="btn btn-link btn-sm btn-rounded"
												onClick={() => handleEdit(product.id)}
											>
												<FontAwesomeIcon icon={faEdit} size="lg" />
											</button>
											<button
												type="button"
												className="btn btn-link btn-sm btn-rounded"
											>
												<FontAwesomeIcon icon={faTrash} size="lg" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductListPage;
