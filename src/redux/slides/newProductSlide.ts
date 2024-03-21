import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ProductInfo = {
	id: 0,
	name: '',
	description: '',
	price: 0,
	currentPrice: 0,
	image: '',
};

export const newProductSlide = createSlice({
	name: 'newProduct',
	initialState,
	reducers: {
		changeName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		changeDescription: (state, action: PayloadAction<string>) => {
			state.description = action.payload;
		},
		changePrice: (state, action: PayloadAction<number>) => {
			if (action.payload > 0) state.price = action.payload;
		},
		changeCurrentPrice: (state, action: PayloadAction<number>) => {
			if (action.payload > 0) state.currentPrice = action.payload;
		},
		changeImage: (state, action: PayloadAction<string>) => {
			state.image = action.payload;
		},
		reset: (state) => {
			state.name = '';
			state.description = '';
			state.price = 0;
			state.currentPrice = 0;
			state.image = '';
		},
	},
});

export const {
	changeName,
	changeDescription,
	changePrice,
	changeCurrentPrice,
	changeImage,
	reset,
} = newProductSlide.actions;

export default newProductSlide.reducer;
