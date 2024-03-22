import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../api/config';

const ProductListTable = () => {
	const [products, setProducts] = useState<ProductInfo[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get<ProductInfo[]>(`${SERVER_URL}/products`)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => console.error('Error fetching products:', error));
	}, []);

	const handleAddProduct = () => {
		navigate('/labtrack/add-product');
	};

	const handleViewDetail = (id: number) => {
		navigate(`/labtrack/detail-product/${id}`);
	};

	const handleEdit = (id: number) => {
		navigate(`/labtrack/update-product/${id}`);
	};

	const handleDelete = (id: number) => {
		Swal.fire({
			title: 'Bạn có chắc chắn?',
			text: 'Xóa sản phẩm này!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Xóa!',
			cancelButtonText: 'Hủy',
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`${SERVER_URL}/products/${id}`)
					.then(() => {
						setProducts(products.filter((product) => product.id !== id));
						Swal.fire('Xóa thành công!', 'Sản phẩm đã được xóa.', 'success');
					})
					.catch((error) => console.error('Error deleting product:', error));
			}
		});
	};
	const formatPrice = (price: number) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
	};
	return (
		<div className="container d-flex flex-column align-items-center justify-content-center mt-4 manager">
			<h6 className="display-6">Quản lí sản phẩm</h6>
			<div className="text-end w-100 p-2">
				<button
					type="button"
					className="btn btn-primary mt-2"
					onClick={handleAddProduct}
				>
					+ Thêm sản phẩm
				</button>
			</div>
			<div className="container d-flex flex-column align-items-center justify-content-center mt-2 mb-5 shadow-lg">
				<table className="table align-middle mb-0 bg-white table-striped">
					<thead className="bg-secondary">
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
									<del>{formatPrice(product.price)}</del>
								</td>
								<td style={{ textAlign: 'center' }}>
									{formatPrice(product.currentPrice)}
								</td>
								<td style={{ textAlign: 'center' }}>
									<button
										type="button"
										className="btn btn-link btn-sm btn-rounded"
										onClick={() => handleViewDetail(product.id)}
									>
										<FontAwesomeIcon icon={faEye} size="lg" color="green" />
									</button>
									<button
										type="button"
										className="btn btn-link btn-sm btn-rounded"
										onClick={() => handleEdit(product.id)}
									>
										<FontAwesomeIcon icon={faEdit} size="lg" color="orange" />
									</button>
									<button
										type="button"
										className="btn btn-link btn-sm btn-rounded"
										onClick={() => handleDelete(product.id)}
									>
										<FontAwesomeIcon icon={faTrash} size="lg" color="red" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductListTable;
