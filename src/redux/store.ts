import { configureStore } from '@reduxjs/toolkit';
import newProductReducer from './slides/newProductSlide';

export const store = configureStore({
	reducer: {
		newProduct: newProductReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
