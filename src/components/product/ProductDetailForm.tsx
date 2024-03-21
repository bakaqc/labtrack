import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../../api/config';

interface ProductDetailFormProps {
  id: number;
}

const ProductDetailForm = (props: ProductDetailFormProps) => {
  const [product, setProduct] = useState<ProductInfo | null>(null);

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

	const formatPrice = (price: number) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
	};

	return (
		<div className="container mt-5 w-50 shadow-lg py-5">
			<div className="row">
				<div className="col-6">
					<img src={product.image} alt="Product" className="img-fluid"/>
				</div>
				<div className="col-6">
					<h2 className="mb-4 text-start">{product.name}</h2>
					<h6 className="d-flex flex-column align-items-center mb-3">Giá tiền: {formatPrice(product.price)}</h6>
					<h6 className="d-flex flex-column align-items-center mb-3">Ưu đãi: {formatPrice(product.currentPrice)}</h6>
					<h6 className="d-flex flex-column align-items-center mb-3">Mô tả sản phẩm{product.description}</h6>
				</div>
			</div>
		</div>
	)
}

export default ProductDetailForm;