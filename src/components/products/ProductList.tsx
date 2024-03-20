import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ProductTableProps {
	products: ProductInfo[];
	handleViewDetail: (id: number) => void;
	handleEdit: (id: number) => void;
	handleDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
	products,
	handleViewDetail,
	handleEdit,
	handleDelete,
}) => {
	return (
		<table className="table align-middle mb-0 bg-white table-striped">
			<thead className="bg-secondary">
				<tr style={{ textAlign: 'center' }}>
					<th style={{ width: '5%' }}>#</th>
					<th style={{ width: '20%' }}>Name</th>
					<th style={{ width: '45%' }}>Description</th>
					<th style={{ width: '10%', textAlign: 'center' }}>Price</th>
					<th style={{ width: '10%', textAlign: 'center' }}>Current Price</th>
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
						<td style={{ textAlign: 'center' }}>{product.currentPrice}đ</td>
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
	);
};

export default ProductTable;
