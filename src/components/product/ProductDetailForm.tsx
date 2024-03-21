import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../api/config';

import { useNavigate } from 'react-router-dom';


interface ProductDetailFormProps {
  id: number;
}

const ProductDetailForm = (props: ProductDetailFormProps) => {
  const [product, setProduct] = useState<ProductInfo | null>(null);
	const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/products/${props.id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [props.id]); 
  if (!product) {
    return <div>Loading...</div>;
  }

	const handleBackClick = () => {
    navigate('/products');
  }

	const formatPrice = (price: number) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
	};
	
	const calculateDiscount = (price: number, currentPrice: number) => {
    return ((1 - (currentPrice / price)) * 100).toFixed(0);
  };

	return (
		<div className="container mt-5 w-50 shadow-lg py-5">
			<div className="row">
				<div className="col-6">
					<img src={product.image} alt="Product" className="img-fluid"/>
				</div>
				<div className="col-6">
					<h2 className="mb-4 text-start">{product.name}</h2>
					<h6 className="mb-3" style={{ whiteSpace: 'nowrap' }}>
						Giá tiền: <span style={{ textDecoration: product.currentPrice < product.price ? 'line-through' : 'none' }}>{formatPrice(product.price)}</span></h6>
					<h6 className="whiteSpace: 'nowrap'" style={{ color: 'red' }}>
						Ưu đãi (-{calculateDiscount(product.price, product.currentPrice)}%): {formatPrice(product.currentPrice)} </h6>
					<h6 className="d-flex flex-column align-items-center mb-3">Mô tả sản phẩm{product.description}</h6>
				<button onClick={handleBackClick} className="btn btn-primary float-right">Quay lại</button>
				</div>
			</div>
		</div>
	)
}

export default ProductDetailForm;