import { Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../../components/products/ProductList';
const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);

const ProductListPage = () => {
	const [products, setProducts] = useState<ProductInfo[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get<ProductInfo[]>('http://localhost:5555/products')
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => console.error('Error fetching products:', error));
	}, []);

	const handleAddProduct = () => {
		navigate('/add-product');
	};

	const handleViewDetail = (id: number) => {
		navigate(`/detail-product/${id}`);
	};

	const handleEdit = (id: number) => {
		navigate(`/update-product/${id}`);
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
					.delete(`http://localhost:5555/products/${id}`)
					.then(() => {
						setProducts(products.filter((product) => product.id !== id));
						Swal.fire('Xóa thành công!', 'Sản phẩm đã được xóa.', 'success');
					})
					.catch((error) => console.error('Error deleting product:', error));
			}
		});
	};

	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<div>Loading...</div>}>
					<NavBarComponent />
				</Suspense>

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
					<div className="container d-flex flex-column align-items-center justify-content-center mt-2">
						<ProductTable
							products={products}
							handleViewDetail={handleViewDetail}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductListPage;
