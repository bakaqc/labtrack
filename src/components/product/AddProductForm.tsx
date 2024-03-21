import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { SERVER_URL } from '../../api/config';
import { RootState } from '../../redux/store';
import {
	changeCurrentPrice,
	changeDescription,
	changeName,
	changePrice,
	changeImage,
	reset,
} from '../../redux/slides/newProductSlide';

export const AddProductForm = () => {
	const dispatch = useDispatch();
	const { name, description, price, currentPrice, image } = useSelector(
		(state: RootState) => state.newProduct,
	);
	const navigate = useNavigate();

	const isValidated = (): string => {
		console.log('haha');

		if (name.trim().length < 0) {
			return 'Tên sản phẩm không được để trống!';
		}

		if (description.trim().length < 0) {
			return 'Mô tả không được để trống!';
		}

		if (price == 0) {
			return 'Giá gốc phải lớn hơn 0!';
		}

		if (currentPrice == 0) {
			return 'Ưu đãi phải lớn hơn 0!';
		}

		if (currentPrice >= price) {
			console.log(price, currentPrice);
			return 'Ưu đãi phải nhỏ hơn giá gốc!';
		}

		return '';
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const message = isValidated();

		if (message.length > 0) {
			Swal.fire({
				title: 'Lỗi!',
				text: message,
				icon: 'error',
			});
			return;
		}

		const response = await axios.post(`${SERVER_URL}/products`, {
			name,
			description,
			price,
			currentPrice,
			image,
		});

		if (response.status == 201) {
			const response = Swal.fire({
				title: 'Thành công!',
				text: 'Thêm sản phẩm thành công!',
				icon: 'success',
			});

			response.then(() => {
				dispatch(reset());
				navigate('/products');
			});
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		const reader = new FileReader();

		reader.onloadend = () => {
			dispatch(changeImage(reader.result as string));
		};

		reader.readAsDataURL(file);
	};

	return (
		<>
			<div className="container mt-5 w-50 shadow-lg py-5">
				<div className="mx-5">
					<h6 className="display-6 mb-4 text-center">Thêm sản phẩm</h6>

					<form onSubmit={handleSubmit}>
						<div className="d-flex flex-column align-items-center mb-3">
							<label
								htmlFor="input-name"
								className="form-label w-75 text-start"
							>
								Tên sản phẩm
							</label>
							<input
								type="text"
								className="form-control w-75"
								id="input-name"
								value={name}
								autoComplete="off"
								onChange={(e) =>
									dispatch(changeName(e.target.value.replace(/\s/g, '')))
								}
								required
							/>
						</div>
						<div className="d-flex flex-column align-items-center mb-3">
							<label
								htmlFor="input-price"
								className="form-label w-75 text-start"
							>
								Giá gốc
							</label>
							<input
								type="number"
								className="form-control w-75"
								id="input-price"
								value={price}
								autoComplete="off"
								onChange={(e) =>
									dispatch(changePrice(e.target.value as unknown as number))
								}
								required
							/>
						</div>
						<div className="d-flex flex-column align-items-center mb-3">
							<label
								htmlFor="input-currentPrice"
								className="form-label w-75 text-start"
							>
								Ưu đãi
							</label>
							<input
								type="number"
								className="form-control w-75"
								id="input-currentPrice"
								value={currentPrice}
								autoComplete="off"
								onChange={(e) =>
									dispatch(
										changeCurrentPrice(e.target.value as unknown as number),
									)
								}
								required
							/>
						</div>
						<div className="d-flex flex-column align-items-center mb-3">
							<label
								htmlFor="input-description"
								className="form-label w-75 text-start"
							>
								Mô tả
							</label>
							<textarea
								className="form-control w-75"
								id="input-description"
								value={description}
								autoComplete="off"
								onChange={(e) =>
									dispatch(changeDescription(e.target.value.trim()))
								}
								required
							/>
						</div>
						<div className="d-flex flex-column align-items-center mb-3">
							<label
								htmlFor="input-image"
								className="form-label w-75 text-start"
							>
								Hình ảnh
							</label>
							<input
								type="file"
								className="form-control w-75"
								id="input-image"
								accept="image/*"
								autoComplete="off"
								onChange={handleImageChange}
								required
							/>
						</div>
						<div className="d-flex justify-content-center mt-4">
							<button type="submit" className="btn btn-primary">
								Thêm sản phẩm
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddProductForm;
